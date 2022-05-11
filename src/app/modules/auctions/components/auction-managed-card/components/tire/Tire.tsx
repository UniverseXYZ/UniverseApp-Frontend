import { Box, Button, Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

import { ReactComponent as Arrow3Icon } from '@assets/images/arrow-3.svg';

import * as styles from './Tire.styles';
import { FreeMode, Navigation, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { SORT_BY_ACTIVE_AUCTIONS } from '@app/modules/auctions/constants';
import { Select } from '@app/components';

interface ITireProps {
  name: string;
}

export const Tire = (props: ITireProps) => {
  const {
    name,
  } = props;

  const assetUrl = 'https://universe-prod-datascraper-images.s3.amazonaws.com/0x16de9D750F4AC24226154C40980Ef83d4D3fD4AD/4231/image.png';

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [swiper, setSwiper] = useState<SwiperClass>();

  return (
    <Box {...styles.Wrapper}>
      <Flex justifyContent={'space-between'} mb={'20px'}>
        <HStack fontSize={'14px'}>
          <Heading fontSize={'14px'}>{name}</Heading>
          <Text>Winners: <strong>5</strong></Text>
          <Text>Total NFTs: <strong>26</strong></Text>
        </HStack>

        <Select
          buttonProps={{ minWidth: '200px', }}
          items={SORT_BY_ACTIVE_AUCTIONS}
          value={SORT_BY_ACTIVE_AUCTIONS[0]}
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
