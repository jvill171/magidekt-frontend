import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import DeckBuilder from './DeckBuilder';

//Smoke test
test('renders DeckBuilder component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <DeckBuilder />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('DeckBuilder component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <DeckBuilder />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});