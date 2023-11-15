import React from 'react';
import { render } from '@testing-library/react';
import IconMTG from './IconMTG';

//Smoke test
test('renders IconMTG component without crashing', () => {
  render(<IconMTG manaData="{W}" />);
});

//Snapshot test
test('IconMTG component matches snapshot', () => {
    const { asFragment } = render(<IconMTG manaData="{W}" spaced={true} />);
    expect(asFragment()).toMatchSnapshot();
  });