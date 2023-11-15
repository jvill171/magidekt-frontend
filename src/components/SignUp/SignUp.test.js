import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import SignUp from './SignUp';

//Smoke test
test('renders SignUp component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <SignUp />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('SignUp component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <SignUp />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});