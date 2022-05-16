import { Box, Button, Heading, HStack, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FreeMode, Navigation, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import { ReactComponent as Arrow3Icon } from '@assets/images/arrow-3.svg';
import AuctionWinnerIcon from '@assets/images/auction-winner.svg';

import { Select } from '@app/components';

import * as s from './Tire.styles';

interface ITireProps {
  name: string;
  winners: number;
}

export const Tire = (props: ITireProps) => {
  const {
    name,
    winners: initialWinnersAmount,
  } = props;

  const assetUrl = 'https://universe-prod-datascraper-images.s3.amazonaws.com/0x16de9D750F4AC24226154C40980Ef83d4D3fD4AD/4231/image.png';

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [swiper, setSwiper] = useState<SwiperClass>();

  const [NFTs] = useState(new Array(5).fill(null));
  const [winners] = useState(new Array(initialWinnersAmount).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Winner #${i + 1}`,
    amountNFTs: (i + 1) * 3,
  })));

  const totalNFTs = useMemo(() => {
    return winners.reduce((total, winner) => total + winner.amountNFTs, 0);
  }, [winners]);

  const renderWinnerItem = useCallback((winner) => (
    <HStack spacing={'10px'}>
      <Image src={AuctionWinnerIcon} alt={'Winner icon'} />
      <Heading fontSize={'11px'}>{winner.name}</Heading>
      <Text fontSize={'10px'}>{winner.amountNFTs} NFTs</Text>
    </HStack>
  ), []);

  return (
    <Box {...s.Wrapper}>
      <Stack {...s.TitleWrapper}>
        <Heading fontSize={'14px'}>{name}</Heading>
        <HStack spacing={'20px'} fontSize={'14px'} flex={1}>
          <Text>Winners: <strong>{winners.length}</strong></Text>
          <Text>Total NFTs: <strong>{totalNFTs}</strong></Text>
        </HStack>

        <Select
          buttonProps={s.WinnerSelectorButton}
          items={winners}
          value={winners[0]}
          renderSelectedItem={renderWinnerItem}
          renderItem={renderWinnerItem}
        />
      </Stack>

      <Box pos={'relative'}>
        <Button ref={prevRef} variant={'simple'} {...s.SwiperLeftButton}>
          <Icon viewBox={'0 0 6 12'} pos={'relative'}>
            <Arrow3Icon />
          </Icon>
        </Button>

        <Button ref={nextRef} variant={'simple'} {...s.SwiperRightButton}>
          <Icon viewBox={'0 0 6 12'} transform={'rotate(180deg)'}>
            <Arrow3Icon />
          </Icon>
        </Button>

        <Swiper
          modules={[Controller, Navigation, FreeMode]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loop={false}
          freeMode={true}
          slidesPerView={'auto'}
          spaceBetween={14}
          controller={{ control: swiper }}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {NFTs.map((NFT, i) => (
            <SwiperSlide key={i} style={{ width: '85px' }}>
              <Box {...s.NFTAsset} bg={`url(${assetUrl}) center / cover`}>
                <Box {...s.AmountBadge}>5</Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}
