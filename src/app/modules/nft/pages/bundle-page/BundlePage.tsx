import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HeadingProps,
  Link,
  SimpleGrid,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  TextProps,
} from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as styles from '../nft-page/styles';
import { NFTAssetAudio, NFTBuySection, TabBids, TabHistory, TabOffers } from '../nft-page/components';
import { BundleMenu, NftItem, NFTPageRelation, RelationType } from '../../components';
import { LineTabList } from '../../../../components';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { BundlePageProvider, useBundlePage } from './BundlePage.provider';
import { TabNFTs } from './components';

const NameStyle: HeadingProps = {
  as: 'h2',
  fontSize: '26px',
};

const DescriptionStyle: TextProps = {
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '14px',
  mb: '40px',
  mt: '24px',

  sx: {
    a: {
      color: 'black',
      fontWeight: 'bold',
      ml: '6px',
    },
  }
}

export const BundlePageContent = () => {
  const router = useHistory();

  const { setDarkMode } = useThemeContext() as any;

  const { owner, NFTs, isLoading, moreFromCollection } = useBundlePage();

  const handleClickViewCollection = useCallback(() => {
    if (moreFromCollection && moreFromCollection[0].collection) {
      router.push(`/collection/${moreFromCollection[0].collection.address}`);
    }
  }, [moreFromCollection]);

  useEffect(() => setDarkMode(false), []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Box>
        <Box {...styles.NFTAssetContainerStyle}>
          {/*<NFTAssetImage />*/}
          <NFTAssetAudio />
        </Box>
        <Box {...styles.NFTDetailsContainerStyle}>
          <Box sx={{ p: '60px 40px', }}>
            <Flex sx={{
              alignItems: 'center',
              mb: '12px',
              justifyContent: 'space-between'
            }}>
              <Heading {...NameStyle}>Bundle long name</Heading>
              <Box>
                <BundleMenu />
              </Box>
            </Flex>

            <Flex>
              <NFTPageRelation type={RelationType.CREATOR} image={owner.profileImageUrl} value={owner.displayName} />
            </Flex>

            <Text {...DescriptionStyle}>
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
          <Container {...styles.MoreNFTsContainerStyle}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacingX={'20px'}>
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
