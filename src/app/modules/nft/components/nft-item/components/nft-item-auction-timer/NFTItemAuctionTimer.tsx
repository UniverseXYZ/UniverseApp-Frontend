import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React  from 'react';

import { useDateCountDown } from '../../../../../../hooks';
import * as styles from './styles';

import greenClockIcon from '../../../../../../../assets/images/marketplace/green-clock.svg';

interface INFTItemAuctionTimerProps {
  expDate: Date;
  onAuctionTimeOut?: () => void;
}

export const NFTItemAuctionTimer = ({ expDate, onAuctionTimeOut }: INFTItemAuctionTimerProps) => {
  const { countDownString, isRunning } = useDateCountDown(expDate, onAuctionTimeOut);

  return (
    <Flex {...styles.WrapperStyle}>
      {isRunning && (
        <Box {...styles.ContainerStyle}>
          <Text  {...styles.TextStyle}>
            <Image src={greenClockIcon} {...styles.IconStyle} />
            {countDownString} left
          </Text>
        </Box>
      )}
    </Flex>
  );
};
