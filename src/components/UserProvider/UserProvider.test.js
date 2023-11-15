import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from './UserProvider';

// Smoke test
test('renders UserProvider component without crashing', () => {
  render(
    <MemoryRouter>
      <UserProvider />
    </MemoryRouter>
  );
});

//Snapshot test
test('UserProvider component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
          <UserProvider />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});