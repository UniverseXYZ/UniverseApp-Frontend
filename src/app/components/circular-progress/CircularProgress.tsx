import { Box, Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

interface ICircularProgressProps extends Omit<IconProps,'h' | 'w'> {
  strokeWidth?: string;
}

export const CircularProgress = (props: ICircularProgressProps) => {
  const {
    boxSize = '40px',
    strokeWidth = '4px',
    ...rest
  } = props;
  return (
    <Icon
      viewBox="0 0 100 100"
      boxSize={boxSize}
      animation={'animation-b7n1on 2s linear infinite'}
      {...rest}
    >
      <Box
        as={'circle'}
        cx="50"
        cy="50"
        r="42"
        stroke-width={strokeWidth}
        stroke={'rgba(215 215 215 / 20%)'}
        fill={'transparent'}
      />
      <Box
        as={'circle'}
        cx="50"
        cy="50"
        r="42"
        stroke-width={strokeWidth}
        stroke={'url(#paint0_linear_10427_133468)'}
        fill={'transparent'}
        animation={'animation-17vs1pd 1.5s linear infinite'}
      />

      <linearGradient
        id="paint0_linear_10427_133468"
        x1="0"
        y1="0"
        x2="80"
        y2="80"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#BCEB00"></stop>
        <stop offset="1" stop-color="#00EAEA"></stop>
      </linearGradient>
    </Icon>
  );
}
