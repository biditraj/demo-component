import React, { useState, forwardRef } from 'react';
import './InputField.css';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  passwordToggle?: boolean;
  theme?: 'light' | 'dark';
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value = '',
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = 'outlined',
      size = 'md',
      clearable = false,
      passwordToggle = false,
      theme = 'light',
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(e);
    };

    const handleClear = () => {
      setInputValue('');
      // Create a synthetic event for onChange
      const syntheticEvent = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = passwordToggle && !showPassword ? 'password' : 'text';

    const containerClasses = [
      'input-field',
      `input-field--${variant}`,
      `input-field--${size}`,
      `input-field--${theme}`,
      isFocused && 'input-field--focused',
      invalid && 'input-field--invalid',
      disabled && 'input-field--disabled',
      loading && 'input-field--loading'
    ].filter(Boolean).join(' ');

    const inputClasses = [
      'input-field__input',
      `input-field__input--${variant}`,
      `input-field__input--${size}`,
      `input-field__input--${theme}`,
      invalid && 'input-field__input--invalid',
      disabled && 'input-field__input--disabled'
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label className="input-field__label" htmlFor={props.id || `input-${Math.random().toString(36).substr(2, 9)}`}>
            {label}
          </label>
        )}
        
        <div className="input-field__wrapper">
          <input
            ref={ref}
            type={inputType}
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={inputClasses}
            aria-invalid={invalid}
            aria-describedby={
              [
                helperText && 'helper-text',
                errorMessage && 'error-message'
              ].filter(Boolean).join(' ') || undefined
            }
            {...props}
          />
          
          {loading && (
            <div className="input-field__loading">
              <div className="input-field__spinner"></div>
            </div>
          )}
          
          {clearable && inputValue && !disabled && (
            <button
              type="button"
              className="input-field__clear"
              onClick={handleClear}
              aria-label="Clear input"
            >
              ✕
            </button>
          )}
          
          {passwordToggle && (
            <button
              type="button"
              className="input-field__password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          )}
        </div>
        
        {helperText && !errorMessage && (
          <div id="helper-text" className="input-field__helper-text">
            {helperText}
          </div>
        )}
        
        {errorMessage && (
          <div id="error-message" className="input-field__error-message">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
