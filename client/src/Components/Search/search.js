import React, { useState } from 'react';
import Movies from '../Movies/movies';
import './search.css';
import iconSearch from '../../images/Search-512.webp';

function Search() {
  const [searching, setSearching] = useState();
  const [triggerSearch, setTriggerSearch] = useState(0);

  const submittingSearch = (e) => {
    e.preventDefault();
    setTriggerSearch(triggerSearch + 1);
  };

  return (
    <div className="Search">
      <form onSubmit={submittingSearch}>
        <label>Search:</label>
        <input className="search" type="text" onChange={(e) => setSearching(e.target.value)} />
        <img className="searchIcon" src={iconSearch} onClick={submittingSearch} />
      </form>
      <p>👆 Search a movie up here 👆</p>
      {triggerSearch !== 0 && <Movies searching={searching} triggerSearch={triggerSearch} />}
    </div>
  );
}

export default Search;
