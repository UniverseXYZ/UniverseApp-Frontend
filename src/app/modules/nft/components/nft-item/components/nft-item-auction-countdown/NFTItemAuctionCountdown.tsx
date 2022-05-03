import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';

import GreenClockIcon from '../../../../../../../assets/images/marketplace/green-clock.svg';

import * as styles from './styles';

export interface INFTItemAuctionCountdownProps {
  date: Date;
  onComplete?: () => void;
}

export const NFTItemAuctionCountdown = ({ date, onComplete }: INFTItemAuctionCountdownProps) => {
  const [showCountDown, setShowCountDown] = useState(true);

  return !showCountDown ? null : (
    <Flex {...styles.WrapperStyle}>
      <Box {...styles.ContainerStyle}>
        <Text  {...styles.TextStyle}>
          <Image src={GreenClockIcon} {...styles.IconStyle} />
          <Countdown
            date={date}
            renderer={({ days, hours, minutes, seconds }) => {
              if (!days && !hours && !minutes) {
                return [
                  seconds || minutes ? `${zeroPad(seconds)}s` : '',
                ].filter(Boolean).join(' : ') + ' left';
              }
              return [
                days ? `${days}d` : '',
                hours ? `${zeroPad(hours)}h` : '',
                minutes ? `${zeroPad(minutes)}m` : '',
              ].filter(Boolean).join(' : ') + ' left';
            }}
            onComplete={() => {
              setShowCountDown(false);
              onComplete && onComplete();
            }}
          />
        </Text>
      </Box>
    </Flex>
  );
}
