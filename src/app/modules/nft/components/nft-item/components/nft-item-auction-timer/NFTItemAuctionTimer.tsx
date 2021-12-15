import { Box, BoxProps, Flex, FlexProps, Image, ImageProps, Text, TextProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useInterval } from 'react-use';
import { default as dayjs } from 'dayjs';

import greenClockIcon from '../../../../../../../assets/images/marketplace/green-clock.svg';

interface IStyles {
  wrapper: FlexProps;
  container: BoxProps;
  text: TextProps;
  icon: ImageProps;
}

const styles: IStyles = {
  wrapper: {
    position: 'absolute',
    bottom: '10px',
    justifyContent: 'center',
    w: '100%',
    zIndex: 1,
  },
  container: {
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    borderRadius: '24px',
    color: 'white',
    padding: '6px 16px',
  },
  text: {
    fontSize: '12px',
    fontWeight: '700',
    sx: {
      background: '-webkit-linear-gradient(#BCEB00, #00EAEA)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  icon: {
    display: 'inline',
    mr: '6px',
    mt: '-3px',
  },
};

interface INFTItemAuctionTimerProps {
  expDate: Date;
  onAuctionTimeOut?: () => void;
}

export const NFTItemAuctionTimer = ({ expDate: auctionExpDate, onAuctionTimeOut }: INFTItemAuctionTimerProps) => {

  const [isRunningAuctionTime, toggleIsRunningAuctionTime] = useState(!!auctionExpDate);
  const [formattedAuctionExpTime, setFormattedAuctionExpTime] = useState<string>();

  useInterval(() => {
    const expDate = dayjs(auctionExpDate);
    const today = dayjs(new Date());

    if (expDate.diff(today) < 0) {
      toggleIsRunningAuctionTime(false);
      onAuctionTimeOut && onAuctionTimeOut();
      return;
    }

    const days = expDate.diff(today, 'd');
    const hours = expDate.diff(today, 'h') - days * 24;
    const minutes = expDate.diff(today, 'm') - hours * 60;
    const seconds = expDate.diff(today, 's') - expDate.diff(today, 'm') * 60;

    const daysString = days ? `${days}d` : '';
    const hoursString = hours || daysString ? `${hours.toString().padStart(2, '0')}h` : '';
    const minutesString = minutes || hoursString ? `${minutes.toString().padStart(2, '0')}m` : '';
    const secondsString = `${seconds.toString().padStart(2, '0')}s`;

    const formattedAuctionExpTime = [daysString, hoursString, minutesString, secondsString].filter(v => !!v).join(' : ');

    setFormattedAuctionExpTime(formattedAuctionExpTime);

  }, isRunningAuctionTime ? 1000 : null);

  return (
    <Flex {...styles.wrapper}>
      {formattedAuctionExpTime && (
        <Box {...styles.container}>
          <Text  {...styles.text}>
            <Image src={greenClockIcon} {...styles.icon} />
            {formattedAuctionExpTime} left
          </Text>
        </Box>
      )}
    </Flex>
  );
};
