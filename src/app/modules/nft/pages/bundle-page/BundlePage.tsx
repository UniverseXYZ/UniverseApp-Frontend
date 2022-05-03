import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { uniqBy } from 'lodash';
import ReadMoreAndLess from 'react-read-more-less';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useRouter } from 'next/router';

// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';

import AudioNFTPreviewImage from './../../../../../assets/images/v2/audio-nft-preview.png';

import * as styles from '../nft-page/styles';
import * as styles2 from './styles';
import {
  NFTAssetAudio,
  NFTAssetImage,
  NFTAssetVideo,
  NFTBuySection,
  // TabBids,
  // TabHistory,
  // TabOffers,
} from '../nft-page/components';
import { TabBids, TabHistory, TabOffers } from '../nft-page/components/nft-info/components';
import { BundleMenu, NftItem, NFTPageCreatorRelation, NFTPageRelation } from '../../components';
import { LineTabList } from '../../../../components';
import { BundlePageProvider, useBundlePage } from './BundlePage.provider';
import { TabNFTs } from './components';
import { IERC721BundleAssetType, INFT, IOrder } from '../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../helpers';
import { NFTRelationType } from '../../enums';
import { SwiperArrowButton } from '../../../../components/swiper-arrow-button';
import { NFTAcceptOfferPopup } from '../nft-page/components/nft-info/components/tab-offers/components';
import { useThemeStore } from 'src/stores/themeStore';

