import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import { getTrackList } from '../../services/wikipediaService'
import ListOfSongs from './ListOfSongs'

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../services/wikipediaService')

const mockedTrackList =
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

getTrackList.mockResolvedValue(mockedTrackList);

describe('ListOfSongs component', () => {

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListOfSongs />, div);
  });

  it('renders all tracks correctly', async () => {
    const component = render(<ListOfSongs />);
    const getByText = component.getByText;

    await waitForElementToBeRemoved(() => getByText('Loading...'));

    expect(getByText('Ride of the Valkyries')).toBeInTheDocument();
    expect(getByText('Hallelujah')).toBeInTheDocument();
    expect(document.querySelectorAll('.track').length).toEqual(mockedTrackList.length);
  });

  it('button addPlaylist renders correctly', () => {
    const wrapper = shallow(<ListOfSongs/>);
    expect(wrapper.find('.add-playlist-to-spotify')).toHaveLength(1);
  });

});
