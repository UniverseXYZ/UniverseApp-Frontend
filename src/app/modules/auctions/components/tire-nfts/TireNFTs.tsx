import { Box, Button, Icon } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, FreeMode, Navigation } from 'swiper';

import { ReactComponent as Arrow3Icon } from '@assets/images/arrow-3.svg';

import * as s from './TireNFTs.styles';

interface ITireNFTsProps {
  NFTs: number;
}

export const TireNFTs = (props: ITireNFTsProps) => {
  const { NFTs: NFTsAmount } = props;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [NFTs, setNFTs] = useState<null[]>([]);

  const [swiper, setSwiper] = useState<SwiperClass>();

  const assetUrl = 'https://universe-prod-datascraper-images.s3.amazonaws.com/0x16de9D750F4AC24226154C40980Ef83d4D3fD4AD/4231/image.png';

  useEffect(() => {
    setNFTs(new Array(NFTsAmount).fill(null));
  }, [NFTsAmount]);

  return (
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
        {NFTs.map((_, i) => (
          <SwiperSlide key={i} style={{ width: '85px' }}>
            <Box {...s.NFTAsset} bg={`url(${assetUrl}) center / cover`}>
              <Box {...s.AmountBadge}>5</Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
