import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import SingleMovie from './singleMovie'

jest.mock('');

describe('Single movies component', () => {

  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SingleMovie />, div);
  });

});
