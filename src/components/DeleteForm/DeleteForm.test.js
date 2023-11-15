import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteForm from './DeleteForm';

// Mock for deleteAction
const mockDeleteAction = jest.fn();

//Smoke test
test('renders DeleteForm component without crashing', () => {
    render(<DeleteForm
            toDelete="Test Item"
            deleteAction={mockDeleteAction} />);
});

//Snapshot test
test('DeleteForm component matches snapshot', () => {
    const { asFragment } = render(
    <DeleteForm
        toDelete="Test Item"
        deleteAction={mockDeleteAction} />
    );

    expect(asFragment()).toMatchSnapshot();
});
