import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import AuthForm from './AuthForm';

//Smoke test
test('renders AuthForm component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <AuthForm />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('AuthForm component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <AuthForm />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});