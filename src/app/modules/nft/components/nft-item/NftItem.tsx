import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonProps,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  FlexProps,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip, ImageProps,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useInterval } from 'react-use';
import { default as dayjs } from 'dayjs';

import { INft } from '../../types';

import heart from '../../../../../assets/images/marketplace/heart.svg';
import heartHover from '../../../../../assets/images/marketplace/heart-hover.svg';
import heartFilled from '../../../../../assets/images/marketplace/heart-filled.svg';
import audioIcon from '../../../../../assets/images/marketplace/audio-icon.svg';
import videoIcon from '../../../../../assets/images/marketplace/video-icon.svg';
import greenClockIcon from '../../../../../assets/images/marketplace/green-clock.svg';
import bundleIcon from '../../../../../assets/images/marketplace/bundle.svg';
import storybookIcon from '../../../../../assets/images/marketplace/storybook.svg';

interface IMediaIconProps extends FlexProps {
  icon: any;
}

const MediaIcon = ({ icon, ...rest }: IMediaIconProps) => (
  <Flex
    bg={'rgba(0, 0, 0, 0.1)'}
    borderRadius={'4px'}
    ml={'4px'}
    p={'5px'}
    h={'20px'}
    w={'20px'}
    {...rest}
  >
    <Image src={icon} />
  </Flex>
);

// ######################################################################

interface ILikeButtonProps extends ButtonProps, Pick<INft, 'likes' | 'isLiked'> {
  onToggle?: (isLiked: boolean) => void;
}

const LikeButton = ({ isLiked, likes, onToggle, sx = {}, ...rest }: ILikeButtonProps) => {
  return (
    <Popover trigger={'hover'} placement={'top'} variant={'tooltip'}>
      <PopoverTrigger>
        <Button
          leftIcon={
            <>
              <Image src={isLiked ? heartFilled : heart} w={'14px'} display={'inline'} />
              <Image src={isLiked ? heartFilled : heartHover} w={'14px'} display={'none'} />
            </>
          }
          size={'sm'}
          variant='simpleOutline'
          sx={{
            '--hover-color': '#FF4949',
            color: isLiked ? 'var(--hover-color)' : 'rgba(0, 0, 0, 0.4)',
            fontSize: '12px',
            _hover: {
              color: 'var(--hover-color)',
              '.chakra-button__icon:first-of-type img': {
                '&:nth-of-type(1)': { display: 'none', },
                '&:nth-of-type(2)': { display: 'inline', }
              }
            },
            ...sx,
          }}
          {...rest}
          onClick={() => onToggle && onToggle(!isLiked)}
        >
          {likes.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent width={'fit-content'}>
        <PopoverArrow />
        <PopoverBody>
          <Text fontWeight={700} mb={'6px'}>{likes.length} people liked this</Text>
          <AvatarGroup size='md' spacing={'-6px'}>
            {likes.slice(0, 6).map((avatar, i) => (
              <Avatar key={i} src={avatar} w={'26px'} h={'26px'} />
            ))}
          </AvatarGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

// ######################################################################

interface ITypeIconProps {
  label: string;
  icon: any;
  iconProps?: ImageProps;
}

const TypeIcon = ({ label, icon, iconProps = {} }: ITypeIconProps) => {
  return (
    <Tooltip hasArrow label={label} placement={'top'} variant={'black'} fontWeight={'700'}>
      <Box
        border={'1px solid rgba(0, 0, 0, 0.1)'}
        borderRadius={'8px'}
        display={'inline-flex'}
        p={'5px 6px'}
        mr={'6px'}
        minW={'32px'}
      >
        <Image src={icon} alt={label} {...iconProps} />
      </Box>
    </Tooltip>
  );
}

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
            <Tooltip key={i} hasArrow label={`${avatar.name}: ${avatar.value}`} placement={'top'} variant={'black'}>
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
          {nft.tokenIds?.length > 1 && (
            <TypeIcon
              icon={bundleIcon}
              label={`Bundle: ${nft.tokenIds.length} NFTs`}
              iconProps={{ opacity: 0.4 }}
            />
          )}
          {nft.isStorybook && (
            <TypeIcon
              icon={storybookIcon}
              label={`Storybook: ${nft.assets?.length ?? 0} assets`}
            />
          )}
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
          {nft.isAudio && (<MediaIcon icon={audioIcon} />)}
          {nft.isVideo && (<MediaIcon icon={videoIcon} />)}
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
