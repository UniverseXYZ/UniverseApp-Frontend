import { Box, Button, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { useMountedState, useUpdate } from 'react-use';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import arrowLeftIcon from '../../../../../../../../assets/images/marketplace/bundles-left-arrow.svg';
import arrowRightIcon from '../../../../../../../../assets/images/marketplace/bundles-right-arrow.svg';
import BundleWhiteIcon from '../../../../../../../../assets/images/marketplace/v2/bundle-white.svg';

import { Status, Status as PostingPopupStatus } from './compoents/posting-popup/enums';
import { useMarketplaceSellData } from '../../../hooks';
import { Fee, PostingPopup } from './compoents';
import { fees, totalFee } from './constants';
import { SellMethod } from '../../../enums';
import { IFixedListingForm } from '../../../types';
import { TokenTicker } from '../../../../../../../enums';
import { TokenIcon } from '../../../../../../../components';
import {
  isNFTAssetAudio,
  isNFTAssetImage,
  isNFTAssetVideo,
  mapBackendNft,
  mapBackendUser,
} from '../../../../../../nft';
import { NFTAssetAudio, NFTAssetImage, NFTAssetVideo } from '../../../../../../nft/pages/nft-page/components';
import * as styles from './styles';
import { INFT, INFTBackend } from '../../../../../../nft/types';
import { useMyNftsContext } from '../../../../../../../../contexts/MyNFTsContext';
import { useAuthContext } from '../../../../../../../../contexts/AuthContext';

export const SummaryTab = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { myNFTs } = useMyNftsContext() as any;
  const { loggedInArtist } = useAuthContext();

  const [activeIndex, setActiveIndex] = useState(0);

  const { nft, isPosted, form, sellMethod, amountType, goBack } = useMarketplaceSellData();

  const update = useUpdate();

  const isMounted = useMountedState();

  const [postingPopupStatus, setPostingPopupStatus] = useState<PostingPopupStatus>(PostingPopupStatus.HIDDEN);

  const handleSave = useCallback(() => {
    setPostingPopupStatus(PostingPopupStatus.PROCESSING)
    form.submitForm();
  }, [nft]);

  const [price, ticker] = useMemo<[number, TokenTicker]>(() => {
    switch (sellMethod) {
      case SellMethod.FIXED: return [
        +(form.values as IFixedListingForm).price,
        (form.values as IFixedListingForm).priceCurrency as TokenTicker, // TODO: remove as
      ];
    }
    return [0, TokenTicker.ETH];
  }, [form.values]);

  const totalPrice = useMemo(() => {
    return parseFloat((price - (price * totalFee / 100)).toFixed(5));
  }, [form.values, price]);

  const NFTsForPreview = useMemo<INFT[]>(() => {
    const selectedIds = [`${nft.id}`, ...form.values.bundleSelectedNFTs.map((key) => key.split(':')[0])];

    return selectedIds.reduce<INFT[]>((acc, id) => {
      const _myNFT = (myNFTs as INFTBackend[]).find((_myNFT) => `${_myNFT.id}` === id);

      if (_myNFT) {
        const myNFT = mapBackendNft(_myNFT);
        myNFT.owner = mapBackendUser(loggedInArtist);
        acc.push(myNFT);
      }

      return acc;
    }, []);
  }, [myNFTs, nft, form.values]);

  useEffect(() => {
    if (isPosted) {
      setPostingPopupStatus(Status.SUCCESS);
    }
  }, [isPosted]);

  useEffect(() => {
    update();
  }, [])

  return (
    <>
      <Flex {...styles.MainContainerStyle}>
        <Box {...styles.ImageContainerStyle}>
          {amountType === 'single' && (
            <>
              {isNFTAssetImage(nft.artworkType) &&
                <NFTAssetImage
                  image={nft.originalUrl}
                  h={'var(--image-size)'}
                  w={'var(--image-size)'}
                  allowFullscreen={false}
                />
              }
              {isNFTAssetVideo(nft.artworkType) &&
                <NFTAssetVideo
                  video={nft.originalUrl}
                  h={'var(--image-size)'}
                  w={'var(--image-size)'}
                />
              }
              {isNFTAssetAudio(nft.artworkType) &&
                <NFTAssetAudio
                  audio={nft.originalUrl}
                  h={'var(--image-size)'}
                  w={'var(--image-size)'}
                  allowFullscreen={false}
                />
              }
            </>
          )}

          {/*TODO: refactor styles*/}
          {amountType === 'bundle' && (
            <Box w={'var(--image-size)'} sx={{
              pos: 'relative',
              '[data-swiper-button]': {
                background: 'white',
                border: 0,
                borderRadius: '50%',
                height: '30px',
                minW: 'auto',
                padding: 0,
                position: 'absolute',
                top: 'calc(50% - 15px)',
                width: '30px',
                zIndex: 10,

                _disabled: {
                  display: 'none',
                },
                _before: {
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: 'inherit',
                  position: 'absolute',
                  content: '" "',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  zIndex: -1,
                },
                _hover: {
                  _before: {
                    backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
                    backgroundOrigin: 'border-box',
                    borderColor: 'transparent',
                    boxShadow: 'inset 2px 1000px 1px white',
                  },
                },
                _focus: {
                  boxShadow: 'none',
                  _before: {
                    backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
                    backgroundOrigin: 'border-box',
                    borderColor: 'transparent',
                    boxShadow: 'inset 2px 1000px 1px white',
                  },
                },
              }
            }}>
              <Box sx={{
                bg: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                backdropFilter: 'blur(4px)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                pos: 'absolute',
                padding: '7px 14px',
                top: '15px',
                left: '15px',
                zIndex: 3,
              }}>
                <Image src={BundleWhiteIcon} w={'20px'} display={'inline-block'} mr={'6px'} mt={'-3px'} />
                {activeIndex + 1} of {NFTsForPreview.length}
              </Box>
              <Button ref={prevRef} variant={'simpleOutline'} data-swiper-button left={'15px'}>
                <Image src={arrowLeftIcon} width={'9px'} />
              </Button>
              <Button ref={nextRef} variant={'simpleOutline'} data-swiper-button right={'15px'}>
                <Image src={arrowRightIcon} width={'9px'} />
              </Button>
              {prevRef?.current && nextRef?.current && (
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  loop={true}
                  onRealIndexChange={(s) => setActiveIndex(s.realIndex)}
                >
                  {NFTsForPreview.map((_NFT, i) => (
                    <SwiperSlide key={i}>
                      {isNFTAssetImage(_NFT.artworkType) &&
                        <NFTAssetImage
                          image={_NFT.originalUrl}
                          h={'var(--image-size)'}
                          w={'var(--image-size)'}
                          allowFullscreen={false}
                        />
                      }
                      {isNFTAssetVideo(_NFT.artworkType) &&
                        <NFTAssetVideo
                          video={_NFT.originalUrl}
                          h={'var(--image-size)'}
                          w={'var(--image-size)'}
                        />
                      }
                      {isNFTAssetAudio(_NFT.artworkType) &&
                        <NFTAssetAudio
                          audio={_NFT.originalUrl}
                          h={'var(--image-size)'}
                          w={'var(--image-size)'}
                          allowFullscreen={false}
                        />
                      }
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </Box>
          )}
        </Box>
        <Flex {...styles.TextContainerStyle}>
          <Center flexDir={'column'} alignItems={'flex-start'} w={'100%'}>
            <Heading as={'h4'}>Listing</Heading>
            <Text mb={'30px'}>
              Your bundle will be listed for
              <TokenIcon ticker={ticker} size={20} />
              <strong>{price}</strong>
            </Text>

            <Heading as={'h4'}>Fees</Heading>
            <Text mb={'20px'} color={'#00000066'}>
              Listing is free! At the time of the sale, the following fees will be deducted.
            </Text>

            <Box layerStyle={'grey'} {...styles.FeesContainerStyle}>
              <Fee name={'To Universe'} amount={fees.universe} />
              <Fee name={'To creator'} amount={fees.creator} />
              <Fee name={'Total'} amount={totalFee} />
            </Box>

            <Heading as={'h4'} mb={'0 !important'}>
              You will receive:
              <TokenIcon ticker={ticker} size={24} />
              {totalPrice}
            </Heading>
          </Center>
        </Flex>
      </Flex>
      <Box textAlign={'right'} mb={'50px'}>
        <Button mr={'10px'} variant={'outline'} onClick={goBack}>Back</Button>
        <Button boxShadow={'xl'} onClick={handleSave}>Post your listing</Button>
      </Box>
      <PostingPopup
        status={postingPopupStatus}
        onClose={() => setPostingPopupStatus(PostingPopupStatus.HIDDEN)}
      />
    </>
  );
};
