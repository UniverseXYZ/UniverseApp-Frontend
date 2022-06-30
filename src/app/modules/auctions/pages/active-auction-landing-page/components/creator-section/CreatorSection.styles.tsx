import { BoxProps, ButtonProps, ContainerProps, HeadingProps } from "@chakra-ui/react";

export const WrapperStyle: BoxProps = {
  bg: '#fff',
  padding: { base: '10px 0 60px 0', lg: '20px 0 120px 0' },
};

export const ContainerStyle: ContainerProps = {
  margin: '0 auto',
  maxW: '1110px',
  padding: { base: '0 20px', xl: '0' },
};

export const HeadingStyle: HeadingProps = {
  fontSize: {
    lg: '32px',
    md: '26px',
    base: '20px',
  },
  lineHeight: {
    lg: '40px',
    md: '32px',
    base: '24px',
  },
  fontWeight: 600,
  marginBottom: '8px',
};

export const SocialButtonStyle: ButtonProps = {
  padding: '8px',
  _hover: {
    bg: 'rgba(0, 0, 0, .04)'
  },
  sx: {
    '.chakra-button__icon': {
      margin: '0'
    }
  }
};
