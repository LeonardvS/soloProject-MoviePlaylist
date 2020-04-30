import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import SingleMovie from './singleMovie'

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('Single movies component', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SingleMovie />, div);
  });

  it('playlistButton renders correctly', () => {
    const wrapper = shallow(<SingleMovie />);
    expect(wrapper.find('.playlistButton')).toHaveLength(1);
    expect(wrapper.text('.playlistButton')).toContain('Show Playlist');
  });

  it('playlistButton changes text upon click', () => {
    const wrapper = shallow(<SingleMovie />);
    wrapper.find('.playlistButton').simulate('click');
    expect(wrapper.text('.playlistButton')).toContain('Hide Playlist');
  });
});
