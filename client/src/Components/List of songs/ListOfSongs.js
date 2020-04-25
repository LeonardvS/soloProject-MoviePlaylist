import React, { useState, useEffect } from 'react';
import SpotifyButton from '../Spotify Button/SpotifyButton';
import { GetWikiUrls, GetTitlesAndArtists } from '../../services/wikipediaService';
import './ListOfSongs.css';

function ListOfSongs({ title }) {
  const [songs, setSongs] = useState();
  const [artists, setArtists] = useState();

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

  useEffect(() => {
    getWikiUrls()
  }, []);

  return (
    <div className="listOfSong">
      <ul>
        <p> {`${title} playlist: `} </p>
        {songs && songs.map((song) => (
          <li>{`${song}`}</li>
        ))}
        {!songs && <p className="noPlaylist">Loading...</p>}
      </ul>
      <SpotifyButton title={title} songs={songs} />
    </div>
  );
}

export default ListOfSongs;
