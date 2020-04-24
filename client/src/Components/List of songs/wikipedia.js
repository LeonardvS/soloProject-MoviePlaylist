import React, { useState, useEffect } from 'react';

const wtf = require('wtf_wikipedia');

function Wikipedia({ title, setSongs, setArtists }) {
  const [wikiUrls, setWikiUrls] = useState();
  const [wikiUrl, setWikiUrl] = useState();
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${title}&limit=50&namespace=0&format=json`

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => setWikiUrls(response[3]))
      .catch((error) => { console.log(error); });
  }, []);

  const conditions = ['soundtrack', 'music', 'OST', 'Music'];

  if (wikiUrls && !(wikiUrl)) {
    for (const url of wikiUrls) {
      if (conditions.some((el) => url.includes(el))) {
        return setWikiUrl(url);
      }
    }
  }

  if (wikiUrl) {
    wtf.fetch(wikiUrl)
      .then((doc) => doc.json())
      .then((doc) => {
        for (const section of doc.sections) {
          if (section.title === 'Track listing') return section;
        }
      })
      .then((data) => { if (data.templates) { return data.templates[0]; } return undefined; })
      .then((data) => {
        const titles = [];
        const artists = [];
        for (const key in data) {
          if (key.includes('title')) titles.push(data[key]);
          if (key.includes('extra')) artists.push(data[key]);
        }
        if (titles[0]) { setSongs(titles); }
        if (artists[0]) { setArtists(artists.slice(1)); }
      });
    setWikiUrl();
    setWikiUrls();
  }

  return (
    <div className="wiki" />
  );
}

export default Wikipedia;
