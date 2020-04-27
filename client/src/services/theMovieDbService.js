import { theMovieDbKey } from '../api-keys';

const url = 'https://api.themoviedb.org/3/search'

export function getMovieList(keyword) {
  return fetchMethod(
    `${url}/movie?api_key=${theMovieDbKey}&language=en-US&query=${encodeURIComponent(keyword)}&page=1&include_adult=false`,
  );
}

function fetchMethod(url) {
  return fetch(url)
    .then((res) => (res.status < 400 ? res : new Error(res)))
    .then((res) => res.json())
    .catch((err) => console.log(err));
}