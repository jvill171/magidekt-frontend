import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import DeckCategoryCards from './DeckCategoryCards';

//Smoke test
test('renders DeckCategoryCards component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <DeckCategoryCards />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('DeckCategoryCards component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <DeckCategoryCards />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});