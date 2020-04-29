import React, { useState, useEffect, useContext } from 'react';
import { getTrackList } from '../../services/wikipediaService';
import SpotifyContext from '../../SpotifyContext';
import { createPlaylist, searchSongs, addSongs } from '../../services/spotifyService';
import './ListOfSongs.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState([]);
  const conditions = ['soundtrack', 'music', 'OST', 'Music'];
  const spotifyUser = useContext(SpotifyContext);

  async function addPlaylist () {
    const playlist = await createPlaylist(spotifyUser.spotifyUserId, title, spotifyUser.tokenSpotify);
    const songIds = await searchSongs(songs, spotifyUser.tokenSpotify);
    await addSongs(songIds, playlist.id, spotifyUser.tokenSpotify);
    console.log('playlist imported successfully');
  };

  useEffect(() => {
    getTrackList(title, conditions).then(setSongs);
  }, []);

  return (
    <div className="listOfSong">
      <ul className="tracklist">
        <p> {`${title} playlist: `} </p>
        {songs && songs.map((song, index) => (
          <li className='track' key={index}>{`${song}`}</li>
        ))}
        {(songs.length === 0) && <p className="noPlaylist">Loading...</p>}
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
