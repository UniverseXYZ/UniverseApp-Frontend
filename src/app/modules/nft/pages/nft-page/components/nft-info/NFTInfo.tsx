import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReadMoreAndLess from 'react-read-more-less';
import { UseMeasureRect } from 'react-use/lib/useMeasure';
import { useHistory } from 'react-router-dom';

import { LineTabList } from '../../../../../../components';
import { NFTAssetImage, NFTAssetAudio, NFTBuySection, NFTAssetVideo } from '../';
import { useNFTPageData } from '../../NFTPage.context';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import {
  NftItem,
  NFTMenu,
  NFTPageCollectionRelation,
  NFTPageCreatorRelation,
  NFTPageOwnerRelation,
} from '../../../../components';
import { TabBids, TabHistory, TabMetadata, TabOffers, TabOwners, TabProperties } from './components';
import { CollectionPageLoader } from '../../../../../../../containers/collection/CollectionPageLoader';
import NotFound from '../../../../../../../components/notFound/NotFound';
import * as styles from '../../styles';
import * as styles2 from './styles';
import { NFTItemContentWithPrice, NFTLike } from '../../../../components/nft-item/components';
import { NFTTransferPopup } from '../nft-transfer-popup';
import {BigNumber, utils} from "ethers"
import { sendRefreshMetadataRequest } from '../../../../../../../utils/api/marketplace';
import BGImage from '../../../../../../../assets/images/v2/stone_bg.jpg';
import BrokenNFT from '../../../../../../../components/marketplaceNFT/BrokenNFT';
import { NFTAssetBroken } from '../nft-asset-broken';
import { INFT, IOrder, IUser } from '../../../../types';
import { GetOrdersApi, GetUserApi } from '../../../../api';
import { OrderAssetClass } from '../../../../enums';

