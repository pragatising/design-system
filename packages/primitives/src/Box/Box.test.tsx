import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('renders children correctly', () => {
    render(<Box>Hello World</Box>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies background color', () => {
    render(<Box bg="#ff0000">Colored Box</Box>);
    const box = screen.getByText('Colored Box');
    expect(box).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('applies padding', () => {
    render(<Box p={16}>Padded Box</Box>);
    const box = screen.getByText('Padded Box');
    expect(box).toHaveStyle({ padding: '16px' });
  });

  it('applies margin', () => {
    render(<Box m={8}>Margined Box</Box>);
    const box = screen.getByText('Margined Box');
    expect(box).toHaveStyle({ margin: '8px' });
  });

  it('applies border radius', () => {
    render(<Box borderRadius={4}>Rounded Box</Box>);
    const box = screen.getByText('Rounded Box');
    expect(box).toHaveStyle({ borderRadius: '4px' });
  });

  it('renders as different element when "as" prop is provided', () => {
    render(<Box as="button">Button Box</Box>);
    const box = screen.getByText('Button Box');
    expect(box.tagName).toBe('BUTTON');
  });

  it('can be nested', () => {
    render(
      <Box bg="#f0f0f0">
        Outer
        <Box bg="#ffffff">Inner</Box>
      </Box>
    );
    expect(screen.getByText('Outer')).toBeInTheDocument();
    expect(screen.getByText('Inner')).toBeInTheDocument();
  });

  it('accepts className', () => {
    render(<Box className="custom-class">Custom</Box>);
    const box = screen.getByText('Custom');
    expect(box).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>Ref Box</Box>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

