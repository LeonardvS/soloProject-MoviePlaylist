import {theMovieDb} from './api-keys';

export function getMovieList (keyword) {
  return fetchMethod (
    `https://api.themoviedb.org/3/search/movie?api_key=${theMovieDb}&language=en-US&query=${encodeURIComponent(keyword)}&page=1&include_adult=false`
  )
}


function fetchMethod (url) {
  return fetch(url)
    .then( res=> res.status<400? res : new Error(res) )
    .then(res=> res.json())
    .catch(err => console.log(err))
}
