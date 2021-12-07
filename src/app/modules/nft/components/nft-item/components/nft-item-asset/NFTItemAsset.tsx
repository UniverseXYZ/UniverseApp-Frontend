import { Box, Image, ImageProps, SystemStyleObject } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import arrowLeftIcon from '../../../../../../../assets/images/marketplace/bundles-left-arrow.svg';
import arrowRightIcon from '../../../../../../../assets/images/marketplace/bundles-right-arrow.svg';
import { INft } from '../../../../types';

type IUseStyles = (width?: number | string) => {
  image: ImageProps;
  swiper: SystemStyleObject;
};

const useStyles: IUseStyles = (width: string | number = 231) => {
  const _width = typeof width === 'number' ? `${width}px` : width;

  const _getSwiperArrowStyles = (icon: string) => ({
    bg: 'white',
    borderRadius: '50%',
    opacity: 0.4,
    height: '30px',
    width: '30px',
    mt: '-15px',
    _after: {
      bg: `url(${icon}) no-repeat center`,
      content: '""',
      fontFamily: 'inherit',
      h: 'inherit',
      w: 'inherit',
    },
    _hover: {
      opacity: 0.6,
    },
  });

  const image: ImageProps = useMemo(() => {
    return {
      boxSize: _width,
      objectFit: 'cover',
    }
  }, [_width]);

  const swiper: SystemStyleObject = useMemo(() => ({
    '.swiper-button-prev': _getSwiperArrowStyles(arrowLeftIcon),
    '.swiper-button-next': _getSwiperArrowStyles(arrowRightIcon),
    '.swiper-pagination-bullet': {
      bg: 'white',
      opacity: 0.4,
    },
    '.swiper-pagination-bullet-active': {
      bg: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
      opacity: 1,
    },
  }), []);

  return { image, swiper };
};

interface INFTItemAssetProps {
  nft: INft;
  showSwiper?: boolean;
  showSwiperPagination?: boolean;
}

export const NFTItemAsset = ({ nft, showSwiper = true, showSwiperPagination = true }: INFTItemAssetProps) => {
  const styles = useStyles();
  return (
    showSwiper && nft.assets ? (
      <Box sx={styles.swiper}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={showSwiperPagination && {
            dynamicBullets: true,
            clickable: true,
          }}
          loop={true}
        >
          {[nft.thumbnail_url, ...nft.assets].map((asset, i) => (
            <SwiperSlide key={i}>
              <Image src={asset} alt={nft.name} {...styles.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    ) : (
      <Image src={nft.thumbnail_url} alt={nft.name} {...styles.image} />
    )
  );
};
