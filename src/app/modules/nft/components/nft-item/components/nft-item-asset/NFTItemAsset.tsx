import { Box, Image, ImageProps, SystemStyleObject } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useMeasure } from 'react-use';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import arrowLeftIcon from '../../../../../../../assets/images/marketplace/bundles-left-arrow.svg';
import arrowRightIcon from '../../../../../../../assets/images/marketplace/bundles-right-arrow.svg';
import { INFT } from '../../../../types';

type IUseStyles = (width?: number | string) => {
  image: ImageProps;
  swiper: SystemStyleObject;
};

const useStyles: IUseStyles = (width: string | number = 200) => {
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
  nft: INFT;
  bundleNFTs?: INFT[];
  showSwiperPagination?: boolean;
}

export const NFTItemAsset = ({ nft, bundleNFTs = [], showSwiperPagination = true }: INFTItemAssetProps) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const styles = useStyles(width);

  const showSwiper = useMemo(() => {
    return bundleNFTs?.length;
  }, [nft, bundleNFTs]);

  return (
    showSwiper ? (
      <Box ref={ref} sx={styles.swiper}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={showSwiperPagination && {
            dynamicBullets: true,
            clickable: true,
          }}
          loop={true}
        >
          {[nft, ...bundleNFTs].map((NFT, i) => (
            <SwiperSlide key={i}>
              <Image src={NFT.thumbnailUrl} alt={nft.name} {...styles.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    ) : (
      <Box ref={ref}>
        <Image src={nft.thumbnailUrl} alt={nft.name} {...styles.image} />
      </Box>
    )
  );
};
