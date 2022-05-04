import { BoxProps, SimpleGridProps, StackProps, TextProps } from '@chakra-ui/react';
import { AuctionCardState } from './enums';

export const Wrapper: BoxProps = {
  pos: 'relative',
  zIndex: 10,
};

export const ContentWrapper: StackProps = {
  align: 'start',
  padding: '18px 14px',
  spacing: '14px',
};

export const MyBidGradientWrapper: BoxProps = {
  bg: `
    conic-gradient(from 176.21deg at 50% 50%, #000000 -24.66deg, #FFFFFF 0.25deg, #000000 50.63deg, #000000 51.97deg, #FFFFFF 88.12deg, #000000 142.5deg, #FFFFFF 196.87deg, #000000 256.87deg, #FFFFFF 300deg, #000000 335.2deg, #000000 335.34deg, #FFFFFF 360.25deg), 
    radial-gradient(95.11% 95.11% at 36.64% 4.89%, #2AD0CA 0%, #E1F664 22.92%, #FEB0FE 46.88%, #ABB3FC 68.23%, #5DF7A4 87.5%, #58C4F6 100%)
  `,
  backgroundBlendMode: 'overlay',
  backgroundClip: 'padding-box, border-box',
  border: '2px solid transparent',
  borderRadius: '8px',
  pos: 'relative',
  w: '100%',
  sx: {
    backgroundOrigin: 'padding-box, border-box',
  },
};

export const MyBidWrapper: StackProps = {
  bg: 'white',
  borderRadius: '6px',
  padding: '18px',
  spacing: '4px',
};

export const MyBidLabel: BoxProps = {
  bg: 'white',
  color: 'rgba(0 0 0 / 40%)',
  fontSize: '10px',
  padding: '5px',
  pos: 'absolute',
  left: '20px',
  top: '-1px',
  transform: 'translateY(-50%)',
  textTransform: 'uppercase',
};

export const DetailsWrapper: SimpleGridProps = {
  bg: '#F7F7F7',
  border: '1px solid #F0F0F0',
  borderRadius: '6px',
  paddingX: '16px',
  spacingX: '10px',
  w: '100%',
};

export const DetailsItem: BoxProps = {
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  paddingY: '16px',

  sx: {
    ':nth-of-type(1), :nth-of-type(2)': {
      borderTop: 0,
    },
  },
};

export const DetailsItemLabel: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: '10px',
  fontWeight: '500',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  mb: '8px',
};

export const DetailsItemValue: TextProps = {
  color: '#000000',
  fontWeight: 700,
  fontSize: '14px',
};

export const DetailsItemValueUSD: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontWeight: 400,
  fontSize: '10px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const AssetWrapper: BoxProps = {
  bg: 'white',
  pos: 'relative',
};

export const getTimerWrapperStyle: (state: AuctionCardState, image: string, boxSize: number) => StackProps
  = (state, image, boxSize) => {
  const baseStyle: StackProps = {
    border: '2px solid transparent',
    borderRadius: '100px',
    pos: 'absolute',
    bottom: '14px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '2px 24px',
    whiteSpace: 'nowrap',
  };

  const variants: Record<AuctionCardState, StackProps> = {
    [AuctionCardState.ACTIVE]: {
      bg: `
    url(${image}) padding-box 50% calc(100% + 17px) / ${boxSize}px,
    radial-gradient(95.11% 95.11% at 36.64% 4.89%, #2AD0CA 0%, #E1F664 22.92%, #FEB0FE 46.88%, #ABB3FC 68.23%, #5DF7A4 87.5%, #58C4F6 100%)`,

      sx: {
        backgroundOrigin: 'padding-box, border-box',
      },
      _after: {
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        borderRadius: 'inherit',
        boxSize: '100%',
        content: '""',
        left: 0,
        pos: 'absolute',
        top: 0,
        zIndex: -1,
      },
    },
    [AuctionCardState.FUTURE]: {
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
    },
    [AuctionCardState.ENDED]: {
      background: 'rgba(255, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
    },
  };

  return {
    ...baseStyle,
    ...variants[state],
  };
};

export const TimerLabel: TextProps = {
  color: 'rgba(255 255 255 / 50%)',
  fontSize: '8px',
  fontWeight: 600,
  textTransform: 'uppercase',
};

export const TimerValue: TextProps = {
  color: 'white',
  fontSize: '12px',
  fontWeight: 700,
};
