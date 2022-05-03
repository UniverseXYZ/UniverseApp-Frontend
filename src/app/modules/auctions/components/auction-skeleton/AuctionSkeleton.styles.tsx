import { useMeasure } from 'react-use';
import { Box, BoxProps, Flex, SimpleGridProps } from '@chakra-ui/react';

export const Wrapper: BoxProps = {
  bg: 'white',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
};

export const Asset: BoxProps = {
  bg: '#ECECEC',
  pos: 'relative',
};

export const TimerWrapper: BoxProps = {
  alignItems: 'center',
  bottom: '14px',
  border: '2px solid rgba(0, 0, 0, 0.05)',
  borderRadius: '100px',
  display: 'flex',
  flexDir: 'column',
  left: '50%',
  padding: '6px 24px',
  pos: 'absolute',
  transform: 'translateX(-50%)',
};

export const TimerLabel: BoxProps = {
  bg: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '30px',
  h: '8px',
  mb: '4px',
  w: '50%',
};

export const TimerValue: BoxProps = {
  bg: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '30px',
  h: '14px',
  w: '86px',
};

export const ContentWrapper: BoxProps = {
  padding: '18px 14px',
};

export const Title: BoxProps = {
  bg: '#E6E6E6',
  borderRadius: '30px',
  height: '18px',
  mb: '6px',
  width: '75%',
};

export const CreatorAvatar: BoxProps = {
  bg: '#E6E6E6',
  borderRadius: '50%',
  boxSize: '24px',
  mr: '6px',
};

export const CreatorName: BoxProps = {
  bg: '#E6E6E6',
  borderRadius: '30px',
  h: '12px',
  w: '30%',
};

export const DetailsWrapper: SimpleGridProps = {
  background: '#F7F7F7',
  border: '1px solid #F0F0F0',
  borderRadius: '6px',
  paddingX: '16px',
};

export const DetailsItem: BoxProps = {
  borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  paddingY: '16px',

  sx: {
    ':nth-of-type(1), :nth-of-type(2)': {
      borderTop: 0,
    },
  },
};

export const DetailsItemLabel: BoxProps = {
  background: '#E6E6E6',
  borderRadius: '30px',
  h: '10px',
  w: '80%',
  mb: '8px',
};

export const DetailsItemValue: BoxProps = {
  background: '#E6E6E6',
  borderRadius: '30px',
  h: '17px',
  w: '40%',
};

export const MyBidWrapper: BoxProps = {
  alignItems: 'center',
  border: '2px solid #E6E6E6',
  borderRadius: '8px',
  display: 'flex',
  padding: '20px',
  pos: 'relative',
  mb: '14px',
};

export const MyBidLabel: BoxProps = {
  bg: '#E6E6E6',
  border: '2px solid white',
  borderRadius: '30px',
  left: '20px',
  pos: 'absolute',
  top: '-1px',
  transform: 'translateY(-50%)',
  h: '12px',
  w: '45px',
};

export const MyBidValue: BoxProps = {
  bg: '#E6E6E6',
  borderRadius: '30px',
  mr: '4px',
  h: '26px',
  w: '35%',
};


export const MyBidValueUSD: BoxProps = {
  bg: '#E6E6E6',
  borderRadius: '30px',
  mr: '4px',
  h: '14px',
  w: '25%',
};
