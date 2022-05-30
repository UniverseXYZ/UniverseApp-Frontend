import { BoxProps, HeadingProps, ImageProps, TextProps } from '@chakra-ui/react';

export const AssetStyle: BoxProps = {
  sx: {
    'img, video': {
      borderRadius: '4px',
      objectFit: 'cover',
      h: '80px',
      w: '80px',
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
      objectFit: 'cover',
      h: '295px',
      w: '295px',
    }
  }
};

export const ButtonsContainerStyle: BoxProps = {
  display: 'flex',
  justifyContent: 'center',
  mt: '31px',

  sx: {
    button: {
      mr:'15px',

      _last: {
        mr: 0,
      }
    }
  }
}

export const CollectionNameStyle: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: '12px',
  maxW: '210px',
};

export const FeesContainerStyle: BoxProps = {
  color: '#00000066',
  fontSize: '14px',
  mb: '30px',
  mt: '10px',
  p: '28px 30px',
  w: '100%',

  sx: {
    '> div': {
      _last: {
        color: 'black',
        fontWeight: 'bold',
      },
    },
  },
};

export const NFTContainerStyle: BoxProps = {
  alignItems: 'center',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  fontWeight: 700,
  justifyContent: 'space-between',
  padding: '8px 0 24px',
};

export const PriceUSD: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: '12px',
  fontWeight: 700,
};

export const TitleStyle: HeadingProps = {
  fontSize: '20px',
  mb: '40px',
  textAlign: 'center',
};

export const TitlesContainerStyle: BoxProps = {
  fontSize: '16px',
  fontWeight: 600,
  justifyContent: 'space-between',
}

export const TotalLabel: TextProps = {
  fontSize: '16px',
  fontWeight: 700,
};

export const TotalPrice: TextProps = {
  fontSize: '18px',
  fontWeight: 700,
};
