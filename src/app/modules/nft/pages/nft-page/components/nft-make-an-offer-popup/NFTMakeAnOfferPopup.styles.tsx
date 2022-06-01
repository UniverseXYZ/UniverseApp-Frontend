import { BoxProps, ButtonProps, HeadingProps, MenuButtonProps, MenuItemProps, TextProps } from '@chakra-ui/react';

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

export const CurrencyItemStyle: MenuItemProps = {
  borderRadius: '5px',
  fontFamily: 'Space Grotesk',
  fontWeight: 500,
  padding: '10px',
  paddingRight: '20px',

  sx: {
    img: {
      mr: '10px',
      h: '20px',
      w: '20px',
    },
  },

  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
  },
  _focus: {
    bg: 'rgba(0, 0, 0, 0.05)',
  }
};

export const CurrencyMenuButtonStyle: MenuButtonProps = {
  background: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  height: '34px',
  ml: '8px',
  padding: '0 10px',

  sx: {
    '> span': {
      display: 'contents',
    },
    img: {
      _first: {
        mr: '10px',
        h: '20px',
        w: '20px',
      },
      _last: {
        ml: '10px',
        transition: '200ms',
      },
    },
  },

  _hover: {
    background: 'rgba(0, 0, 0, 0.03)',
    boxShadow: 'sm',
  },

  _focus: {
    background: 'rgba(0, 0, 0, 0.03)',
    boxShadow: 'sm',
  },

  _active: {
    boxShadow: 0,
    img: {
      _last: {
        transform: 'rotate(180deg)',
      }
    }
  },
}

export const TitleStyle: HeadingProps = {
  fontSize: '20px',
  textAlign: 'center',
};

export const TotalLabel: TextProps = {
  fontSize: '16px',
  fontWeight: 500,
};

export const TotalPrice: TextProps = {
  fontSize: '18px',
  fontWeight: 700,
};

export const TotalPriceUSD: TextProps = {
  color: '#00000066',
  fontSize: '12px',
  fontWeight: 500,
};

export const RoyaltyRemoveButton: ButtonProps = {
  borderRadius: '12px',
  boxSize: '48px',
  color: '#00000066',
  minW: 'auto',

  _hover: {
    borderColor: '#FF4949',
    color: '#FF4949',
  },
};

export const RoyaltyAddButtonIconWrapper: BoxProps = {
  bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
  borderRadius: 'full',
  boxSize: '20px',
};

export const RoyaltyAddButtonText: TextProps = {
  color: 'black !important',
  fontSize: '16px !important',
  fontWeight: '500 !important',

  _hover: {
    cursor: 'pointer',
    textDecoration: 'underline',
  }
};
