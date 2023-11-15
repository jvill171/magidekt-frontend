import React, { Fragment } from 'react';
import { render } from '@testing-library/react';
import { stringMana, identityToMana, determineIdentity } from './toMana';

describe('stringMana', () => {
  it('should convert mana symbols within curly braces to IconMTG components', () => {
    const inputString = 'An example {R} String';
    const result = stringMana(inputString);

    // Provide a key for each child element for test
    const keyedRes = result.map((element, index) => (
      <Fragment key={index}>{element}</Fragment>
    ));

    const { container } = render(<div>{keyedRes}</div>);

    // Assuming IconMTG is rendering a span with the class "mana"
    const manaIcons = container.querySelectorAll('.mana');

    // Assert the number of IconMTG components rendered
    expect(manaIcons.length).toBe(1);
  });

  it('should convert multiple mana symbols within curly braces to IconMTG components', () => {
    const inputString = 'A {W} test {R} string';
    const result = stringMana(inputString);

    // Provide a key for each child element for test
    const keyedRes = result.map((element, index) => (
      <Fragment key={index}>{element}</Fragment>
    ));

    const { container } = render(<div>{keyedRes}</div>);

    // Assuming IconMTG is rendering a span with the class "mana"
    const manaIcons = container.querySelectorAll('.mana');

    // Assert the number of IconMTG components rendered
    expect(manaIcons.length).toBe(2);
  });

  it('should return the input string if lacking curly braces', () => {
    const inputString = 'A test string';
    const result = stringMana(inputString);

    expect(inputString).toEqual(result)
  });
});


describe('identityToMana', () => {
  it('should convert a string of mana identity to an array of IconMTG components', () => {
    const manaID = 'RGBWU';
    const { container } = render(<div>{identityToMana(manaID)}</div>);

    // Assuming IconMTG is rendering a span with the class "mana"
    const manaIcons = container.querySelectorAll('.mana');

    // Assert the number of IconMTG components rendered
    expect(manaIcons.length).toBe(5);
  });

  it('should convert an empty string of mana identity to a single IconMTG component for colorless mana', () => {
    const manaID = '';
    const { container } = render(<div>{identityToMana(manaID)}</div>);
  
    // Expect a single colorless manaIcon
    const manaIcon = container.querySelector('.mana');
  
    expect(manaIcon).toBeInTheDocument();

    // Assert that the title attribute of the IconMTG component is "C"
    expect(manaIcon.getAttribute('title')).toBe('C');
  });
});

describe('determineIdentity', () => {
  it('should determine the color identity based on an array of cards', () => {
    const cards = [
      { magidekt: { action: 'add' }, color_identity: ['W', 'U'] },
      { magidekt: { action: 'remove' }, color_identity: ['B', 'R'] },
      { magidekt: { action: 'add' }, color_identity: ['G'] },
    ];

    const result = determineIdentity(cards);

    // Assert the color identity
    expect(result).toBe('WUG');
  });
  it('should determine the colorless identity if no cards', () => {
    const cards = [];

    const result = determineIdentity(cards);

    // Assert the color identity
    expect(result).toBe('');
  });
  it('should determine the colorless identity if cards are colorless', () => {
    const cards = [
      { magidekt: { action: 'add' }, color_identity: [] }
    ];

    const result = determineIdentity(cards);

    // Assert the color identity
    expect(result).toBe('');
  });
});
