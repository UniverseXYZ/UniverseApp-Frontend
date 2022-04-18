import {
  Box,
  BoxProps,
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
import Head from 'next/head';
import { useRouter } from 'next/router';

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
import { BigNumber as EthersBigNumber, utils } from 'ethers';
import BigNumber from 'bignumber.js';
import { sendRefreshMetadataRequest } from '../../../../../../../utils/api/marketplace';
import BrokenNFT from '../../../../../../../components/marketplaceNFT/BrokenNFT';
import { NFTAssetBroken } from '../nft-asset-broken';
import { IERC721AssetType, INFT, IOrder, IUser } from '../../../../types';
import { GetUserApi } from '../../../../api';
import { OrderAssetClass } from '../../../../enums';
import { getTokenByAddress } from '../../../../../../constants';
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { Status } from './components/tab-offers/components/refresh-metadata-popup/enums';
import { RefreshMetadataPopup } from './components/tab-offers/components/refresh-metadata-popup';
import { ReportStatusPopup } from './components/tab-offers/components/report-status-popup';
import { NFTAcceptOfferPopup } from './components/tab-offers/components';
import { useQueryClient } from 'react-query';
import { userKeys } from '../../../../../../utils/query-keys';
import { TabListings } from './components/tab-listings';

// TODO: hide metadata tab for not Polymorph NFT type
export const NFTInfo = () => {
  const router = useRouter();

  const { getTokenPriceByTicker, ethUsdPrice, daiUsdPrice, usdcUsdPrice, xyzUsdPrice, wethUsdPrice, address } =
    useAuthContext() as any;
  const { NFT, isLoading, order, creator, owner, collection, collectionAddress, history, offers, moreFromCollection } =
    useNFTPageData();

  const [buySectionMeasure, setBuySectionMeasure] = useState<UseMeasureRect>();
  const [isTransferOpened, setIsTransferOpened] = useState(false);

  const [highestOffer, setHighestOffer] = useState<IOrder>();
  const [highestOfferCreator, setHighestOfferCreator] = useState<IUser>();
  const [offerUsersMap, setUsersMap] = useState<Record<string, IUser>>({});
  const [refreshMetadataStatus, setRefreshMetadataStatus] = useState(Status.HIDDEN);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [offerForAccept, setOfferForAccept] = useState<IOrder | null>(null);

  const queryClient = useQueryClient();

  const handleClickViewCollection = useCallback(() => {
    if (collectionAddress) {
      router.push(`/collection/${collectionAddress}`);
    }
  }, [collectionAddress]);

  const editions = useMemo<string[]>(() => NFT?.tokenIds ?? [], [NFT]);

  const editionNumber = useMemo(() => {
    return editions.findIndex((edition) => edition === NFT.tokenId) + 1;
  }, [editions]);

  const showMetadata = process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS && process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS && [
    process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS.toLowerCase(),
    process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS.toLowerCase(),
  ].includes((NFT?._collectionAddress || "").toLowerCase() ?? '');

  const handleRefresh = async () => {
    try {
      setRefreshMetadataStatus(Status.PROCESSING);
      const request = await sendRefreshMetadataRequest(NFT?._collectionAddress || '', NFT.tokenId);

      if (request.status === 204) {
        setRefreshMetadataStatus(Status.SUCCESS);
        return;
      }
    } catch (err) {
      console.log(err);
    }
    setRefreshMetadataStatus(Status.HIDDEN);
  };

  const getOrderOffers = async () => {
    try {
      const orders = offers?.orders?.filter(item => item?.maker?.toLowerCase() !== NFT?._ownerAddress?.toLowerCase()) || [];

      const userRequests: Array<any> = [];
      const uniqueUsers = [...Array.from(new Set(orders.map((order) => order.maker)))];
      for (const user of uniqueUsers) {
        userRequests.push(GetUserApi(user));
      }

      orders?.sort((a, b) => {
        // Order by USD value of orders DESC
        const tokenContractA = (a.make.assetType as IERC721AssetType).contract;
        const tokenA = getTokenByAddress(tokenContractA);
        const tokenPriceA = getTokenPriceByTicker(tokenA.ticker);
        const orderPriceA = utils.formatUnits(a.make.value, tokenA.decimals ?? 18);
        const orderUsdPriceA = new BigNumber(orderPriceA).multipliedBy(tokenPriceA);

        let tokenB = null;
        let tokenPriceB = null;

        const tokenContractB = (b.make.assetType as IERC721AssetType).contract;

        if (tokenContractA.toLowerCase() === tokenContractB.toLowerCase()) {
          tokenB = tokenA;
          tokenPriceB = tokenPriceA;
        } else {
          tokenB = getTokenByAddress(tokenContractB);
          tokenPriceB = getTokenPriceByTicker(tokenB.ticker);
        }

        const orderPriceB = utils.formatUnits(b.make.value, tokenB.decimals ?? 18);
        const orderUsdPriceB = new BigNumber(orderPriceB).multipliedBy(tokenPriceB);

        if (orderUsdPriceB.eq(orderUsdPriceA)) {
          return 0;
        }

        if (orderUsdPriceB.lt(orderUsdPriceA)) {
          return -1;
        }

        return 1;
      });

      const usersMap = (await Promise.allSettled(userRequests)).reduce<Record<string, IUser>>((acc, response) => {
        if (response.status !== 'fulfilled') {
          return acc;
        }

        const user: IUser = response.value;
        acc[user.address] = user;
        return acc;
      }, {});

      setUsersMap(usersMap);
      setHighestOffer(orders[0]);
      setHighestOfferCreator(usersMap[orders[0]?.maker]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (ethUsdPrice && daiUsdPrice && usdcUsdPrice && xyzUsdPrice && wethUsdPrice) {
      getOrderOffers();
    }
  }, [offers, ethUsdPrice, daiUsdPrice, usdcUsdPrice, xyzUsdPrice, wethUsdPrice]);

  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          <CollectionPageLoader />
        </div>
      ) : NFT ? (
        <>
          <Head>
            <title>{NFT.name} - Universe.XYZ</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Box layerStyle={'StoneBG'}>
            <Box {...styles.NFTAssetContainerStyle}>
              {(!NFT.artworkTypes || !NFT.artworkTypes.length) && <NFTAssetBroken {...styles2.BrokenAssetStyle} /> ||
              isNFTAssetVideo(NFT.artworkTypes) && (
                <NFTAssetVideo video={NFT.videoUrl || NFT.optimizedUrl || NFT.originalUrl} />
              ) ||
              isNFTAssetImage(NFT.artworkTypes) && <NFTAssetImage image={NFT.optimizedUrl || NFT.originalUrl} /> ||
              isNFTAssetAudio(NFT.artworkTypes) && <NFTAssetAudio audio={NFT.optimizedUrl || NFT.originalUrl} />}
            </Box>
            <Box {...styles.NFTDetailsContainerStyle}>
              <Box
                sx={{
                  p: { sm: '40px 20px', md: '60px 40px' },
                  overflowY: { 
                    xl: 'scroll'
                  },
                }}
                css={{
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  }
                }}
              >
                <Flex
                  sx={{
                    mb: '12px',
                    justifyContent: 'space-between',
                  }}
                >
                  <Heading
                    as={'h2'}
                    sx={{
                      fontSize: '26px',
                      color: 'transparent',
                      background: 'black',
                      backgroundClip: 'text',
                      textShadow: '2px 2px 5px rgba(255, 255, 255, 0.3)',
                      textOverflow: 'break-word',
                      maxW: '90%',
                    }}
                  >
                    {NFT.name}
                  </Heading>
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
                  {((collection && collection.id) || NFT?._collectionAddress) && <NFTPageCollectionRelation collection={collection} collectionAddress={NFT._collectionAddress} />}
                  {owner && <NFTPageOwnerRelation owner={owner} />}
                </Flex>

                {NFT.description && (
                  <Box {...styles.DescriptionStyle}>
                    <ReadMoreAndLess charLimit={150} readMoreText="Read more" readLessText="Read less">
                      {`${NFT.description} `}
                    </ReadMoreAndLess>
                  </Box>
                )}

                <Tabs sx={{
                  h: {
                    xl: 'calc(100vh - 466px)'
                  }
                }}>
                  <LineTabList>
                    <Tab>Properties</Tab>
                    {showMetadata && <Tab>Metadata</Tab>}
                    {/* TODO: Add implementation after release */}
                    {/* <Tab>Owners</Tab> */}
                    {/* <Tab>Bids</Tab> */}
                    <Tab>Offers</Tab>
                    <Tab>Universe History</Tab>
                    <Tab>Listings</Tab>
                  </LineTabList>

                  <TabPanels sx={{ '> div': { px: 0, pt: '30px', pb: {
                    xl: '30px'
                  }}}}>
                    <TabPanel>
                      <TabProperties properties={NFT?._properties ?? []} />
                    </TabPanel>
                    {showMetadata && (
                      <TabPanel>
                        <TabMetadata />
                      </TabPanel>
                    )}
                    {/* TODO: Add implementation after release */}
                    {/* <TabPanel><TabOwners /></TabPanel> */}
                    {/* <TabPanel><TabBids /></TabPanel> */}
                    <TabPanel>
                      <TabOffers
                        nft={NFT}
                        offers={offers?.orders?.filter(item => item?.maker?.toLowerCase() !== NFT?._ownerAddress?.toLowerCase())}
                        usersMap={offerUsersMap}
                        setOfferForAccept={setOfferForAccept}
                        setShowOfferPopup={setShowOfferPopup}
                      />
                    </TabPanel>
                    <TabPanel>
                      <TabHistory historyData={history} />
                    </TabPanel>
                    <TabPanel>
                      <TabListings owner={owner} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <NFTBuySection
                NFT={NFT}
                owner={owner}
                order={order}
                highestOffer={{ offer: highestOffer || ({} as IOrder), creator: highestOfferCreator || ({} as IUser) }}
                onMeasureChange={(measure) => setBuySectionMeasure(measure)}
              />
            </Box>
          </Box>

          {showOfferPopup && (
            <NFTAcceptOfferPopup
              NFT={NFT}
              order={offerForAccept || ({} as IOrder)}
              isOpen={showOfferPopup}
              onClose={() => setShowOfferPopup(false)}
            />
          )}
          {moreFromCollection && (
            <Box {...styles.MoreNFTsWrapperStyle}>
              {moreFromCollection.length > 0 && (
                <Heading {...styles.MoreNFTsTitleStyle}>More from this collection</Heading>
              )}
              <Container
                {...styles.MoreNFTsContainerStyle}
              >
                <SimpleGrid
                  columns={{
                    base: 1,
                    md: 2,
                    lg: 4,
                  }}
                  spacing={'20px'}
                >
                  {moreFromCollection.map(
                    (NFT) =>
                      !!NFT.id && (
                        <NftItem
                          key={NFT.id}
                          NFT={NFT}
                          collection={`${NFT._collectionAddress}`}
                          renderContent={({
                            NFT,
                            collection,
                            creator,
                            owner,
                            bestOfferPrice,
                            bestOfferPriceToken,
                            lastOfferPrice,
                            lastOfferPriceToken,
                            order: orderData,
                          }) => (
                            <NFTItemContentWithPrice
                              collectionAddress={NFT._collectionAddress}
                              name={NFT.name}
                              collection={collection}
                              creator={creator || undefined}
                              owner={owner || undefined}
                              order={orderData || undefined}
                              bestOfferPrice={bestOfferPrice || 0}
                              bestOfferPriceToken={bestOfferPriceToken || undefined}
                              lastOfferPrice={lastOfferPrice || 0}
                              lastOfferPriceToken={lastOfferPriceToken || undefined}
                            />
                          )}
                        />
                      )
                  )}
                </SimpleGrid>
              </Container>
              <Button {...styles.MoreNFTsButtonStyle} onClick={handleClickViewCollection}>
                View collection
              </Button>
            </Box>
          )}
          <NFTTransferPopup NFT={NFT} isOpen={isTransferOpened} onClose={() => setIsTransferOpened(false)} />
          <RefreshMetadataPopup
            status={refreshMetadataStatus}
            onClose={() => setRefreshMetadataStatus(Status.HIDDEN)}
          />
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};
