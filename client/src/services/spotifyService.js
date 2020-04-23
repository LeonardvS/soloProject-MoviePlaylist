
export function getSpotifyUserId(token) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch('https://api.spotify.com/v1/me', options)
    .then((res) => res.json())
    .catch((err) => console.error(err)); //eslint-disable-line
}