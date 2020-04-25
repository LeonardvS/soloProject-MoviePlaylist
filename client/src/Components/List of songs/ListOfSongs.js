import React, { useState, useEffect, useContext } from 'react';
// import SpotifyButton from '../Spotify Button/SpotifyButton';
import { GetWikiUrls, GetTitlesAndArtists } from '../../services/wikipediaService';
import SpotifyContext from '../../SpotifyContext';
import { createPlaylist, searchSongs, addSongs } from '../../services/spotifyService';
import './ListOfSongs.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState();
  const [artists, setArtists] = useState();

  const spotifyUser = useContext(SpotifyContext);
  const conditions = ['soundtrack', 'music', 'OST', 'Music'];

  async function getWikiUrls () {
    const urls = await GetWikiUrls(title);
    for (const url of urls) {
      if (conditions.some((el) => url.includes(el))) {
        const songsAndArtists = await GetTitlesAndArtists(url)
        const titles = [];
        const artists = [];
        for (const key in songsAndArtists) {
          if (key.includes('title')) titles.push(songsAndArtists[key]);
          if (key.includes('extra')) artists.push(songsAndArtists[key]);
        }
        if (titles[0]) { setSongs(titles); }
        if (artists[0]) { setArtists(artists.slice(1)); }
      }
    }
  }

  async function addPlaylist () {
    const playlist = await createPlaylist(spotifyUser.spotifyUserId, title, spotifyUser.tokenSpotify);
    const songIds = await searchSongs(songs, spotifyUser.tokenSpotify);
    await addSongs(songIds, playlist.id, spotifyUser.tokenSpotify);
    console.log('playlist imported successfully');
  };

  useEffect(() => {
    getWikiUrls()
  }, []);

  return (
    <div className="listOfSong">
      <ul>
        <p> {`${title} playlist: `} </p>
        {songs && songs.map((song, index) => (
          <li key={index}>{`${song}`}</li>
        ))}
        {!songs && <p className="noPlaylist">Loading...</p>}
      </ul>
      {/* <SpotifyButton title={title} songs={songs} /> */}
      <button
        className='add-playlist-to-spotify'
        onClick={addPlaylist}
      >Export playlist <br/> to Spotify
      </button>
    </div>
  );
}

export default ListOfSongs;