export const BundlePageContent = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const router = useRouter();

  const setDarkMode = useThemeStore(s => s.setDarkMode);

  const { creator, NFTs, isLoading, moreFromCollection, order } = useBundlePage();

  const [selectedNFTIdx, setSelectedNFTIdx] = useState(0);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [offerForAccept, setOfferForAccept] = useState<IOrder | null>(null);

  const handleClickViewCollection = useCallback(() => {
    if (moreFromCollection && moreFromCollection[0]._collectionAddress) {
      router.push(`/collection/${moreFromCollection[0]._collectionAddress}`);
    }
  }, [moreFromCollection]);

  const uniqNFTs = useMemo(() => {
    return NFTs ? uniqBy(NFTs, (NFT: INFT) => NFT.thumbnailUrl) : [];
  }, [NFTs]);

  useEffect(() => setDarkMode(false), []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Box>
        <Box {...styles.NFTAssetContainerStyle} flexDir={'column'} alignItems={'center'}>
          <Box>
            {
            isNFTAssetVideo(uniqNFTs[selectedNFTIdx].artworkTypes) &&
              <NFTAssetVideo video={uniqNFTs[selectedNFTIdx].thumbnailUrl} maxH={'512px'} maxW={'512px'} />
            ||
            isNFTAssetImage(uniqNFTs[selectedNFTIdx].artworkTypes) &&
              <NFTAssetImage
                image={uniqNFTs[selectedNFTIdx].thumbnailUrl}
                alt={uniqNFTs[selectedNFTIdx]?.name ?? ''}
                containerProps={{ maxW: '512px', maxH: '512px', }}
              />
            ||
            isNFTAssetAudio(uniqNFTs[selectedNFTIdx].artworkTypes) &&
              <NFTAssetAudio audio={uniqNFTs[selectedNFTIdx].thumbnailUrl} maxH={'512px'} maxW={'512px'} />
            }
          </Box>

          <Box
            sx={{
              display: 'flex',
              mt: '20px',
              pos: 'relative',
              '.swiper-slide > div': {
                mx: '6px',
              },
          }}
            w={uniqNFTs.length > 6 ? `${470}px` : `${470 / 6 * uniqNFTs.length}px`}
          >
            <Box display={uniqNFTs.length > 6 ? 'block' : 'none'}>
              <SwiperArrowButton ref={prevRef} dir={'left'} left={'-9px'} />
              <SwiperArrowButton ref={nextRef} dir={'right'} right={'-9px'} />
            </Box>
            {prevRef?.current && nextRef?.current && (
              <Swiper
                modules={[Navigation]}
                navigation={uniqNFTs.length > 6 && {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                loop={uniqNFTs.length > 6}
                slidesPerView={uniqNFTs.length > 6 ? 6 : uniqNFTs.length}
              >
                {uniqNFTs.map((NFT, i) => (
                  <SwiperSlide key={i}>
                    <Box
                      data-selected={selectedNFTIdx === i ? true : undefined}
                      {...styles2.SliderPreviewImageStyle}
                      w={'70px'}
                      onClick={() => setSelectedNFTIdx(i)}
                    >
                      {isNFTAssetImage(NFT.artworkTypes) && <Image src={NFT.thumbnailUrl} />}
                      {isNFTAssetVideo(NFT.artworkTypes) && <video src={NFT.thumbnailUrl} />}
                      {isNFTAssetAudio(NFT.artworkTypes) && <Image src={AudioNFTPreviewImage} />}
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Box>
        </Box>
        <Box {...styles.NFTDetailsContainerStyle}>
          <Box sx={{ p: '60px 40px', }}>
            <Flex sx={{
              alignItems: 'center',
              mb: '12px',
              justifyContent: 'space-between'
            }}>
              <Heading {...styles2.NameStyle}>{(order.make.assetType as IERC721BundleAssetType).bundleName}</Heading>
              <Box>
                <BundleMenu collectionAddress={uniqNFTs[selectedNFTIdx]._collectionAddress} tokenId={uniqNFTs[selectedNFTIdx].tokenId}/>
              </Box>
            </Flex>

            <Flex>
              <NFTPageCreatorRelation creator={creator} />
            </Flex>

            <Text mt={'24px'} {...styles.DescriptionStyle}>
              <ReadMoreAndLess
                charLimit={150}
                readMoreText="Read more"
                readLessText="Read less"
              >
                {(order.make.assetType as IERC721BundleAssetType).bundleDescription || ''}
              </ReadMoreAndLess>
            </Text>

            <Tabs>
              <LineTabList>
                <Tab>NFTs</Tab>
                <Tab>Bids</Tab>
                <Tab>Offers</Tab>
                <Tab>History</Tab>
              </LineTabList>

              <TabPanels sx={{ '> div' : { px: 0, pb: 0 }}}>
                <TabPanel><TabNFTs NFTs={NFTs} /></TabPanel>
                {/* <TabPanel><TabBids /></TabPanel> */}
                <TabPanel><TabOffers setOfferForAccept={setOfferForAccept} setShowOfferPopup={setShowOfferPopup} /></TabPanel>
                <TabPanel><TabHistory /></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <NFTBuySection NFTs={NFTs} order={order} />
        </Box>
      </Box>
      {showOfferPopup && (
        <NFTAcceptOfferPopup
          NFT={NFTs[0]}
          order={offerForAccept || {} as IOrder}
          isOpen={showOfferPopup}
          onClose={() => setShowOfferPopup(false)}
        />
      )}

      {moreFromCollection && (
        <Box {...styles.MoreNFTsWrapperStyle}>
          <Heading {...styles.MoreNFTsTitleStyle}>More from this collection</Heading>
          <Container
            {...styles.MoreNFTsContainerStyle}
          >
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: moreFromCollection.length < 4 ? moreFromCollection.length : 4,
              }}
              spacing={'20px'}
            >
              {moreFromCollection.map((NFT) => (<NftItem key={NFT.id} NFT={NFT} collection={`${NFT._collectionAddress}`} />))}
            </SimpleGrid>
          </Container>
          <Button {...styles.MoreNFTsButtonStyle} onClick={handleClickViewCollection}>View collection</Button>
        </Box>
      )}
    </>
  )
};

export const BundlePage = () => {
  const router = useRouter();

  const { hash } = router.query as { hash: string; };

  return (
    <BundlePageProvider hash={hash}>
      <BundlePageContent />
    </BundlePageProvider>
  );
}
