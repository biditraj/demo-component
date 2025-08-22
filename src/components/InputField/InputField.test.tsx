import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField Component', () => {
  test('renders with label', () => {
    render(<InputField label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  test('renders with placeholder', () => {
    render(<InputField placeholder="Enter email" />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    render(<InputField helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  test('renders with error message', () => {
    render(<InputField errorMessage="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  test('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<InputField onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('applies disabled state correctly', () => {
    render(<InputField disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  test('applies invalid state correctly', () => {
    render(<InputField invalid />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('renders clear button when clearable is true and has value', () => {
    render(<InputField clearable value="test value" />);
    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  test('renders password toggle when passwordToggle is true', () => {
    render(<InputField passwordToggle />);
    expect(screen.getByLabelText('Show password')).toBeInTheDocument();
  });

  test('applies correct variant classes', () => {
    const { container } = render(<InputField variant="filled" />);
    expect(container.firstChild).toHaveClass('input-field--filled');
  });

  test('applies correct size classes', () => {
    const { container } = render(<InputField size="lg" />);
    expect(container.firstChild).toHaveClass('input-field--lg');
  });

  test('applies correct theme classes', () => {
    const { container } = render(<InputField theme="dark" />);
    expect(container.firstChild).toHaveClass('input-field--dark');
  });
});
