import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import Mainboard from './Mainboard';

//Smoke test
test('renders Mainboard component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <Mainboard />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('Mainboard component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <Mainboard />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});