import { ContainerProps, SkeletonProps } from '@chakra-ui/react';

const START_COLOR = '#e0e0e0';
const END_COLOR = '#cecece';

export const Cover: SkeletonProps = {
  startColor: '#ececec',
  endColor: '#e5e5e5',
  speed: 1,

  h: '400px',
  w: '100%',
};

export const Container: ContainerProps = {
  padding: 0,
  px: ['16px', null, '24px', '40px'],
  margin: 0,
  mt: '-110px',
  maxW: '100%',
  pos: 'relative',
  zIndex: 1,
};

export const Avatar: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: 'full',
  boxSize: '70px',
};

export const Name: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: '100px',
  h: '28px',
  w: '100px',
};

export const Address: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: '100px',
  h: '24px',
  w: '136px',
};

export const SocialLink: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: 'full',
  boxSize: '20px',
};

export const HeroButton: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: '12px',
};

export const Statistic: SkeletonProps = {
  startColor: START_COLOR,
  endColor: END_COLOR,
  speed: 1,

  borderRadius: '100px',
};
