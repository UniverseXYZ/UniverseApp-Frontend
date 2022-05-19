import { LinkBoxProps, TextProps } from '@chakra-ui/react';

export const PropertyContainerStyle: LinkBoxProps = {
  bg: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '12px',
  padding: '13px',
  textAlign: 'center',
}

export const PropertyNameStyle: TextProps = {
  fontSize: '10px',
  fontWeight: 500,
  mb: '5px',
  textTransform: 'uppercase',
}

export const PropertyValueStyle: TextProps = {
  fontWeight: 700,
  mb: '3px',
};
