import { BoxProps, SkeletonProps } from '@chakra-ui/react';

const BaseSkeletonStyles: SkeletonProps = {
  startColor: '#E6E6E6',
  endColor: '#c7c7c7',
  speed: 1,
};

export const GradientWrapper: BoxProps = {
  bg: '#E6E6E6',
  borderRadius: '10px',
  boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
  pl: '10px',
  overflow: 'hidden',
  w: '100%',
};

export const Wrapper: BoxProps = {
  bg: 'white',
  padding: '30px',
};

export const FirstRowWrapper: BoxProps = {
  alignItems: 'center',
  flexWrap: {
    base: 'wrap',
    md: 'nowrap',
  },
  justifyContent: 'space-between',
  mb: '20px',
};

export const TitleWrapper: BoxProps = {
  flex: 1,
  flexBasis: {
    base: 'calc(100% - 42px - 14px)',
    md: 'auto',
  },
};

export const Title: SkeletonProps = {
  ...BaseSkeletonStyles,
  borderRadius: '100px',
  h: '22px',
  w: '300px',
};

export const LandingPageButton: SkeletonProps = {
  ...BaseSkeletonStyles,
  borderRadius: '12px',
  h: '42px',
  mt: {
    base: '14px',
    md: 'auto',
  },
  order: {
    base: 1,
    md: 0
  },
  w: {
    base: '100%',
    md: '195px'
  },
};

export const ExpandButton: SkeletonProps = {
  ...BaseSkeletonStyles,
  borderRadius: '12px',
  boxSize: '42px',
  ml: '14px',
};

export const Badge: SkeletonProps = {
  ...BaseSkeletonStyles,
  borderRadius: '100px',
  h: '33px',
  w: '150px',
};

export const StatisticItem: BoxProps = {
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  padding: {
    base: '14px',
    md: '25px 30px',
  },
};

export const StatisticItemName: SkeletonProps = {
  ...BaseSkeletonStyles,
  borderRadius: '100px',
  h: '12px',
  mb: '18px',
  w: '40px',
};

export const StatisticItemValue: SkeletonProps = {
  ...BaseSkeletonStyles,
  borderRadius: '100px',
  h: '20px',
  w: '90px',
};
