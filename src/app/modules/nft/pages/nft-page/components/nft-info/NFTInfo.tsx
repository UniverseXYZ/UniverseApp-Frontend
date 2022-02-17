import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import ReadMoreAndLess from 'react-read-more-less';
import { UseMeasureRect } from 'react-use/lib/useMeasure';
import { useHistory } from 'react-router-dom';

import { Bindings } from '../../mocks';
import { LineTabList } from '../../../../../../components';
import { NFTAssetImage, NFTAssetAudio, NFTBuySection, NFTAssetVideo } from '../';
import { useNFTPageData } from '../../NFTPage.context';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import { NftItem, NFTMenu } from '../../../../components';
import { TabBids, TabHistory, TabMetadata, TabOffers, TabOwners, TabProperties } from './components';
import { CollectionPageLoader } from '../../../../../../../containers/collection/CollectionPageLoader';
import NotFound from '../../../../../../../components/notFound/NotFound';
import * as styles from '../../styles';
import { NFTLike } from '../../../../components/nft-item/components';
import { NFTTransferPopup } from '../nft-transfer-popup/NFTTransferPopup';

// TODO: hide metadata tab for not Polymorph NFT type
export const NFTInfo = () => {
  const router = useHistory();

  const { NFT, isLoading, order } = useNFTPageData();

  const [buySectionMeasure, setBuySectionMeasure] = useState<UseMeasureRect>();
  const [isTransferOpened, setIsTransferOpened] = useState(false);

  const handleClickViewCollection = useCallback(() => {
    if (NFT.moreFromCollection && NFT.moreFromCollection[0].collection) {
      router.push(`/collection/${NFT.moreFromCollection[0].collection.address}`);
    }
  }, [NFT?.moreFromCollection]);

  const showMetadata = [
    process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS,
    process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS
  ].includes(NFT?.collection?.address ?? '');

  return (
    <>
      {isLoading
      ? (
          <div className='loader-wrapper'>
            <CollectionPageLoader />
          </div>
        )
      : NFT ? (
          <>
            <Box>
              <Box {...styles.NFTAssetContainerStyle}>
                {isNFTAssetImage(NFT.artworkType) &&
                  <NFTAssetImage image={NFT.originalUrl || NFT.optimizedUrl} />
                }
                {isNFTAssetVideo(NFT.artworkType) &&
                  <NFTAssetVideo video={NFT.originalUrl || NFT.optimizedUrl} />
                }
                {isNFTAssetAudio(NFT.artworkType) &&
                  <NFTAssetAudio audio={NFT.originalUrl || NFT.optimizedUrl} />
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
                      {/*<NFTLike likes={[]} isLiked={true} {...styles.LikeButtonStyle} />*/}

                      <NFTMenu
                        nft={NFT}
                        showSell={!order}
                        showBurn={false}
                        showRemove={false}
                        onTransfer={() => setIsTransferOpened(true)}
                      />
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
                    {/*TODO: improve section in favor to NFTPageRelation */}
                    {Bindings.map((binding, i) => !binding.getValue(NFT) ? null : (
                      <Link key={i} href={binding.getLink(NFT)} sx={{
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
                        <Flex sx={{
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

                  <Text {...styles.DescriptionStyle}>
                    <ReadMoreAndLess
                      charLimit={150}
                      readMoreText="Read more"
                      readLessText="Read less"
                    >
                      {NFT.description || ''}
                    </ReadMoreAndLess>
                  </Text>

                  <Tabs>
                    <LineTabList>
                      <Tab>Properties</Tab>
                      {showMetadata && <Tab>Metadata</Tab>}
                      <Tab>Owners</Tab>
                      <Tab>Bids</Tab>
                      <Tab>Offers</Tab>
                      <Tab>History</Tab>
                    </LineTabList>

                    <TabPanels sx={{ '> div' : { px: 0, pb: 0, pt: '30px', }}}>
                      <TabPanel><TabProperties properties={NFT.properties || []} /></TabPanel>
                      {showMetadata && <TabPanel><TabMetadata /></TabPanel>}
                      <TabPanel><TabOwners /></TabPanel>
                      <TabPanel><TabBids /></TabPanel>
                      <TabPanel><TabOffers /></TabPanel>
                      <TabPanel><TabHistory /></TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
                <NFTBuySection
                  NFT={NFT}
                  order={order}
                  onMeasureChange={(measure) => setBuySectionMeasure(measure)}
                />
              </Box>
            </Box>
            {NFT.moreFromCollection && (
              <Box {...styles.MoreNFTsWrapperStyle}>
                <Heading {...styles.MoreNFTsTitleStyle}>More from this collection</Heading>
                <Container
                  {...styles.MoreNFTsContainerStyle}
                  /*TODO: move 1110px to styles*/
                  w={NFT.moreFromCollection.length < 4 ? `calc(1110px / 4 * ${NFT.moreFromCollection.length})` : '100%'}
                >
                  <SimpleGrid
                    columns={{
                      base: 1,
                      md: 2,
                      lg: NFT.moreFromCollection.length < 4 ? NFT.moreFromCollection.length : 4,
                    }}
                    spacingX={'20px'}
                  >
                    {NFT.moreFromCollection.map((NFT) => (<NftItem key={NFT.id} NFT={NFT} />))}
                  </SimpleGrid>
                </Container>
                <Button {...styles.MoreNFTsButtonStyle} onClick={handleClickViewCollection}>View collection</Button>
              </Box>
            )}
            <NFTTransferPopup NFT={NFT} isOpen={isTransferOpened} onClose={() => setIsTransferOpened(false)} />
          </>
        )
      : (<NotFound />)}
    </>
  )
};
