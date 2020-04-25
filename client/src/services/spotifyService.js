
function getSpotifyUserId(token) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch('https://api.spotify.com/v1/me', options)
    .then((res) => res.json())
    .catch((err) => console.error(err)); //eslint-disable-line
}

async function createPlaylist(userId, movieTitle, token) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const bodyOption = {
    name: `${movieTitle} SoundTrack`,
    public: false,
    description: 'Create by Movie Playlist Generator',
  };
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    Accept: 'application/json',
    body: JSON.stringify(bodyOption),
  });
  return response.json();
}

async function searchSongs(songs, token) {  
  const result = [];
  if (!songs) return;
  for (let i = 0; i < songs.length; i++) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(songs[i])}&type=track&limit=10`;
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      Accept: 'application/json',
    });
    const res = await response.json();
    const id = res.tracks.items[0] !== undefined && res.tracks.items[0].id;
    id && result.push(id);
  } 
  return result;
}

async function addSongs(songsId, playlistId, token) {
  if (!songsId) return;
  const queryWithoutId = 'spotify:track:';
  const query = songsId.map((id) => `${queryWithoutId + id}`).join();
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    Accept: 'application/json',
  });
  return response.json();
}

module.exports = { getSpotifyUserId, createPlaylist, searchSongs, addSongs }