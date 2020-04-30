import React from 'react';
import ReactDOM from 'react-dom';
import { getMovieList } from '../../services/theMovieDbService'
import { cleanup, render, waitForElementToBeRemoved, getByText } from '@testing-library/react';
import Movies from './movies'

jest.mock('../../services/theMovieDbService');

const mockedMovies = {
  results: [
    {
      id: 120,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      poster_path: '/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
      release_date: '2001-12-18'
    },
    {
      id: 121,
      title: 'The Lord of the Rings: The Two Towers',
      poster_path: '/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg',
      release_date: '2002-12-18'
    }
  ]
};

getMovieList.mockResolvedValue(mockedMovies);

describe('Movies component', () => {

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Movies />, div);
  });

  it('renders all movies correctly', async () => {
    const { queryByText, getByText } = render(<Movies />);

    await waitForElementToBeRemoved(() => getByText('Loading...'));

    expect(queryByText(mockedMovies.results[0].title)).toBeInTheDocument();
    expect(queryByText(mockedMovies.results[1].title)).toBeInTheDocument();
    expect(document.querySelectorAll('.single_movie').length).toEqual(mockedMovies.results.length);
  });

  it('renders no more movies <p> correctly', async () => {
    const { queryByText, getByText } = render(<Movies />);
    await waitForElementToBeRemoved(() => getByText('Loading...'));
    expect(queryByText(/No more movies/i)).toBeInTheDocument();
  });

});
