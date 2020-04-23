import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import SpotifyContext from '../../SpotifyContext';
import { createPlaylist, searchSongs, addSongs } from './SpotifyPlaylistFunctions';
import 'react-toastify/dist/ReactToastify.css';
import './SpotifyButton.css';

function SpotifyButton({ title, songs }) {
  const spotifyUser = useContext(SpotifyContext);

  const notify = () => toast(`${title} Playlist Imported Successfully`);
  toast.configure();

  const magicHappening = async () => {
    const playlist = await createPlaylist(spotifyUser.spotifyUserId, title, spotifyUser.tokenSpotify);
    const songIds = await searchSongs(songs, spotifyUser.tokenSpotify);
    await addSongs(songIds, playlist.id, spotifyUser.tokenSpotify);
    console.log('playlist imported successfully');
    await notify();
  };

  if (spotifyUser.tokenSpotify === undefined) {
    return (
      <div>
        <button
          className="spotifyButton"
          style={{ left: '30px' }}
          onClick={() => { alert('Login Required!'); }}
        >
          {' '}
          Log-In to your Spotify
          {' '}
          <br />
          {' '}
          account.
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="spotifyButton" style={{ left: '60px' }} onClick={magicHappening}>
        {' '}
        Import playlist
        <br />
        {' '}
        on Spotify
      </button>
    </div>
  );
}

export default SpotifyButton;
