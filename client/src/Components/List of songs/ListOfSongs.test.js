import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import { GetWikiUrls, GetTitles } from '../../services/wikipediaService'
import ListOfSongs from './ListOfSongs'

jest.mock('../../services/wikipediaService')

const mockedUrlsPromise = Promise.resolve(
  [
    "https://en.wikipedia.org/wiki/Watchmen",
    "https://en.wikipedia.org/wiki/Watchmen_(TV_series)",
    "https://en.wikipedia.org/wiki/Watchmen_(film)",
    "https://en.wikipedia.org/wiki/Watchman_(law_enforcement)",
    "https://en.wikipedia.org/wiki/Watchmen:_The_End_Is_Nigh",
    "https://en.wikipedia.org/wiki/Watchmen_Recording_Studios",
    "https://en.wikipedia.org/wiki/Watchmen:_Music_from_the_Motion_Picture",
    "https://en.wikipedia.org/wiki/Watchmen:_Motion_Comic",
    "https://en.wikipedia.org/wiki/Watchmen_on_the_Walls",
    "https://en.wikipedia.org/wiki/Watchman_Fellowship",
    "https://en.wikipedia.org/wiki/Watchmen_Drum_and_Bugle_Corps"
  ]);

const mockedTitlesPromise = Promise.resolve({
  title1: "Desolation Row",
  title2: "Unforgettable",
  title3: "The Times They Are a-Changin'",
  title4: "The Sound of Silence",
  title5: "Me and Bobby McGee",
  title6: "I'm Your Boogie Man",
  title7: "You're My Thrill",
  title8: "Pruit Igoe and Prophecies",
  title9: "Hallelujah",
  title10: "All Along the Watchtower",
  title11: "Ride of the Valkyries",
  title12: "Pirate Jenny",
});

GetWikiUrls.mockImplementation(() => mockedUrlsPromise);
GetTitles.mockImplementation(() => mockedTitlesPromise);

describe('ListOfSongs component', () => {

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListOfSongs />, div);
  });

  it('renders song list', async () => {
    const component = await render(<ListOfSongs />);
    expect(component.getByText('Ride of the Valkyries')).toBeInTheDocument();
  });

});
