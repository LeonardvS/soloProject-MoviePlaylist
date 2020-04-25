import React, { useState, useEffect } from 'react';
import SpotifyLogin from './react-spotify-login/src/SpotifyLogin';
import { spotifyClientID } from '../../api-keys';
import './logins.css';

function Logins({ token, setTokenSpotify }) {
  const onSuccessSpotify = (response) => setTokenSpotify(response.access_token);
  const onFailureSpotify = (response) => console.error(response);

  const loginAgain = () => setTokenSpotify();

  return (
    <div className="Logins">
      {!token && (
      <SpotifyLogin
        clientId={spotifyClientID}
        redirectUri="http://localhost:3000/"
        onSuccess={onSuccessSpotify}
        onFailure={onFailureSpotify}
      />
      )}
      {token && <button className="loginButton" onClick={loginAgain}>Logout</button>}
      {token && (
      <p>
        Spotify logged in
        <span role="img" aria-label="rock">🤘</span>
      </p>
      )}
    </div>
  );
}


export default Logins;
