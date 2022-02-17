import {
  Box, BoxProps,
  Flex,
  Image,
  Text, TextProps,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useInterval } from 'react-use';
import { default as dayjs } from 'dayjs';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import greenClockIcon from '../../../../../assets/images/marketplace/green-clock.svg';

import { INft } from '../../types';
import { NFTItemAssetAudioLabel, NFTItemAssetVideoLabel, NFTItemHeader, NFTItemAsset } from './components';
import { ItemWrapper } from '../../../../components';

interface IStyles {
  assetContainer: BoxProps;
  assetLabelContainer: BoxProps;
  nftName: TextProps;
  addition: TextProps;
}

const styles: IStyles = {
  assetContainer: {
    borderRadius: '6px',
    my: '16px',
    overflow: 'hidden',
    position: 'relative',
  },
  assetLabelContainer: {
    display: 'flex',
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
  },
  nftName: {
    fontSize: '14px',
    fontWeight: 700,
    mb: '10px',
  },
  addition: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#00000066',
  },
};

interface INftItemProps {
  nft: INft;
  isSelected?: boolean;
  selectedLabel?: string;
  onAuctionTimeOut?: () => void;

  showAuctionTimer?: boolean;
  assetLabel?: React.ReactNode;
  assetLabelContainerProps?: BoxProps;
}

export const NftItem = (
  {
    nft,
    isSelected,
    selectedLabel,
    onAuctionTimeOut,
    assetLabel,
    assetLabelContainerProps,
  }: INftItemProps
) => {
  const { auctionExpDate } = nft;

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
    <ItemWrapper isBundle={nft.tokenIds.length > 1} isSelected={isSelected} selectedLabel={selectedLabel}>

      <NFTItemHeader nft={nft} />

      <Box {...styles.assetContainer}>

        <NFTItemAsset nft={nft} showSwiperPagination={!formattedAuctionExpTime} />

        <Box {...styles.assetLabelContainer} {...assetLabelContainerProps}>
          {assetLabel ? assetLabel : (
            <>
              {nft.isAudio && (<NFTItemAssetAudioLabel />)}
              {nft.isVideo && (<NFTItemAssetVideoLabel />)}
            </>
          )}
        </Box>

        {formattedAuctionExpTime && (
          <Flex position={'absolute'} bottom={'10px'} justifyContent={'center'} w={'100%'} zIndex={1}>
            <Box sx={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              borderRadius: '12px',
              color: 'white',
              padding: '6px 16px',

            }}>
              <Text
                fontSize={'12px'}
                fontWeight={'700'}
                sx={{
                  background: '-webkit-linear-gradient(#BCEB00, #00EAEA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <Image src={greenClockIcon} display={'inline'} mr={'6px'} />
                {formattedAuctionExpTime} left
              </Text>
            </Box>
          </Flex>
        )}
      </Box>

      <Text {...styles.nftName}>{nft.name}</Text>
      <Text {...styles.addition}>{nft.tokenIds?.length ?? 0}/{nft.numberOfEditions}</Text>
    </ItemWrapper>
  );
};
