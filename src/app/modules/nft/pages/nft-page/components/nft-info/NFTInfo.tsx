import { getArtistApi } from '@app/api';
import { useNFTAsset } from '@app/modules/nft/components/nft-card/components/nft-card-asset/hooks';
import VideoPlaceholder from '@assets/images/open-graph/video-placeholder.png';
import {
  Box,
  Button,
  Center,
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
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReadMoreAndLess from 'react-read-more-less';
import { UseMeasureRect } from 'react-use/lib/useMeasure';
import { NFTAssetAudio, NFTAssetImage, NFTAssetVideo, NFTBuySection } from '../';
import notFoundImgOg from '../../../../../../../assets/images/404-og.png';
import { useErc20PriceStore } from '../../../../../../../stores/erc20PriceStore';
import { sendRefreshMetadataRequest } from '../../../../../../../utils/api/marketplace';
import { LineTabList, Loading, OpenGraph } from '../../../../../../components';
import { getTokenByAddress } from '../../../../../../constants';
import { IUser } from '../../../../../account/types';
import {
  NFTCard,
  NFTMenu,
  NFTPageCollectionRelation,
  NFTPageCreatorRelation,
  NFTPageOwnerRelation,
} from '../../../../components';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import { IOrder, IOrderAssetTypeERC20, IOrderAssetTypeSingleListing, NFTStandard } from '../../../../types';
import { useNFTPageData } from '../../NFTPage.context';
import * as styles from '../../styles';
import { NFTAssetBroken } from '../nft-asset-broken';
import { NFTTransferPopup } from '../nft-transfer-popup';
import { GoBackButton, TabHistory, TabDetails, TabOffers, TabOwners, TabProperties } from './components';
import { TabListings } from './components/tab-listings';
import { NFTAcceptOfferPopup } from './components/tab-offers/components';
import { RefreshMetadataPopup } from './components/tab-offers/components/refresh-metadata-popup';
import { Status } from './components/tab-offers/components/refresh-metadata-popup/enums';
import * as styles2 from './NFTInfo.style';

export const NFTInfo = () => {
  const router = useRouter();

  const {
    getTokenPriceByTicker,
    ethUsdPrice,
    daiUsdPrice,
    usdcUsdPrice,
    xyzUsdPrice,
    wethUsdPrice,
  } = useErc20PriceStore();

  const {
    NFT,
    isAuthUserOwner,
    isLoading,
    order,
    creator,
    owners,
    collection,
    collectionAddress,
    history,
    offers,
    moreFromCollection,
    isPolymorph,
    isLobster,
    totalEditions,
    ownedEditions,
  } = useNFTPageData();

  const [buySectionMeasure, setBuySectionMeasure] = useState<UseMeasureRect>();
  const [isTransferOpened, setIsTransferOpened] = useState(false);

  const [highestOffer, setHighestOffer] = useState<IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>>();
  const [highestOfferCreator, setHighestOfferCreator] = useState<IUser>();
  const [offerUsersMap, setUsersMap] = useState<Record<string, IUser>>({});
  const [refreshMetadataStatus, setRefreshMetadataStatus] = useState(
    Status.HIDDEN
  );
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [offerForAccept, setOfferForAccept] = useState<IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>>();

  const handleClickViewCollection = useCallback(() => {
    if (collectionAddress) {
      router.push(`/collection/${collectionAddress}`);
    }
  }, [collectionAddress]);

  const handleAcceptOffer = useCallback((offer: IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>) => {
    setOfferForAccept(offer);
    setShowOfferPopup(true);
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshMetadataStatus(Status.PROCESSING);
      const request = await sendRefreshMetadataRequest(
        NFT?._collectionAddress || "",
        NFT.tokenId
      );

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
      const orders =
        offers?.orders?.filter(
          (item) =>
            item?.maker?.toLowerCase() !== NFT?._ownerAddress?.toLowerCase()
        ) || [];

      const userRequests: Array<any> = [];
      const uniqueUsers = [
        ...Array.from(new Set(orders.map((order) => order.maker))),
      ];
      for (const user of uniqueUsers) {
        userRequests.push(getArtistApi(user));
      }

      orders?.sort((a, b) => {
        // Order by USD value of orders DESC
        const tokenContractA = a.make.assetType.contract;
        const tokenA = getTokenByAddress(tokenContractA);
        const tokenPriceA = getTokenPriceByTicker(tokenA.ticker);
        const orderPriceA = utils.formatUnits(
          a.make.value,
          tokenA.decimals ?? 18
        );
        const orderUsdPriceA = new BigNumber(orderPriceA).multipliedBy(
          tokenPriceA
        );

        let tokenB = null;
        let tokenPriceB = null;

        const tokenContractB = b.make.assetType.contract;

        if (tokenContractA.toLowerCase() === tokenContractB.toLowerCase()) {
          tokenB = tokenA;
          tokenPriceB = tokenPriceA;
        } else {
          tokenB = getTokenByAddress(tokenContractB);
          tokenPriceB = getTokenPriceByTicker(tokenB.ticker);
        }

        const orderPriceB = utils.formatUnits(
          b.make.value,
          tokenB.decimals ?? 18
        );
        const orderUsdPriceB = new BigNumber(orderPriceB).multipliedBy(
          tokenPriceB
        );

        if (orderUsdPriceB.eq(orderUsdPriceA)) {
          return 0;
        }

        if (orderUsdPriceB.lt(orderUsdPriceA)) {
          return -1;
        }

        return 1;
      });

      const usersMap = (await Promise.allSettled(userRequests)).reduce<
        Record<string, IUser>
      >((acc, response) => {
        if (response.status !== "fulfilled") {
          return acc;
        }

        const user = response.value;
        acc[user.address] = user.mappedUser;
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
    if (
      ethUsdPrice &&
      daiUsdPrice &&
      usdcUsdPrice &&
      xyzUsdPrice &&
      wethUsdPrice
    ) {
      getOrderOffers();
    }
  }, [
    offers,
    ethUsdPrice,
    daiUsdPrice,
    usdcUsdPrice,
    xyzUsdPrice,
    wethUsdPrice,
  ]);

  const isAssetVideo = isNFTAssetVideo(NFT?.artworkTypes ?? []);
  const isAssetImage = isNFTAssetImage(NFT?.artworkTypes ?? []);
  const isAssetAudio = isNFTAssetAudio(NFT?.artworkTypes ?? []);

  const { preview } = useNFTAsset(NFT);

  const OGImage = preview
    ? preview.indexOf(".mp4") !== -1
      ? VideoPlaceholder
      : preview
    : undefined;

  const ogProps = {
    title: `${NFT?.name} – ${collection?.name}`,
    description: NFT?.description || collection?.description || undefined,
    image: OGImage,
    imageAlt: NFT?.name || "",
  };
  if (!NFT || !collection) {
    ogProps.title = "Page not found";
    ogProps.description = "Oops.. page not found";
    ogProps.image = notFoundImgOg;
  }

  const schema = {
    "@context": "http://schema.org",
    "@type": "CreativeWork",
    name: ogProps.title,
    description: ogProps.description,
    image: {
      "@type": "ImageObject",
      url: ogProps.image,
    },
  };

  type INFTTab = {
    show: boolean;
    name: string;
    renderTab: () => React.ReactNode;
  }

  const tabs: INFTTab[] = [
    {
      show: true,
      name: 'Properties',
      renderTab: () => (<TabProperties properties={NFT?._properties ?? []} />),
    },
    {
      show: NFT.standard === NFTStandard.ERC1155,
      name: 'Owners',
      renderTab: () => (<TabOwners />),
    },
    {
      show: false,
      name: 'Bids',
      renderTab: () => null, // (<TabBids />),
    },
    {
      show: true,
      name: 'Offers',
      renderTab: () => (
        <TabOffers
          nft={NFT}
          offers={offers?.orders?.filter(
            (item) =>
              item?.maker?.toLowerCase() !==
              NFT?._ownerAddress?.toLowerCase()
          ) ?? []}
          usersMap={offerUsersMap}
          onAcceptOffer={handleAcceptOffer}
        />
      ),
    },
    {
      show: true,
      name: 'Details',
      renderTab: () => (<TabDetails />),
    },
    {
      show: true,
      name: 'History',
      renderTab: () => (<TabHistory history={history} />),
    },
    {
      show: NFT.standard === NFTStandard.ERC721 && !!owners.length,
      name: 'My Listings',
      renderTab: () => (<TabListings />),
    },
  ];

  return (
    <>
      <OpenGraph {...ogProps} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>

      {isLoading ? (
        <Box layerStyle={"StoneBG"} display={'flex'} minH={'calc(100vh - 80px)'}>
          <Center w={'100%'}>
            <Loading m={'auto'} />
          </Center>
        </Box>
      ) : !NFT ? <NotFound /> : (
        <>
          <Box layerStyle={"StoneBG"}>
            <Box {...styles.NFTAssetContainerStyle}>
              <GoBackButton />
              {((!NFT.artworkTypes || !NFT.artworkTypes.length) && (
                <NFTAssetBroken {...styles2.BrokenAssetStyle} />
              )) ||
                (isAssetVideo && (
                  <NFTAssetVideo
                    video={NFT.videoUrl || NFT.optimizedUrl || NFT.originalUrl}
                  />
                )) ||
                (isAssetImage && (
                  <NFTAssetImage
                    image={NFT.optimizedUrl || NFT.originalUrl}
                    alt={NFT.name}
                  />
                )) ||
                (isAssetAudio && (
                  <NFTAssetAudio audio={NFT.optimizedUrl || NFT.originalUrl} />
                ))}
            </Box>
            <Box {...styles.NFTDetailsContainerStyle}>
              <Box {...styles2.NFTDetailsTopSectionStyle}>
                <Flex justifyContent={"space-between"} mb={"12px"}>
                  <Heading as={"h2"} {...styles2.NameStyle}>
                    {NFT.name}
                  </Heading>
                  <Box>
                    {/*<NFTLike likes={[]} isLiked={true} {...styles.LikeButtonStyle} />*/}

                    <NFTMenu
                      NFT={NFT}
                      isAuthUserOwner={isAuthUserOwner}
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

                {NFT.standard === NFTStandard.ERC1155 && isAuthUserOwner && (
                  <Text {...styles2.EditionTextStyle}>
                    Owned {ownedEditions}/{totalEditions}
                  </Text>
                )}

                <Flex flexWrap={{ sm: "wrap", md: "nowrap" }} mb={"24px"}>
                  {NFT.creatorAddress && (
                    <NFTPageCreatorRelation
                      creatorAddress={NFT.creatorAddress}
                      creator={creator}
                    />
                  )}
                  {((collection && collection.id) || NFT?._collectionAddress) && (
                    <NFTPageCollectionRelation
                      collection={collection}
                      collectionAddress={NFT._collectionAddress}
                    />
                  )}
                  {(!!owners.length && NFT.standard === NFTStandard.ERC721) && (
                    <NFTPageOwnerRelation
                      ownerAddress={owners[0].address}
                      owner={owners[0].owner ?? undefined}
                    />
                  )}
                </Flex>

                {NFT.description && (
                  <Box {...styles.DescriptionStyle}>
                    <ReadMoreAndLess
                      charLimit={150}
                      readMoreText="Read more"
                      readLessText="Read less"
                    >
                      {`${NFT.description} `}
                    </ReadMoreAndLess>
                  </Box>
                )}

                <Tabs {...styles2.Tabs}>
                  <LineTabList>
                    {tabs.map(({ show, name }, i) => !show ? null : <Tab key={i}>{name}</Tab>)}
                  </LineTabList>

                  <TabPanels {...styles2.TabPanelsStyle}>
                    {tabs.map(({ show, renderTab }, i) => !show ? null : (
                      <TabPanel key={i}>{renderTab()}</TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              </Box>
              <NFTBuySection
                NFT={NFT}
                order={order}
                isAuthUserOwner={isAuthUserOwner}
                highestOfferOrder={highestOffer}
                highestOfferCreator={highestOfferCreator}
                onMeasureChange={(measure) => setBuySectionMeasure(measure)}
              />
            </Box>
          </Box>

          {showOfferPopup && offerForAccept && (
            <NFTAcceptOfferPopup
              NFT={NFT}
              order={offerForAccept}
              isOpen={showOfferPopup}
              onClose={() => setShowOfferPopup(false)}
            />
          )}
          {moreFromCollection && (
            <Box {...styles.MoreNFTsWrapperStyle}>
              {moreFromCollection.length > 0 && (
                <Heading {...styles.MoreNFTsTitleStyle}>
                  More from this collection
                </Heading>
              )}
              <Container {...styles.MoreNFTsContainerStyle}>
                <SimpleGrid columns={[1, null, 2, 4]} spacing={"20px"}>
                  {moreFromCollection.map(
                    (NFT) => !!NFT.id && <NFTCard key={NFT.id} NFT={NFT} />
                  )}
                </SimpleGrid>
              </Container>
              <Button
                {...styles.MoreNFTsButtonStyle}
                onClick={handleClickViewCollection}
              >
                View collection
              </Button>
            </Box>
          )}
          <NFTTransferPopup
            NFT={NFT}
            isOpen={isTransferOpened}
            onClose={() => setIsTransferOpened(false)}
          />
          <RefreshMetadataPopup
            status={refreshMetadataStatus}
            onClose={() => setRefreshMetadataStatus(Status.HIDDEN)}
          />
        </>
      )}
    </>
  );
};
