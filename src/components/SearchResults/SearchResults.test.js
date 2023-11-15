import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import SearchResults from './SearchResults';

//Smoke test
test('renders SearchResults component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <SearchResults />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('SearchResults component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <SearchResults />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});