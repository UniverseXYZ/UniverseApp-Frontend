import { Box, Button, Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FreeMode, Navigation, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import { ReactComponent as Arrow3Icon } from '@assets/images/arrow-3.svg';
import { ReactComponent as AuctionWinnerSVG } from '@assets/images/auction-winner.svg';

import { Select } from '@app/components';

import * as styles from './Tire.styles';

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
      <Icon viewBox={'0 0 14 16'}>
        <AuctionWinnerSVG />
      </Icon>
      <Heading fontSize={'11px'}>{winner.name}</Heading>
      <Text fontSize={'10px'}>{winner.amountNFTs} NFTs</Text>
    </HStack>
  ), []);

  return (
    <Box {...styles.Wrapper}>
      <Flex justifyContent={'space-between'} mb={'20px'}>
        <HStack fontSize={'14px'}>
          <Heading fontSize={'14px'}>{name}</Heading>
          <Text>Winners: <strong>{winners.length}</strong></Text>
          <Text>Total NFTs: <strong>{totalNFTs}</strong></Text>
        </HStack>

        <Select
          buttonProps={{ minWidth: '200px', }}
          items={winners}
          value={winners[0]}
          renderSelectedItem={renderWinnerItem}
          renderItem={renderWinnerItem}
        />
      </Flex>

      <Box pos={'relative'}>
        <Button ref={prevRef} variant={'simple'} {...styles.SwiperLeftButton}>
          <Icon viewBox={'0 0 6 12'} pos={'relative'}>
            <Arrow3Icon />
          </Icon>
        </Button>

        <Button ref={nextRef} variant={'simple'} {...styles.SwiperRightButton}>
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
          {new Array(15).fill(null).map((NFT, i) => (
            <SwiperSlide key={i} style={{ width: '85px' }}>
              <Box
                {...styles.NFTAsset}
                bg={`url(${assetUrl}) center / cover`}
              >
                <Box {...styles.AmountBadge}>5</Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}
