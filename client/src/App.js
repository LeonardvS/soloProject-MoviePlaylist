import React, { useState, useEffect } from 'react';
import Logins from './Components/Logins/Logins';
import Search from './Components/Search/search';
import SpotifyContext from './SpotifyContext';
import { getSpotifyUserId } from './services/spotifyService';
import Header from './Components/Header/Header';

import './App.css';

function App() {
  const [tokenSpotify, setTokenSpotify] = useState();
  const [spotifyUserId, setSpotifyUserId] = useState();

  if (tokenSpotify && !spotifyUserId) {
    getSpotifyUserId(tokenSpotify)
    .then((user) => setSpotifyUserId(user.id));
  }

  return (
    <div className="App">
      <Header />
      <Logins token={tokenSpotify} setTokenSpotify={setTokenSpotify} />
      <SpotifyContext.Provider value={{ tokenSpotify, spotifyUserId }}>
        <Search />
      </SpotifyContext.Provider>
    </div>
  );
}

export default App;
