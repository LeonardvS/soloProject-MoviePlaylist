import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import Search from './search'

jest.mock('');

describe('Single movies component', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search />, div);
  });

  it('renders CTA text correctly', () => {
    const component = render(<Search />);
    const queryByText = component.queryByText;

    expect(queryByText(/Search:/i)).toBeInTheDocument();
    expect(queryByText(/👆 Search a movie up here 👆/i)).toBeInTheDocument();
  });
});