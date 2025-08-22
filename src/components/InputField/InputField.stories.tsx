import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, and accessibility features.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input field',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme of the input field',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Whether the input is in an invalid state',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether to show a loading spinner',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether to show a clear button',
    },
    passwordToggle: {
      control: { type: 'boolean' },
      description: 'Whether to show a password visibility toggle',
    },
    onChange: { action: 'changed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic InputField
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email with anyone else.',
  },
};

// With different variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <InputField
        label="Filled Variant"
        placeholder="Filled input"
        variant="filled"
      />
      <InputField
        label="Outlined Variant"
        placeholder="Outlined input"
        variant="outlined"
      />
      <InputField
        label="Ghost Variant"
        placeholder="Ghost input"
        variant="ghost"
      />
    </div>
  ),
};

// With different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <InputField
        label="Small Size"
        placeholder="Small input"
        size="sm"
      />
      <InputField
        label="Medium Size"
        placeholder="Medium input"
        size="md"
      />
      <InputField
        label="Large Size"
        placeholder="Large input"
        size="lg"
      />
    </div>
  ),
};

// With validation states
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <InputField
        label="Valid Input"
        placeholder="Valid input"
        helperText="This input is valid"
      />
      <InputField
        label="Invalid Input"
        placeholder="Invalid input"
        invalid
        errorMessage="This field is required"
      />
      <InputField
        label="Disabled Input"
        placeholder="Disabled input"
        disabled
        helperText="This input is disabled"
      />
    </div>
  ),
};

// With loading state
export const Loading: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'Loading...',
    loading: true,
  },
};

// With clear button
export const WithClearButton: Story = {
  args: {
    label: 'Clearable Input',
    placeholder: 'Type something to clear',
    clearable: true,
    value: 'Sample text',
  },
};

// With password toggle
export const WithPasswordToggle: Story = {
  args: {
    label: 'Password Input',
    placeholder: 'Enter your password',
    passwordToggle: true,
    type: 'password',
  },
};

// With both clear and password toggle
export const WithClearAndPassword: Story = {
  args: {
    label: 'Password with Clear',
    placeholder: 'Enter password',
    clearable: true,
    passwordToggle: true,
    value: 'secret123',
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Input',
    placeholder: 'Dark themed input',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Complex example with all features
export const ComplexExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <InputField
        label="Full Name"
        placeholder="Enter your full name"
        helperText="As it appears on your ID"
        variant="filled"
        size="lg"
        clearable
      />
      <InputField
        label="Email Address"
        placeholder="Enter your email address"
        helperText="We'll send a confirmation to this email"
        variant="outlined"
        size="md"
        clearable
      />
      <InputField
        label="Password"
        placeholder="Create a strong password"
        helperText="Must be at least 8 characters"
        variant="ghost"
        size="md"
        passwordToggle
        clearable
      />
      <InputField
        label="Confirm Password"
        placeholder="Confirm your password"
        invalid
        errorMessage="Passwords do not match"
        variant="outlined"
        size="md"
        passwordToggle
      />
    </div>
  ),
};

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <InputField
        label="Required Field"
        placeholder="This field is required"
        helperText="This field is required for form submission"
        aria-required="true"
      />
      <InputField
        label="With Description"
        placeholder="Input with description"
        helperText="This input has additional context"
        aria-describedby="input-description"
      />
      <div id="input-description" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
        Additional description for screen readers
      </div>
    </div>
  ),
};
