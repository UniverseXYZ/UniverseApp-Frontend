import { BoxProps, HeadingProps, StackProps, TextProps } from '@chakra-ui/react';

export const AlertInfo: StackProps = {
  alignItems: 'flex-start',
  background: 'rgba(79, 106, 229, 0.04)',
  border: '1px solid rgba(79, 106, 229, 0.4)',
  borderRadius: '12px',
  color: '#4D66EB',
  padding: '16px',
  fontSize: '12px',
  fontWeight: 600,
  mb: '16px',
};

export const AssetStyle: BoxProps = {
  sx: {
    'img, video': {
      borderRadius: '4px',
      boxSize: '80px',
      objectFit: 'cover',
    }
  }
};

export const AssetCongratsStyle: BoxProps = {
  display: 'table',
  my: '30px',
  mx: 'auto',
  pos: 'relative',

  sx: {
    'img, video': {
      borderRadius: '6px',
      boxSize: '295px',
      objectFit: 'cover',
    }
  }
};

export const Text: TextProps = {
  fontSize: '14px',
  fontWeight: 700,
};

export const SecondaryText: TextProps = {
  color: '#00000066',
  fontSize: '12px',
  fontWeight: 700,
};

export const DataLabel: TextProps = {
  fontSize: '16px',
  fontWeight: 600,
};

export const PriceContainerStyle: BoxProps = {
  textAlign: 'right',
};

export const TitleStyle: HeadingProps = {
  fontSize: '20px',
  mb: '40px',
  textAlign: 'center',
};

export const NFTWrapper: StackProps = {
  padding: '8px 0 32px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
};

export const AmountWrapper: StackProps = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  justifyContent: 'space-between',
  py: '24px',
};
