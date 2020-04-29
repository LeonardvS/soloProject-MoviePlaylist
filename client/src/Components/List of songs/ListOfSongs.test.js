import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render, cleanup, act, waitForElement, waitForElementToBeRemoved, screen } from '@testing-library/react';
import { getTrackList } from '../../services/wikipediaService'
import ListOfSongs from './ListOfSongs'

jest.mock('../../services/wikipediaService')

const mockedTrackList = Promise.resolve(
  [
    "Desolation Row",
    "Unforgettable",
    "The Times They Are a-Changin'",
    "The Sound of Silence",
    "Me and Bobby McGee",
    "I'm Your Boogie Man",
    "You're My Thrill",
    "Pruit Igoe and Prophecies",
    "Hallelujah",
    "All Along the Watchtower",
    "Ride of the Valkyries",
    "Pirate Jenny"
  ]
)

getTrackList.mockImplementation(() => mockedTrackList);

describe('ListOfSongs component', () => {

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListOfSongs />, div);
  });

  it('renders song list', async () => {
    const component = render(<ListOfSongs />);
    const getByText = component.getByText;

    await waitForElementToBeRemoved(() => getByText('Loading...'));

    expect(getByText('Ride of the Valkyries')).toBeInTheDocument();
    expect(getByText('Hallelujah')).toBeInTheDocument();
  });

  it('button triggers addPlaylist function onClick', () => {

  })

});
