import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import DeckList from './DeckList';

//Smoke test
test('renders DeckList component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <DeckList />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('DeckList component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <DeckList />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});