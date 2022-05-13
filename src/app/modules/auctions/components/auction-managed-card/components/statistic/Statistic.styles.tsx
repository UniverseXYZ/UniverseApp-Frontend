import { BoxProps, TextProps } from '@chakra-ui/react';

export const ItemWrapper: BoxProps = {
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  padding: {
    base: '14px',
    md: '20px 30px'
  },
};

export const Label: TextProps = {
  color: 'rgba(0 0 0 / 60%)',
  fontSize: '10px',
  fontWeight: 500,
  mb: '10px',
  textTransform: 'uppercase',
};

export const Value: TextProps = {
  fontSize: '20px',
  fontWeight: 500,
};

export const USDValue: TextProps = {
  color: 'rgba(0 0 0 / 40%)',
  fontSize: '12px',
  fontWeight: 400,
};
