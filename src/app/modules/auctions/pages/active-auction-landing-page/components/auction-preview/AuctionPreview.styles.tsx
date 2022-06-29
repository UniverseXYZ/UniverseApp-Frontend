import { BoxProps, ButtonProps, ContainerProps, HeadingProps, TextProps } from "@chakra-ui/react";

export const WrapperStyle: BoxProps = {
  bg: 'linear-gradient(103.48deg, rgba(240, 233, 57, 0.16) 0%, rgba(254, 176, 254, 0.16) 49.86%, rgba(66, 164, 255, 0.16) 100%)',
  padding: '80px 0',
};

export const SliderArrowsStyle: ButtonProps = {
  padding: '8px',
  position: 'absolute',
  top: '35%',
  _hover: {
    bg: '#fff',
  },
  sx: {
    '&.u-left': {
      left: '-25px',
    },
    '&.u-right': {
      right: '-25px',
    },
    '.chakra-button__icon': {
      margin: '0'
    }
  }
}

export const AuctionItemStyle: BoxProps = {
  bg: 'transparent',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  margin: '10px',
  padding: '10px',
  position: 'relative',
  _hover: {
    bg: '#fff',
  },
  sx: {
    '&.u-active': {
      bg: '#fff',
      _before: {
        backgroundImage: 'none',
        boxShadow: 'none',
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        padding: '3px',
        background: 'linear-gradient(101deg,#bceb00,#00eaea)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      },
    }
  }
};

export const ActiveAuctionIconStyle: BoxProps = {
  borderRadius: '50%',
  bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  position: 'absolute',
  top: '-8px',
  right: '-8px',
}

export const ContainerStyle: ContainerProps = {
  margin: '0 auto',
  maxW: '1110px',
  padding: { base: '0 20px', md: '0 30px', lg: '0' },
};

export const TierWrapperStyle: BoxProps = {
  display: 'flex',
  flexDirection: {
    base: 'column',
    md: 'row',
  },
  alignItems: {
    base: 'flex-start',
    md: 'center',
  },
  sx: {
    '> *': {
      flex: '1',
    }
  }
};

export const AuctionHeadingStyle: HeadingProps = {
  fontSize: '26px',
  lineHeight: '32px',
  fontWeight: 600,
};

export const TopBiddersStyle: BoxProps = {
  bg: '#fff',
  borderRadius: '12px',
  boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
  marginTop: '20px',
  paddingTop: '32px',
};

export const BiddersListStyle: BoxProps = {
  height: '200px',
  margin: '0 32px',
  overflow: 'auto'
};

export const SingleBidderStyle: BoxProps = {
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  padding: '10px 0',
  _first: {
    border: 'none',
  }
};

export const SingleBidderVisibleInfoStyle: BoxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const BidderBadgeStyle: TextProps = {
  borderRadius: '20px',
  fontSize: '10px',
  lineHeight: '12px',
  fontWeight: '600',
  padding: '2px 6px',
  sx: {
    '&.u-platinum': {
      border: '1px solid #80CCDF',
      color: '#80CCDF',
    },

    '&.u-gold': {
      border: '1px solid #DDBC45',
      color:'#DDBC45',
    },

    '&.u-silver': {
      border: '1px solid #BCBCBC',
      color:'#BCBCBC',
    }
  }
};

export const ToggleBidButtonStyle: ButtonProps = {
  padding: '8px',
  sx: {
    '&.u-flipped': {
      transform: 'rotate(180deg)',
    },
    '.chakra-button__icon': {
      margin: '0'
    }
  }
};

export const UserBidStyle: BoxProps = {
  border: '1px solid #E5E5E5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: {
    base: 'column',
    md: 'row',
  },
  padding: '32px',
  sx: {
    '> *': {
      width: {
        base: '100%',
        md: 'auto',
      }
    }
  }
};

export const BidButtonStyle: ButtonProps = {
  boxShadow: 'lg',
  padding: '11px 16px',
  w: { base: '100%', md: 'fit-content' },
};

export const CancelButtonStyle: ButtonProps = {
  border: '1px solid red',
  boxShadow: 'none',
  padding: '11px 12px',
  '_before': {
    background: 'transparent'
  },
  '_hover': {
    background: 'rgba(255, 73, 73, 0.1)'
  },
  '_focus': {
    background: 'rgba(255, 73, 73, 0.1)'
  },
  '_active': {
    background: 'rgba(255, 73, 73, 0.1)'
  }
};
