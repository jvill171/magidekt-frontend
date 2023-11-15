import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import Profile from './Profile';

//Smoke test
test('renders Profile component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <Profile />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('Profile component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <Profile />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});