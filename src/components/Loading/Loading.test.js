import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';

//Smoke test
test('renders Loading component without crashing', () => {
  render( <Loading /> );
});

//Snapshot test
test('Loading component matches snapshot', () => {
  const { asFragment } = render( <Loading /> );

  expect(asFragment()).toMatchSnapshot();
});
