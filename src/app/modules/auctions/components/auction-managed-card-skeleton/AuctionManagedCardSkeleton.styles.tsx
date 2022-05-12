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
  w: '195px',
};

export const ExpandButton: SkeletonProps = {
  ...BaseSkeletonStyles,
  borderRadius: '12px',
  boxSize: '42px',
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
  padding: '25px 30px',
  minH: '90px'
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
