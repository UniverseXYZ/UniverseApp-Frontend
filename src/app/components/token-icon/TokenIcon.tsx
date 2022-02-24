import { Image, ImageProps } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { TokenTicker } from '../../enums';
import { TOKENS_MAP } from '../../constants';

interface ITokenIconProps extends ImageProps {
  ticker: TokenTicker;
  variant?: number;
  size?: number | string | [number, number];
}

export const TokenIcon = (
  {
    ticker,
    variant = 0,
    size,
    height: _height,
    width: _width,
    ...props
  }: ITokenIconProps
) => {
  const iconIndex = useMemo(() => {
    if (variant < 0 || variant > TOKENS_MAP[ticker]?.icons.length) {
      return 0;
    }
    return variant;
  }, [ticker, variant]);

  const height = useMemo(() => {
    if (_height) {
      return _height;
    }

    if (size) {
      switch (typeof size) {
        case 'number': return `${size}px`;
        case 'string': return size;
        case 'object': return size[1];
      }
    }
  }, [_height, size]);

  const width = useMemo(() => {
    if (_width) {
      return _width;
    }

    if (size) {
      switch (typeof size) {
        case 'number': return `${size}px`;
        case 'string': return size;
        case 'object': return size[0];
      }
    }
  }, [_width, size]);

  return !TOKENS_MAP[ticker] ? null : (
    <Image
      src={TOKENS_MAP[ticker].icons[iconIndex]}
      alt={TOKENS_MAP[ticker].name}
      {...props}
      height={height}
      width={width}
    />
  );
};
