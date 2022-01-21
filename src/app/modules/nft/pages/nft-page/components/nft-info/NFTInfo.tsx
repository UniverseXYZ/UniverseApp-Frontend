import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
// @ts-ignore
import ReactReadMoreReadLess from 'react-read-more-read-less';

import { Tabs as NFTTabs } from './constants';
import { Bindings } from '../../mocks';
import { LineTabList } from '../../../../../../components';
import * as styles from '../../styles';

import { NFTAssetImage, NFTAssetAudio, NFTBuySection } from '../';
import {
  CollectionPageLoader
} from "../../../../../../../containers/collection/CollectionPageLoader";
import {useNFTPageData} from "../../NFTPage.context";
import NotFound from "../../../../../../../components/notFound/NotFound";
import React, { useMemo } from 'react';

enum NFTAssetType {
  IMAGE,
  AUDIO,
  VIDEO,
  BUNDLE,
  STORY_BOOK,
}

// TODO: hide metadata tab for not Polymorph NFT type
export const NFTInfo = () => {
  const { NFT, isLoading } = useNFTPageData();

  console.log('NFT', NFT);

  const assetType = useMemo<NFTAssetType | null>(() => {
    // TODO: Find out the audio format
    const { nft } = NFT;

    switch (true) {
      case NFT.nft.artworkType.endsWith('png'): return NFTAssetType.IMAGE;
      case NFT.nft.artworkType.endsWith('audio/mpeg'): return NFTAssetType.AUDIO;
    }

    return null;
  }, [NFT]);

  return (
    <>
      {isLoading
      ? (
          <div className="loader-wrapper">
            <CollectionPageLoader />
          </div>
        )
      : NFT ? (
          <Box>
            <Box {...styles.NFTAssetContainerStyle}>
              {/*TODO: ✅ image / ✅ audio / ☑️ video / ☑️ bundle / ☑️ storybook */}
              {assetType === NFTAssetType.IMAGE && (<NFTAssetImage src={NFT.nft.original_url} />)}
              {assetType === NFTAssetType.AUDIO && (<NFTAssetAudio />)}
            </Box>
            <Box {...styles.NFTDetailsContainerStyle}>
              <Box sx={{ p: '60px 40px', }}>
                <Flex sx={{
                  alignItems: 'center',
                  mb: '12px',
                  justifyContent: 'space-between'
                }}>
                  <Heading as={'h2'} sx={{ fontSize: '26px', }}>{NFT.nft.name}</Heading>
                  {/*<Box>*/}
                  {/*  <NFTLike*/}
                  {/*    likes={NFT.likes}*/}
                  {/*    isLiked={false}*/}
                  {/*    sx={{*/}
                  {/*      padding: '15px 17px',*/}
                  {/*      height: '42px',*/}
                  {/*      borderRadius: '12px',*/}
                  {/*      mr: '7px',*/}
                  {/*    }}*/}
                  {/*    onOpen={() => setIsLikesPopupOpened(true)}*/}
                  {/*  />*/}

                  {/*  <NFTMenu />*/}
                  {/*</Box>*/}
                </Flex>

                <Text
                  sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '30px',
                  }}
                >
                  Edition&nbsp;
                  {`${NFT.tokenIds ? NFT.tokenIds.length : 1}/${
                    NFT.numberOfEditions
                      ? NFT.numberOfEditions
                      : NFT.tokenIds
                        ? NFT.tokenIds.length
                        : 1
                  }`}
                </Text>

                <Flex mb={'24px'}>
                  {Bindings.map((binding, i) => (
                    <Link to={binding.getLink(NFT)}>
                      <Flex key={i} sx={{
                        alignItems: 'center',
                        flex: 1,
                      }}>
                        {binding.getImage(NFT)}
                        <Box fontSize={'12px'} ml={'10px'} w={'110px'}>
                          <Text color={'rgba(0, 0, 0, 0.4)'} fontWeight={500}>{binding.name}</Text>
                          <Text isTruncated fontWeight={700}>{binding.getValue(NFT)}</Text>
                        </Box>
                      </Flex>
                    </Link>
                  ))}
                </Flex>

                <Text sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '14px',
                  mb: '40px',

                  a: {
                    color: 'black',
                    fontWeight: 'bold',
                    ml: '6px',
                  },
                }}>
                  <ReactReadMoreReadLess
                    charLimit={150}
                    readMoreText="Read more"
                    readLessText="Read less"
                  >
                    {NFT.nft.description || ''}
                  </ReactReadMoreReadLess>
                </Text>

                <Tabs>
                  <LineTabList>
                    {NFTTabs.map(({ name }, i) => (<Tab key={i}>{name}</Tab>))}
                  </LineTabList>

                  <TabPanels>
                    {NFTTabs.map(({ component: TabContentComponent, name }, i) => {
                      return (
                        <TabPanel key={i} px={0} pt={'30px'} pb={0}>
                          <TabContentComponent {...(name === 'Properties' ? { properties: NFT.nft.properties } : {})} />
                        </TabPanel>
                      )
                    })}
                  </TabPanels>
                </Tabs>
              </Box>
              <NFTBuySection />
            </Box>
          </Box>
        )
      : (
            <NotFound />
          )}
    </>
  )
};
