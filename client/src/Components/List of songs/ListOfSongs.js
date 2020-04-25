import React, { useState, useEffect, useContext } from 'react';
import { GetWikiUrls, GetTitles } from '../../services/wikipediaService';
import SpotifyContext from '../../SpotifyContext';
import { createPlaylist, searchSongs, addSongs } from '../../services/spotifyService';
import './ListOfSongs.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState();

  const spotifyUser = useContext(SpotifyContext);
  const conditions = ['soundtrack', 'music', 'OST', 'Music'];

  async function getWikiUrls () {
    const urls = await GetWikiUrls(title);
    for (const url of urls) {
      if (conditions.some((el) => url.includes(el))) {
        const songs = await GetTitles(url);
        const titles = [];
        for (const key in songs) {
          if (key.includes('title')) titles.push(songs[key]);
        }
        if (titles[0]) { setSongs(titles); }
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
      <button
        className='add-playlist-to-spotify'
        onClick={addPlaylist}
      >
        Export playlist <br/> to Spotify
      </button>
    </div>
  );
}

export default ListOfSongs;
