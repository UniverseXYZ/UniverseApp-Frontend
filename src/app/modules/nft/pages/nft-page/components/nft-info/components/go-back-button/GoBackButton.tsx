import { Button, Image, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

import ArrowIcon from '@assets/images/arrow-2.svg';

import * as styles from './GoBackButton.styles';

export const GoBackButton = () => {
  const router = useRouter();

  return !(typeof window !== 'undefined' && window.history?.length) ? null : (
    <>
      <Tooltip
        hasArrow
        variant={'black'}
        placement={'top'}
        label={'Go back'}
        {...styles.BackButtonTooltipStyle}
      >
        <Button variant={'simpleOutline'} {...styles.BackButtonStyle} onClick={() => router.back()}>
          <Image src={ArrowIcon} />
        </Button>
      </Tooltip>

      <Button
        leftIcon={<Image src={ArrowIcon} mr={'10px'} />}
        variant={'simpleOutline'}
        {...styles.MobileBackButtonStyle}
        onClick={() => router.back()}
      >
        Go back
      </Button>
    </>
  );
}
