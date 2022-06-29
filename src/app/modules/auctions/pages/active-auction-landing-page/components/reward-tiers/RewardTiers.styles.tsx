import { BoxProps, ButtonProps, ContainerProps, HeadingProps, TextProps } from "@chakra-ui/react";

export const WrapperStyle: BoxProps = {
  bg: '#fff',
  padding: '120px 0',
};

export const ContainerStyle: ContainerProps = {
  margin: '0 auto',
  maxW: '1110px',
  padding: { base: '0 20px', xl: '0' },
};

export const HeadingWrapperStyle: BoxProps = {
  textAlign: 'center',
  marginBottom: '40px',
  padding: { base: '0 20px', md: '0 80px', xl: '0' },
};

export const HeadingStyle: HeadingProps = {
  fontSize: '26px',
  lineHeight: '32px',
  fontWeight: 600,
  marginBottom: '8px',
};

export const TextStyle: TextProps = {
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '20px',
};

export const TierWrapperStyle: BoxProps = {
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow:'0px 10px 36px rgba(136, 120, 172, 0.14)',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: {
    base: 'column',
    md: 'row',
  },
  margin: '16px 0',
  padding: {
    base: '20px',
    md: '40px 20px',
  },
  sx: {
    '> *': {
      flex: '1',
    }
  }
};

export const TierImagesWrapperStyle: BoxProps = {
  display: 'flex',
  justifyContent:'space-evenly',
  maxWidth: {
    base: '150px',
    lg: '330px',
  },
  marginBottom: {
    base: '20px',
    lg: '0',
  },
  position: 'relative',
  sx: {
    'img': {
      marginLeft: {
        base: '-60px',
        lg: '-80px',
      },
      '_first': {
        marginLeft: '0',
      }
    }
  }
};

export const MoreImagesBubbleStyle: BoxProps = {
  background: '#FFFFFF',
  borderRadius: '50%',
  boxShadow:'0px 10px 36px rgba(0, 0, 0, 0.1)',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  marginTop: '-22px',
  right: {
    base: '-115px',
    lg: '-80px',
  },
  width: '45px',
  height: '45px',
  cursor: 'pointer',
  '_hover': {
    boxShadow:'0px 10px 36px rgba(0, 0, 0, 0.3)',
  }
};

export const TierSymbolStyle: BoxProps = {
  borderRadius: '50%',
  display: 'block',
  height: '24px',
  width: '24px',
  marginRight: '8px',
  sx: {
    '&.u-platinium': {
      bg: '#80CCDF',
    },

    '&.u-gold': {
      bg:'#DDBC45',
    },

    '&.u-silver': {
      bg:'#BCBCBC',
    }
  }
};

export const TierHeadingStyle: HeadingProps = {
  fontSize: '20px',
  lineHeight: '24px',
  fontWeight: 600,
};

export const TierDetailsWrapperStyle: BoxProps = {
  display: 'flex',
  flexWrap: 'wrap',
};

export const TierDetailStyle: BoxProps = {
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '100px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '700',
  margin: '4px 8px 4px 0',
  padding: '6px 16px',
};

export const TierTextStyle: TextProps = {
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '14px',
  lineHeight: '20px',
};

export const TierButtonStyle: ButtonProps = {
  boxShadow: 'lg',
  w: { base: '100%', md: 'fit-content' },
};