// TODO: hide metadata tab for not Polymorph NFT type
export const NFTInfo = () => {
  const router = useHistory();

  const { NFT, isLoading, order, creator, owner, collection, collectionAddress, history, offers, moreFromCollection } = useNFTPageData();

  const [buySectionMeasure, setBuySectionMeasure] = useState<UseMeasureRect>();
  const [isTransferOpened, setIsTransferOpened] = useState(false);

  const [highestOffer, setHighestOffer] = useState<IOrder>();
  const [highestOfferCreator, setHighestOfferCreator] = useState<IUser>();
  const [offerUsersMap, setUsersMap] = useState<Record<string, IUser>>({});

  const handleClickViewCollection = useCallback(() => {
    if (NFT.moreFromCollection && NFT.moreFromCollection[0].collection) {
      router.push(`/collection/${NFT.moreFromCollection[0].collection.address}`);
    }
  }, [NFT?.moreFromCollection]);

  const editions = useMemo<string[]>(() => NFT?.tokenIds ?? [], [NFT]);

  const editionNumber = useMemo(() => {
    return editions.findIndex((edition) => edition === NFT.tokenId) + 1;
  }, [editions]);

  const showMetadata = [
    process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS,
    process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS
  ].includes(NFT?.collection?.address ?? '');
  
  const handleRefresh = async () => {
    try {
      const request = await sendRefreshMetadataRequest(NFT?.collection?.address || "", NFT.tokenId);
      
      if (request.status === 204) {
        console.log("Successfully sent refresh metadata request")
      }

    } catch(err) {
      console.log(err)
    }
  }

  const getOrderOffers = async () => {
      try {
        const orders = offers?.orders || [];

        orders?.sort((a,b) => {
          const difference = BigNumber.from(b.make.value).sub(a.make.value).toString();
          if (difference === "0") {
            return 0;
          }
          // '-' means the difference is negative
          if (difference.includes('-')) {
            return -1;
          }
          return 1;
        })
        
        const userRequests: Array<any> = [];
        for (const order of orders) {
          userRequests.push(GetUserApi(order.maker))
        }
      
        const usersMap = (await (Promise.allSettled(userRequests))).reduce<Record<string, IUser>>((acc, response) => {
          if(response.status !== 'fulfilled') {
            return acc;
          }

          const user: IUser = response.value;
          acc[user.address] = user;
          return acc;
        }, {});

        setUsersMap(usersMap)
        setHighestOffer(orders[0]);
        setHighestOfferCreator(usersMap[orders[0]?.maker]);
      }catch(err) {
        console.error(err);
      }
  }

  useEffect(() => {
    getOrderOffers();
  }, [offers])

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
            <Box sx={{
              bg: `url(${BGImage}) center / cover`
            }}>
              <Box {...styles.NFTAssetContainerStyle}>
                {!NFT.artworkType && <NFTAssetBroken/>}
                {isNFTAssetImage(NFT.artworkType) &&
                  <NFTAssetImage image={NFT.optimizedUrl || NFT.originalUrl} />
                }
                {isNFTAssetVideo(NFT.artworkType) &&
                  <NFTAssetVideo video={NFT.optimizedUrl || NFT.originalUrl} />
                }
                {isNFTAssetAudio(NFT.artworkType) &&
                  <NFTAssetAudio audio={NFT.optimizedUrl || NFT.originalUrl} />
                }
              </Box>
              <Box {...styles.NFTDetailsContainerStyle}>
                <Box sx={{ p: {sm: '40px 20px', md: '60px 40px'}, minH: `calc(100vh - 80px - ${buySectionMeasure?.height}px)`, }}>
                  <Flex sx={{
                    alignItems: 'center',
                    mb: '12px',
                    justifyContent: 'space-between'
                  }}>
                    <Heading as={'h2'} sx={{ fontSize: '26px', color: 'transparent', background: 'black', backgroundClip: 'text', textShadow: '2px 2px 5px rgba(255, 255, 255, 0.3)' }}>{NFT.name}</Heading>
                    <Box>
                      {/*<NFTLike likes={[]} isLiked={true} {...styles.LikeButtonStyle} />*/}

                      <NFTMenu
                        NFT={NFT}
                        owner={owner}
                        collectionAddress={collectionAddress}
                        showSell={!order}
                        showBurn={false}
                        showRemove={false}
                        showHideUnhide={false}
                        showTransfer={false}
                        onTransfer={() => setIsTransferOpened(true)}
                        onRefresh={handleRefresh}
                      />
                    </Box>
                  </Flex>

                  <Text {...styles2.EditionTextStyle}>
                    Edition&nbsp;
                    {`${editionNumber}/${NFT.numberOfEditions || editions.length}`}
                  </Text>

                  <Flex mb={'24px'} flexWrap={{ sm: 'wrap', md: 'nowrap' }}>
                    {creator && <NFTPageCreatorRelation creator={creator} />}
                    {collection && <NFTPageCollectionRelation collection={collection} />}
                    {owner && <NFTPageOwnerRelation owner={owner} />}
                  </Flex>

                  <Box {...styles.DescriptionStyle}>
                    <ReadMoreAndLess
                      charLimit={150}
                      readMoreText="Read more"
                      readLessText="Read less"
                    >
                      {NFT.description || ''}
                    </ReadMoreAndLess>
                  </Box>

                  <Tabs>
                    <LineTabList>
                      <Tab>Properties</Tab>
                      {showMetadata && <Tab>Metadata</Tab>}
                      {/* TODO: Add implementation after release */}
                      {/* <Tab>Owners</Tab> */}
                      {/* <Tab>Bids</Tab> */}
                      <Tab>Offers</Tab>
                      <Tab>History</Tab>
                    </LineTabList>

                    <TabPanels sx={{ '> div' : { px: 0, pb: 0, pt: '30px', }}}>
                    <TabPanel><TabProperties properties={NFT?._properties ?? []} /></TabPanel>
                      {showMetadata && <TabPanel><TabMetadata /></TabPanel>}
                      {/* TODO: Add implementation after release */}
                      {/* <TabPanel><TabOwners /></TabPanel> */}
                      {/* <TabPanel><TabBids /></TabPanel> */}
                      <TabPanel><TabOffers nft={NFT} order={order} offers={offers?.orders} usersMap={offerUsersMap}/></TabPanel>
                      <TabPanel><TabHistory historyData={history}/></TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
                <NFTBuySection
                  NFT={NFT}
                  owner={owner}
                  order={order}
                  highestOffer={{ offer: highestOffer || {} as IOrder, creator: highestOfferCreator || {} as IUser}}
                  onMeasureChange={(measure) => setBuySectionMeasure(measure)}
                />
              </Box>
            </Box>
            {moreFromCollection && (
              <Box {...styles.MoreNFTsWrapperStyle}>
                <Heading {...styles.MoreNFTsTitleStyle}>More from this collection</Heading>
                <Container
                  {...styles.MoreNFTsContainerStyle}
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
                    {moreFromCollection.map((NFT) => !!NFT.id && (
                    <NftItem
                      key={NFT.id}
                      NFT={NFT}
                      collection={`${NFT._collectionAddress}`}
                      renderContent={({ NFT, collection, creator, owner, bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken }) => (
                        <NFTItemContentWithPrice
                          name={NFT.name}
                          collection={collection}
                          tokenId={NFT.tokenId}
                          creator={creator || undefined}
                          owner={owner || undefined}
                          order={{
                            assetClass: OrderAssetClass.ERC721,
                            collectionAddress: `${NFT._collectionAddress}`,
                            tokenId: `${NFT.tokenId}`,
                          }}
                          bestOfferPrice={bestOfferPrice || 0}
                          bestOfferPriceToken={bestOfferPriceToken || undefined}
                          lastOfferPrice={lastOfferPrice || 0}
                          lastOfferPriceToken={lastOfferPriceToken || undefined}
        
                        />
                      )}
                    />
                    
                    ))}
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
