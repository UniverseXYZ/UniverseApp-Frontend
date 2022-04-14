import { BoxProps, TextProps } from '@chakra-ui/react';

export const EditionTextStyle: TextProps = {
  color: 'rgba(0, 0, 0, 0.6)',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 500,
  mb: '30px',
};

export const BrokenAssetStyle: BoxProps = {
  boxSize: 'calc(100vh - 84px - 120px)',

  _before: {
    borderRadius: '12px',
  },

  sx: {
    img: {
      boxSize: '68px',
      m: 'auto',
      mb: '12px',
    }
  }
};
