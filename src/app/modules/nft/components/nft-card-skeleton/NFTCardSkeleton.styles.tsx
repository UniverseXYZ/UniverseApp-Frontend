import { BoxProps, SkeletonProps, StackProps } from '@chakra-ui/react';

const START_COLOR = '#E6E6E6';
const END_COLOR = '#c7c7c7';

export const Wrapper: BoxProps = {
  bg: 'white',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
};

export const AssetWrapper: BoxProps = {
  pos: 'relative',
};

export const Asset: SkeletonProps = {
  startColor: '#ECECEC',
  endColor: '#dadada',
  pos: 'absolute',
  left: 0,
  top: 0,
  boxSize: '100%',
};

export const ContentWrapper: BoxProps = {
  padding: '14px',
};

export const Title: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,
  borderRadius: '30px',
  height: '18px',
  width: '50%',
};

export const Price: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,
  borderRadius: '30px',
  height: '18px',
  width: '15%',
};

export const CollectionName: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,
  borderRadius: '30px',
  h: '16px',
  w: '30%',
};

export const Footer: StackProps = {
  spacing: '8px',

  borderTop: '1px solid #E6E6E6',
  padding: '14px 0 0',
};

export const FooterLabel1: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: '8px',
  h: '32px',
  w: '42px',
};

export const FooterLabel2: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: '8px',
  h: '32px',
  w: '60px',
};

export const FooterLabel3: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: '8px',
  h: '32px',
  w: '32px',
};
