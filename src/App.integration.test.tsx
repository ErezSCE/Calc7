// src/App.integration.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Calculator integration via App component', () => {
  it('evaluates a valid expression through the full UI flow', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter expression/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '3+4*2' } });
    const button = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(button);
    const result = screen.getByTestId('result');
    expect(result).toHaveTextContent('Result: 11');
  });

  it('displays an error for an invalid expression', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter expression/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '5/**/2' } });
    const button = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(button);
    const error = screen.getByTestId('error');
    expect(error).toBeInTheDocument();
  });
});
