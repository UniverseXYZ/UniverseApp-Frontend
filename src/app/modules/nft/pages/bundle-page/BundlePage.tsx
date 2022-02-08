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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { uniqBy } from 'lodash';
import ReactReadMoreReadLess from 'react-read-more-read-less';

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
import { BundleMenu, NftItem, NFTPageRelation } from '../../components';
import { LineTabList } from '../../../../components';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { BundlePageProvider, useBundlePage } from './BundlePage.provider';
import { TabNFTs } from './components';
import { IERC721BundleAssetType, INFT } from '../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../helpers';
import { NFTRelationType } from '../../enums';

export const BundlePageContent = () => {
  const router = useHistory();

  const { setDarkMode } = useThemeContext() as any;

  const { owner, NFTs, isLoading, moreFromCollection, order } = useBundlePage();

  const [selectedNFTIdx, setSelectedNFTIdx] = useState(0);

  const handleClickViewCollection = useCallback(() => {
    if (moreFromCollection && moreFromCollection[0].collection) {
      router.push(`/collection/${moreFromCollection[0].collection.address}`);
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
            {isNFTAssetImage(uniqNFTs[selectedNFTIdx].artworkType) &&
              <NFTAssetImage image={uniqNFTs[selectedNFTIdx].thumbnailUrl} maxH={'512px'} maxW={'512px'} />
            }
            {isNFTAssetVideo(uniqNFTs[selectedNFTIdx].artworkType) &&
              <NFTAssetVideo video={uniqNFTs[selectedNFTIdx].thumbnailUrl} maxH={'512px'} maxW={'512px'} />
            }
            {isNFTAssetAudio(uniqNFTs[selectedNFTIdx].artworkType) &&
              <NFTAssetAudio audio={uniqNFTs[selectedNFTIdx].thumbnailUrl} maxH={'512px'} maxW={'512px'} />
            }
          </Box>

          <Box sx={{ display: 'flex', mt: '20px', }}>
            {uniqNFTs.map((NFT, i) => (
              <Box
                key={i}
                data-selected={selectedNFTIdx === i ? true : undefined}
                {...styles2.SliderPreviewImageStyle}
                onClick={() => setSelectedNFTIdx(i)}
              >
                {isNFTAssetImage(NFT.artworkType) && <Image src={NFT.thumbnailUrl} />}
                {isNFTAssetVideo(NFT.artworkType) && <video src={NFT.thumbnailUrl} />}
                {isNFTAssetAudio(NFT.artworkType) && <Image src={AudioNFTPreviewImage} />}
              </Box>
            ))}
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
                <BundleMenu />
              </Box>
            </Flex>

            <Flex>
              <NFTPageRelation
                type={NFTRelationType.CREATOR}
                image={owner.profileImageUrl ?? ''}
                value={owner.displayName ?? ''}
              />
            </Flex>

            <Text mt={'24px'} {...styles.DescriptionStyle}>
              <ReactReadMoreReadLess
                charLimit={150}
                readMoreText="Read more"
                readLessText="Read less"
              >
                {(order.make.assetType as IERC721BundleAssetType).bundleDescription || ''}
              </ReactReadMoreReadLess>
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
                <TabPanel><TabBids /></TabPanel>
                <TabPanel><TabOffers /></TabPanel>
                <TabPanel><TabHistory /></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <NFTBuySection NFTs={NFTs} order={order} />
        </Box>
      </Box>
      {moreFromCollection && (
        <Box {...styles.MoreNFTsWrapperStyle}>
          <Heading {...styles.MoreNFTsTitleStyle}>More from this collection</Heading>
          <Container
            {...styles.MoreNFTsContainerStyle}
            /*TODO: move 1110px to styles*/
            w={moreFromCollection.length < 4 ? `calc(1110px / 4 * ${moreFromCollection.length})` : '100%'}
          >
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: moreFromCollection.length < 4 ? moreFromCollection.length : 4,
              }}
              spacingX={'20px'}
            >
              {moreFromCollection.map((NFT) => (<NftItem key={NFT.id} NFT={NFT} />))}
            </SimpleGrid>
          </Container>
          <Button {...styles.MoreNFTsButtonStyle} onClick={handleClickViewCollection}>View collection</Button>
        </Box>
      )}
    </>
  )
};

export const BundlePage = () => {
  const params = useParams<{ hash: string; }>();

  return (
    <BundlePageProvider hash={params.hash}>
      <BundlePageContent />
    </BundlePageProvider>
  );
}
