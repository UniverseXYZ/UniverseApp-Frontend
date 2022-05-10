import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { CountdownRendererFn } from 'react-countdown/dist/Countdown';

import GreenClockIcon from '@assets/images/marketplace/green-clock.svg';

import * as styles from './NFTCardCountdown.styles';

export interface INFTCardCountdownProps {
  date: Date;
  onComplete?: () => void;
}

export const NFTCardCountdown = (props: INFTCardCountdownProps) => {
  const { date, onComplete } = props;

  const [showCountDown, setShowCountDown] = useState(true);

  const renderCountdown: CountdownRendererFn = useCallback(({ days, hours, minutes, seconds }) => {
    const generateCountdown = () => {
      if (days) {
        return `${days}d : ${zeroPad(hours)}h`;
      }

      if (hours) {
        return `${zeroPad(hours)}h : ${zeroPad(minutes)}m`;
      }

      if (minutes) {
        return `${zeroPad(minutes)}m`;
      }

      return `${zeroPad(seconds)}s`;
    }
    return `${generateCountdown()} left`;
  }, [])

  return !showCountDown ? null : (
    <Flex {...styles.Wrapper}>
      <Box {...styles.Container}>
        <Text  {...styles.Text}>
          <Image src={GreenClockIcon} {...styles.Icon} />
          {/*@ts-ignore*/}
          <Countdown
            date={date}
            renderer={renderCountdown}
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
