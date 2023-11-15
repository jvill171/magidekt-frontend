import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import DeckInfo from './DeckInfo';

//Smoke test
test('renders DeckInfo component without crashing', () => {
    render(
        <MemoryRouter>
            <UserProvider>
                <DeckInfo />
            </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('DeckInfo component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <DeckInfo />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});