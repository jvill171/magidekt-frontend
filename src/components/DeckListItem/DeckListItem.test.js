import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import DeckListItem from './DeckListItem';

//Smoke test
test('renders DeckListItem component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <DeckListItem />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('DeckListItem component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <DeckListItem />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});