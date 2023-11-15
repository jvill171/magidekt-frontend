import React from 'react';
import { render } from '@testing-library/react';
import Overlay from './Overlay';


// Smoke test 1
test('renders Overlay component without crashing', () => {
    const onCloseMock = jest.fn();
    render(
        <Overlay
            isOpen={true}
            onClose={onCloseMock}/>
    );
});
// Smoke test 2 - with child
test('renders Overlay component without crashing; With a child component', () => {
    const onCloseMock = jest.fn();
    render(
        <Overlay
            isOpen={true}
            onClose={onCloseMock}>
            {
                <>
                    <p>Test Child</p>
                </>
            }
        </Overlay>
    );
});

test('Overlay component matches snapshot', () => {
    const onCloseMock = jest.fn();
    const { asFragment } = render(
        <Overlay
            isOpen={true}
            onClose={onCloseMock} />
    );

    expect(asFragment()).toMatchSnapshot();
});
