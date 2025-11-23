import React from 'react';
import styled from 'styled-components';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to render inside the box */
  children?: React.ReactNode;
  /** Background color */
  bg?: string;
  /** Padding (in px or rem) */
  p?: number | string;
  /** Margin (in px or rem) */
  m?: number | string;
  /** Border radius */
  borderRadius?: number | string;
  /** Element type to render */
  as?: React.ElementType;
}

const StyledBox = styled.div<BoxProps>`
  background-color: ${(props) => props.bg || 'transparent'};
  padding: ${(props) => (typeof props.p === 'number' ? `${props.p}px` : props.p || '0')};
  margin: ${(props) => (typeof props.m === 'number' ? `${props.m}px` : props.m || '0')};
  border-radius: ${(props) =>
    typeof props.borderRadius === 'number'
      ? `${props.borderRadius}px`
      : props.borderRadius || '0'};
  box-sizing: border-box;
`;

/**
 * Box is the fundamental building block for layouts.
 * It's a flexible container that accepts styling props.
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, as = 'div', ...props }, ref) => {
    return (
      <StyledBox ref={ref} as={as} {...props}>
        {children}
      </StyledBox>
    );
  }
);

Box.displayName = 'Box';

