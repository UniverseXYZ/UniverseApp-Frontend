import { Button, ButtonProps, Image } from '@chakra-ui/react';
import React, { LegacyRef } from 'react';

import ArrowLeftIcon from '../../../assets/images/marketplace/bundles-left-arrow.svg';
import ArrowRightIcon from '../../../assets/images/marketplace/bundles-right-arrow.svg';

import * as styles from './styles';

interface ISwiperArrowButtonProps extends ButtonProps {
  dir: 'left' | 'right';
}

export const SwiperArrowButton = React.forwardRef((
  { dir, ...props }: ISwiperArrowButtonProps,
  ref: LegacyRef<HTMLButtonElement> | undefined
) => (
  <Button ref={ref} variant={'simpleOutline'} {...styles.ButtonStyles} {...props}>
    <Image src={dir === 'left' ? ArrowLeftIcon : ArrowRightIcon} width={'9px'} />
  </Button>
));
