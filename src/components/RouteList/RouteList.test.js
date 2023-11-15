import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProvider from '../UserProvider/UserProvider';
import RouteList from './RouteList';

//Smoke test
test('renders RouteList component without crashing', () => {
    render(
        <MemoryRouter>
        <UserProvider>
            <RouteList />
        </UserProvider>
        </MemoryRouter>
    );
});

//Snapshot test
test('RouteList component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <RouteList />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});