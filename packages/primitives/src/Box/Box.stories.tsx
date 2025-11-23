import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    bg: { control: 'color' },
    p: { control: 'number' },
    m: { control: 'number' },
    borderRadius: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'This is a Box',
    bg: '#f0f0f0',
    p: 16,
    m: 8,
    borderRadius: 4,
  },
};

export const WithColor: Story = {
  args: {
    children: 'Colored Box',
    bg: '#3b82f6',
    p: 24,
    borderRadius: 8,
  },
  render: (args) => (
    <Box {...args} style={{ color: 'white', fontWeight: 'bold' }}>
      {args.children}
    </Box>
  ),
};

export const Nested: Story = {
  render: () => (
    <Box bg="#f3f4f6" p={20} borderRadius={8}>
      <h3 style={{ margin: '0 0 12px 0' }}>Outer Box</h3>
      <Box bg="#ffffff" p={16} borderRadius={4}>
        <p style={{ margin: 0 }}>Inner Box - Boxes can be nested!</p>
      </Box>
    </Box>
  ),
};

export const AsButton: Story = {
  args: {
    as: 'button',
    children: 'I am a button!',
    bg: '#10b981',
    p: 12,
    borderRadius: 6,
  },
  render: (args) => (
    <Box
      {...args}
      style={{
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
      }}
      onClick={() => alert('Box as button clicked!')}
    >
      {args.children}
    </Box>
  ),
};

