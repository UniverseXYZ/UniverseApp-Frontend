import { BoxProps, SimpleGridProps, StackProps } from '@chakra-ui/react';

export const Wrapper: BoxProps = {
  bgColor: "#e5e5e5",
  borderRadius: "12px",
  boxSizing: "border-box",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

export const Grid: SimpleGridProps = {
  borderRadius: '12px',
  columns: [2, null, null, 4],
  spacing: '1px',
};

export const ItemWrapper: StackProps = {
  bgColor: 'white',
  padding: '30px 0',
}

export const ItemLabel: BoxProps = {
  alignItems: 'center',
  color: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '140%',
}

export const ItemValue: BoxProps = {
  alignItems: 'center',
  color: 'black',
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  display: 'flex',
  lineHeight: '140%',
}

