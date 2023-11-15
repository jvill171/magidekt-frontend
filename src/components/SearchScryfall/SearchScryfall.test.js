import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import SearchScryfall from './SearchScryfall';

//Smoke test
test('renders SearchScryfall component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <SearchScryfall />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('SearchScryfall component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <SearchScryfall />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});