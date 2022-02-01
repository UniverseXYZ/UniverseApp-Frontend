import {
  Box,
  Flex,
  Heading,
  Link,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { UseMeasureRect } from 'react-use/lib/useMeasure';

import { Bindings } from '../../mocks';
import { LineTabList } from '../../../../../../components';
import { NFTAssetImage, NFTAssetAudio, NFTBuySection, NFTAssetVideo } from '../';
import { useNFTPageData } from '../../NFTPage.context';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import { NFTMenu } from '../../../../components';
import { TabBids, TabHistory, TabMetadata, TabOffers, TabOwners, TabProperties } from './components';
import { CollectionPageLoader } from '../../../../../../../containers/collection/CollectionPageLoader';
import NotFound from '../../../../../../../components/notFound/NotFound';
import * as styles from '../../styles';

// TODO: hide metadata tab for not Polymorph NFT type
export const NFTInfo = () => {
  const { NFT, isLoading } = useNFTPageData();

  const [buySectionMeasure, setBuySectionMeasure] = useState<UseMeasureRect>();

  return (
    <>
      {isLoading
      ? (
          <div className='loader-wrapper'>
            <CollectionPageLoader />
          </div>
        )
      : NFT ? (
          <Box>
            <Box {...styles.NFTAssetContainerStyle}>
              {isNFTAssetImage(NFT.artworkType) &&
                <NFTAssetImage image={NFT.originalUrl} />
              }
              {isNFTAssetVideo(NFT.artworkType) &&
                <NFTAssetVideo video={NFT.originalUrl} />
              }
              {isNFTAssetAudio(NFT.artworkType) &&
                <NFTAssetAudio audio={NFT.originalUrl} />
              }
            </Box>
            <Box {...styles.NFTDetailsContainerStyle}>
              <Box sx={{ p: '60px 40px', minH: `calc(100vh - 80px - ${buySectionMeasure?.height}px)`, }}>
                <Flex sx={{
                  alignItems: 'center',
                  mb: '12px',
                  justifyContent: 'space-between'
                }}>
                  <Heading as={'h2'} sx={{ fontSize: '26px', }}>{NFT.name}</Heading>
                  <Box>
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

                    <NFTMenu nft={NFT} />
                  </Box>
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
                  {`${NFT.tokenIds ? NFT.tokenIds.length : 1}/${NFT.numberOfEditions || (NFT.tokenIds || [NFT.tokenId]).length}`}
                </Text>

                <Flex mb={'24px'}>
                  {Bindings.map((binding, i) => (
                    <Link to={binding.getLink(NFT)} sx={{
                      _hover: {
                        textDecoration: 'none !important',
                        'div p:nth-of-type(2)': {
                          textDecoration: 'underline',
                        }
                      },
                      _notLast: {
                        '> div > div': {
                          _last: {
                            pr: '20px'
                          }
                        },
                      },
                    }}>
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
                    {NFT.description || ''}
                  </ReactReadMoreReadLess>
                </Text>

                <Tabs>
                  <LineTabList>
                    <Tab>Properties</Tab>
                    <Tab>Metadata</Tab>
                    <Tab>Owners</Tab>
                    <Tab>Bids</Tab>
                    <Tab>Offers</Tab>
                    <Tab>History</Tab>
                  </LineTabList>

                  <TabPanels sx={{ '> div' : { px: 0, pb: 0, pt: '30px', }}}>
                    <TabPanel><TabProperties properties={NFT.properties || []} /></TabPanel>
                    <TabPanel><TabMetadata /></TabPanel>
                    <TabPanel><TabOwners /></TabPanel>
                    <TabPanel><TabBids /></TabPanel>
                    <TabPanel><TabOffers /></TabPanel>
                    <TabPanel><TabHistory /></TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <NFTBuySection onMeasureChange={(measure) => setBuySectionMeasure(measure)} />
            </Box>
          </Box>
        )
      : (<NotFound />)}
    </>
  )
};
