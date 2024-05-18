import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todo from './ToDo';

describe('Todo Component', () => {
  test('renders Todo component', () => {
    render(<Todo />);
    expect(screen.getByText('ToDo List')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<Todo />);

    fireEvent.change(screen.getByPlaceholderText('Add TO DO'), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('marks a task as done', () => {
    render(<Todo />);

    fireEvent.change(screen.getByPlaceholderText('Add TO DO'), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getByLabelText('Completed'));

    expect(screen.getByText('New Task').closest('s')).toBeInTheDocument();
  });

});
