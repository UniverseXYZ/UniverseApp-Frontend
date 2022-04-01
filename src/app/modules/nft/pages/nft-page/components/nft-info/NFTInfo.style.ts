import { BoxProps, HeadingProps, TabPanelsProps, TextProps } from '@chakra-ui/react';

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

export const NameStyle: HeadingProps = {
  fontSize: '26px',
  color: 'transparent',
  background: 'black',
  backgroundClip: 'text',
  textShadow: '2px 2px 5px rgba(255, 255, 255, 0.3)',
  textOverflow: 'break-word',
  maxW: '90%',
};

export const NFTDetailsTopSectionStyle: BoxProps = {
  p: {
    sm: '40px 20px',
    md: '60px 40px'
  },
  overflowY: {
    xl: 'scroll'
  },

  css: {
    '&::-webkit-scrollbar': {
      display: 'none',
    }
  }
};

export const TabPanelsStyle: TabPanelsProps = {
  css: {
    '> div': {
      px: 0,
      pt: '30px',
      pb: {
        xl: '30px',
      }
    }
  }
};
