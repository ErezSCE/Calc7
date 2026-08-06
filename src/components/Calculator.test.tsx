import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './Calculator';

describe('Calculator component', () => {
  test('renders input and button', () => {
    render(<Calculator />);
    expect(screen.getByPlaceholderText(/enter expression/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  test('error disappears after input change', () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(/enter expression/i) as HTMLInputElement;
    // Trigger error
    fireEvent.change(input, { target: { value: '2+2a' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
    expect(screen.getByTestId('error')).toBeInTheDocument();
    // Modify input
    fireEvent.change(input, { target: { value: '2+2' } });
    // Error should be cleared
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });


  test('evaluates a valid expression', () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(/enter expression/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2+3*4' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
    expect(screen.getByTestId('result')).toHaveTextContent('Result: 14');
  });

  test('shows validation error for invalid characters', () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(/enter expression/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2++2' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });
});
