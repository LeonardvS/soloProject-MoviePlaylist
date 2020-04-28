const wtf = require('wtf_wikipedia');

async function getTrackList(title, conditions) {
  const urls = await getWikiUrls(title);
  const titles = [];

  for (const url of urls) {
    if (conditions.some((el) => url.includes(el))) {
      const songs = await getTitles(url);

      for (const key in songs) {
        if (key.includes('title')) titles.push(songs[key]);
      }
    }
  }
  return Promise.resolve(titles);
}

function getWikiUrls (title) {
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${title}&limit=50&namespace=0&format=json`
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response[3])
    .catch((error) => { console.log(error); });
}

function getTitles (url) {
  return wtf.fetch(url)
    .then((doc) => doc.json())
    .then((doc) => {
      for (const section of doc.sections) {
        if (section.title === 'Track listing') return section;
      }
    })
    .then((data) => {
      if (data.templates) return data.templates[0];
    });
}

module.exports = { getTrackList, getTitles, getWikiUrls }