import { BoxProps, ButtonProps, StackProps } from '@chakra-ui/react';

import { IAuctionManagedCardState } from './types';

export const getGradientWrapperStyle: (state: IAuctionManagedCardState) => BoxProps = (state) => {
  const BGs: Record<IAuctionManagedCardState, BoxProps['background']> = {
    active: 'radial-gradient(2232.66% 100% at 55.56% 0%, #2AD0CA 0%, #E1F664 22.92%, #FEB0FE 46.87%, #ABB3FC 68.23%, #5DF7A4 87.5%, #58C4F6 100%)',
    draftError: '#FF4949',
    draftPending: '#FFC700',
    draftComplete: 'linear-gradient(180deg, #BCEB00 0%, #00EAEA 100%)',
    past: 'rgba(0, 0, 0, 0.1)',
  };

  return {
    bg: BGs[state],
    borderRadius: '10px',
    boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
    pl: '10px',
    overflow: 'hidden',
    w: '100%',
  }
};

export const Wrapper: BoxProps = {
  bg: 'white',
  padding: '30px',
};

export const ExpandButton: ButtonProps = {
  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
  },
};

export const getTiresWrapperStyles: (isExpanded: boolean) => StackProps = (isExpanded) => ({
  alignItems: 'flex-start',
  display: isExpanded ? 'flex' : 'none',
  w: '100%',
})
