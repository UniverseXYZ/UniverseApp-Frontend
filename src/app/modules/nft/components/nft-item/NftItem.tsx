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

import { INft } from '../../types';

import greenClockIcon from '../../../../../assets/images/marketplace/green-clock.svg';
import { AudioLabel, VideoLabel, LikeButton, BundleLabel, StorybookLabel } from './components';

// ######################################################################

// ######################################################################

interface INftItemProps {
  nft: INft;
  onAuctionTimeOut?: () => void;
}

export const NftItem = ({ nft, onAuctionTimeOut }: INftItemProps) => {
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
    <Box
      bg={'white'}
      border={'1px solid rgba(0, 0, 0, 0.1)'}
      borderRadius={'12px'}
      cursor={'pointer'}
      position={'relative'}
      p={'12px'}
      _hover={{
        borderColor: 'transparent',
        boxShadow: `0px 0px 30px rgba(0, 0, 0, ${nft.tokenIds.length > 1 ? 0.1 : 0.2})`,
        '[data-shadow]': {
          _before: {
            boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
            borderColor: 'transparent',
          },
          _after: {
            boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
            borderColor: 'transparent',
          }
        },
      }}
    >
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

      <Box position={'relative'}>
        <Image
          src={nft.thumbnail_url}
          alt={nft.name}
          borderRadius={'6px'}
          boxSize={'231px'}
          objectFit={'cover'}
          my={'16px'}
        />

        <Flex position={'absolute'} top={'10px'} right={'10px'}>
          {nft.isAudio && (<AudioLabel />)}
          {nft.isVideo && (<VideoLabel />)}
        </Flex>

        {formattedAuctionExpTime && (
          <Flex position={'absolute'} bottom={'10px'} justifyContent={'center'} w={'100%'}>
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
      {nft.tokenIds.length > 1 && (
        <Box
          data-shadow
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'white',
            borderRadius: 'inherit',
            zIndex: -1,
            _before: {
              position: 'absolute',
              display: 'block',
              content: '" "',
              top: '4px',
              left: '1%',
              width: '98%',
              height: '100%',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: 'inherit',
              background: 'white',
              zIndex: -1,
            },
            _after: {
              position: 'absolute',
              display: 'block',
              content: '" "',
              top: '7px',
              left: '3%',
              width: '94%',
              height: '100%',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: 'inherit',
              background: 'white',
              zIndex: -2,
            },
            _hover: {
              _before: {
                borderColor: 'none',
              },
            },
          }}
        />
      )}
    </Box>
  );
};
