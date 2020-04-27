const theMovieDB = require ('../../services/theMovieDbService')

describe('Get movies from theMovieDB API using Promises', () => {
  it('Should load movies data', () => {
    return theMovieDB.getMovieList('lord')
    .then(data => {
      expect(data).toBeDefined()
      expect(data.results[0].title).toContain('Lord' || 'lord')
    })
  })
})
