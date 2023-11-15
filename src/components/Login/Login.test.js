import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import Login from './Login';

//Smoke test
test('renders Login component without crashing', () => {
    render(
        <MemoryRouter>
            <UserProvider>
                <Login />
            </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('Login component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});