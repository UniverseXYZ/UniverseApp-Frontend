import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import GreenClockIcon from '../../../../../../../assets/images/marketplace/green-clock.svg';

import { useDateCountdown } from '../../../../../../hooks';
import * as styles from './styles';

export interface INFTItemAuctionCountdownProps {
  auctionExpireDate: Date;
  onAuctionTimeOut: () => void;
}

export const NFTItemAuctionCountdown = ({ auctionExpireDate, onAuctionTimeOut }: INFTItemAuctionCountdownProps) => {
  const [showAuctionTimer, setShowAuctionTimer] = useState(true);

  const { countDownString, isRunning } = useDateCountdown(auctionExpireDate, () => {
    setShowAuctionTimer(false);
    onAuctionTimeOut();
  });

  return !showAuctionTimer ? null : (
    <Flex {...styles.WrapperStyle}>
      {isRunning && countDownString && (
        <Box {...styles.ContainerStyle}>
          <Text  {...styles.TextStyle}>
            <Image src={GreenClockIcon} {...styles.IconStyle} />
            {countDownString} left
          </Text>
        </Box>
      )}
    </Flex>
  );
}
