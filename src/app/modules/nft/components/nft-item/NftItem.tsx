import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useInterval } from 'react-use';
import { default as dayjs } from 'dayjs';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import greenClockIcon from '../../../../../assets/images/marketplace/green-clock.svg';
import arrowLeftIcon from '../../../../../assets/images/marketplace/bundles-left-arrow.svg';
import arrowRightIcon from '../../../../../assets/images/marketplace/bundles-right-arrow.svg';

import { INft } from '../../types';
import { AudioLabel, VideoLabel, LikeButton, BundleLabel, StorybookLabel } from './components';
import { ItemWrapper } from '../../../../components';

interface INftItemProps {
  nft: INft;
  isSelected?: boolean;
  selectedLabel?: string;
  onAuctionTimeOut?: () => void;
}

export const NftItem = (
  {
    nft,
    isSelected,
    selectedLabel,
    onAuctionTimeOut
  }: INftItemProps
) => {
  const { auctionExpDate } = nft;

  const [isRunningAuctionTime, toggleIsRunningAuctionTime] = useState(!!auctionExpDate);
  const [formattedAuctionExpTime, setFormattedAuctionExpTime] = useState<string>();

  const avatars = useMemo(() => {
    const avatars = [];

    if (nft.creator) {
      avatars.push({ name: 'Creator', value: nft.creator.displayName, img: nft.creator.profileImageUrl });
    }
    if (nft.collection) {
      avatars.push({ name: 'Collection', value: nft.collection.name, img: nft.collection.coverUrl });
    }
    if (nft.owner) {
      avatars.push({ name: 'Owner', value: nft.owner.displayName, img: nft.owner.profileImageUrl });
    }

    return avatars;
  }, [nft]);

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
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          {avatars.map((avatar, i) => (
            <Tooltip
              key={i}
              hasArrow
              label={`${avatar.name}: ${avatar.value}`}
              placement={'top'}
              variant={'black'}
              fontWeight={700}
            >
              <Avatar
                w={'26px'}
                h={'26px'}
                src={avatar.img}
                name={`${avatar.name}: ${avatar.value}`}
                border={'1px solid white'}
                _notFirst={{
                  marginLeft: '-7px',
                  position: 'relative',
                }}
              />
            </Tooltip>
          ))}
        </Box>
        <Flex fontSize={'12px'}>
          {nft.tokenIds?.length > 1 && (<BundleLabel count={nft.tokenIds.length ?? 0} />)}
          {nft.assets?.length && (<StorybookLabel count={nft.assets.length ?? 0} />)}

          <LikeButton likes={nft.likes} isLiked={nft.isLiked} />
        </Flex>
      </Flex>
      <Box
        position={'relative'}
        my={'16px'}
        borderRadius={'6px'}
        overflow={'hidden'}
        sx={{
          '.swiper-button-prev': {
            bg: 'white',
            borderRadius: '50%',
            opacity: 0.4,
            height: '30px',
            width: '30px',
            mt: '-15px',
            _after: {
              bg: `url(${arrowLeftIcon}) no-repeat center`,
              content: '""',
              fontFamily: 'inherit',
              h: 'inherit',
              w: 'inherit',
            }
          },
          '.swiper-button-next': {
            bg: 'white',
            borderRadius: '50%',
            opacity: 0.4,
            height: '30px',
            width: '30px',
            mt: '-15px',
            _after: {
              bg: `url(${arrowRightIcon}) no-repeat center`,
              content: '""',
              fontFamily: 'inherit',
              h: 'inherit',
              w: 'inherit',
            }
          },
          '.swiper-pagination-bullet': {
            opacity: 0.4,
          },
          '.swiper-pagination-bullet-active': {
            bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
            opacity: 1,
          },
        }}
      >

        {nft.assets ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={formattedAuctionExpTime ? false : {
              dynamicBullets: true,
              clickable: true,
            }}
            loop={true}
          >
            {[nft.thumbnail_url, ...nft.assets].map((asset, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={asset}
                  alt={nft.name}
                  boxSize={'231px'}
                  objectFit={'cover'}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            src={nft.thumbnail_url}
            alt={nft.name}
            boxSize={'231px'}
            objectFit={'cover'}
          />
        )}

        <Flex position={'absolute'} top={'10px'} right={'10px'}>
          {nft.isAudio && (<AudioLabel />)}
          {nft.isVideo && (<VideoLabel />)}
        </Flex>

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

      <Text fontSize={'14px'} fontWeight={700} mb={'10px'}>{nft.name}</Text>
      <Text fontSize={'10px'} fontWeight={600} color={'#00000066'}>{nft.tokenIds?.length ?? 0}/{nft.numberOfEditions}</Text>
    </ItemWrapper>
  );
};
