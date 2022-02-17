import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
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

import * as styles from '../nft-page/styles';
import * as styles2 from './styles';
import {
  NFTAssetAudio,
  NFTAssetImage,
  NFTAssetVideo,
  NFTBuySection,
  TabBids,
  TabHistory,
  TabOffers,
} from '../nft-page/components';
import { BundleMenu, NftItem, NFTPageRelation, RelationType } from '../../components';
import { LineTabList } from '../../../../components';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { BundlePageProvider, useBundlePage } from './BundlePage.provider';
import { TabNFTs } from './components';
import { INFT, NFTArtworkType } from '../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../helpers';

import AudioNFTPreviewImage from './../../../../../assets/images/v2/audio-nft-preview.png';

export const BundlePageContent = () => {
  const router = useHistory();

  const { setDarkMode } = useThemeContext() as any;

  const { owner, NFTs, isLoading, moreFromCollection } = useBundlePage();

  const [selectedNFTIdx, setSelectedNFTIdx] = useState(0);

  const handleClickViewCollection = useCallback(() => {
    if (moreFromCollection && moreFromCollection[0].collection) {
      router.push(`/collection/${moreFromCollection[0].collection.address}`);
    }
  }, [moreFromCollection]);

  const uniqNFTs = useMemo(() => {
    if (!NFTs) {
      return [];
    }

    return uniqBy(NFTs, (NFT: INFT) => NFT.thumbnailUrl);
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
              <Heading {...styles2.NameStyle}>Bundle long name</Heading>
              <Box>
                <BundleMenu />
              </Box>
            </Flex>

            <Flex>
              <NFTPageRelation type={RelationType.CREATOR} image={owner.profileImageUrl} value={owner.displayName} />
            </Flex>

            <Text {...styles2.DescriptionStyle}>
              Cras vel eget vitae quis scelerisque arcu ut.
              Tristique velit nec sed sit massa. Odio molestie velit purus at blandit.
              Lacus, fusce quam dolor imperdiet velit augue neque tincidunt lorem et diam...
              <Link>Read more</Link>
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
          <NFTBuySection />
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
              {moreFromCollection.map((NFT) => (<NftItem key={NFT.id} nft={NFT} />))}
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
