import { AlertProps, BoxProps, LinkProps, TextProps } from '@chakra-ui/react';

import BG_LG_Image from '@assets/images/auction-finalize-bg-lg.png';
import BG_MD_Image from '@assets/images/auction-finalize-bg-md.png';
import BG_SM_Image from '@assets/images/auction-finalize-bg-sm.png';

export const Wrapper: BoxProps = {
  bg: {
    base: `url(${BG_SM_Image}) center top / 100% no-repeat`,
    md: `url(${BG_MD_Image}) center top / 100% no-repeat`,
    lg: `url(${BG_LG_Image}) center top / 100% no-repeat`,
  },
  pb: {
    base: '80px',
    md: '100px',
  },
  px: {
    base: '20px',
    md: '60px',
    lg: '100px',
  },
};

export const MyAuctionsLink: LinkProps = {
  fontSize: '16px',
  fontWeight: 500,
  mb: '20px',
};

export const PageDescription: TextProps = {
  color: 'rgba(0 0 0 / 60%)',
  fontSize: '18px',
  fontWeight: 400,
  maxW: {
    base: '100%',
    md: '70%',
    lg: '50%'
  },
  mb: '60px',
};

export const StepTitle: TextProps = {
  fontSize: '20px',
  mb: '10px',
};

export const StepDescription: TextProps = {
  color: 'rgba(0 0 0 / 60%)',
  fontSize: '14px',
  fontWeight: 400,
  mb: '30px',
};

export const StepContainer: BoxProps = {
  pl: '10px',
  pb: '60px',
};

export const Alert: AlertProps = {
  mb: '30px',
  w: 'fit-content',
};
