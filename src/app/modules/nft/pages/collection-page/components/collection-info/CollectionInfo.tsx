import {
  Avatar,
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  Link, Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { Contract } from 'ethers';
import { useHistory } from 'react-router-dom';

import Contracts from '../../../../../../../contracts/contracts.json';
import SocialLinks from '../../../../../../../../src/components/collection/SocialLinks';
import { useCollectionPageData } from '../../CollectionPage.context';
import {
  NftItem, NFTItemContentWithPrice, NoNFTsFound,
} from '../../../../components';
import { CollectionPageLoader } from '../../../../../../../containers/collection/CollectionPageLoader';
import { CollectionStatistics } from './components/index';
import NotFound from '../../../../../../../components/notFound/NotFound';
import Cover from '../../../../../../../components/collection/Cover';
import { NoDescriptionFound } from '../../../../components/no-description-found';
import { useFiltersContext } from '../../../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { SearchFilters } from '../../../../../account/pages/my-nfts-page/components/search-filters';
import NftCardSkeleton from '../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton';
import { shortenEthereumAddress } from '../../../../../../../utils/helpers/format';
import { useAuthContext } from '../../../../../../../contexts/AuthContext.jsx';
import EditIcon from '../../../../../../../components/svgs/EditIcon';
import { useIntersection } from 'react-use';

export const CollectionInfo = () => {
  const [totalNftsCount, setTotalNftsCount] = useState(0);
  const { address, signer, isAuthenticated } = useAuthContext() as any;
  const history = useHistory();
  const [collectionOwner, setCollectionOwner] = useState<string>('');

  const {
		collection,
		isLoadingCollectionApi,
		isFetchingCollectionApi,
		isIdleCollectionApi,
		collectionAddress,
		collectionGeneralInfo,
		collectionOrderBookData,
    isLoadingCollectionGeneralInfo,
    isFetchingCollectionGeneralInfo,
    isIdleCollectionGeneralInfo,
	 } = useCollectionPageData();

  const scrollContainer = useRef(null);

  const {
    setCollectionAddress,
    setShowSaleTypeFilters,
    setShowPriceRangeFilters,
    setShowNFTTypeFilters,
    collectionNFTs,
    fetchNextCollectionNFTs,
    fetchNextOrders,
    hasMoreCollectionNFTs,
    orders,
    hasSelectedOrderBookFilters,
    hasMoreOrders,
		isFethingOrders,
		isLoadingOrders,
		isIdleOrders,
    isFetchingCollectionNFTs,
    isLoadingCollectionNFTs,
    isIdleCollectionNFTs,
  } = useFiltersContext();

  useEffect(() => {
    setCollectionAddress(collectionAddress);
    setShowSaleTypeFilters(true);
    setShowPriceRangeFilters(true);
    setShowNFTTypeFilters(true);
  }, [collectionAddress])

  useEffect(() => {
    if (collectionNFTs && totalNftsCount === 0) {
      setTotalNftsCount(collectionNFTs.pages[0].total);
    }
  }, [collectionNFTs])

  const fetchCollectionOwner = async () => {
    try {
      // @ts-ignore
      const { contracts } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
      // We use the UniserveERC721Core ABI because it implements the Ownable interface
      const collectionContract = new Contract(
        collectionGeneralInfo?.contractAddress || collection?.address || '',
        contracts.UniverseERC721Core.abi,
        signer
      );

      const owner = await collectionContract.owner();
      setCollectionOwner(owner.toLowerCase());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if ((collectionGeneralInfo?.contractAddress || collection?.address) && signer) {
      fetchCollectionOwner();
    }
  }, [collectionGeneralInfo?.contractAddress , collection?.address, signer]);

  const handleEdit = () => {
    history.push('/my-nfts/create', {
      tabIndex: 1,
      nftType: 'collection',
      collection: {
        ...collection,
        ...collectionGeneralInfo,
        address: collection.address || collectionGeneralInfo?.contractAddress,
        name: collection.name || collectionGeneralInfo?.name,
      },
      collectionAddress
    });
  };

  const hasOrderBookFilters = hasSelectedOrderBookFilters();
	const hasOrders = orders?.pages?.length && orders.pages[0].data?.length;
	const hasCollectionNFTs = collectionNFTs?.pages?.length && collectionNFTs.pages[0].data?.length;
	const waitingOrders = isFethingOrders || isLoadingOrders || isIdleOrders;
	const waitingCollectionNFTs = isFetchingCollectionNFTs || isLoadingCollectionNFTs || isIdleCollectionNFTs;
	const waitingCollectionOffChainInfo = isFetchingCollectionApi || isLoadingCollectionApi || isIdleCollectionApi;
	const waitingCollectionGeneralInfo = isLoadingCollectionGeneralInfo || isFetchingCollectionGeneralInfo || isIdleCollectionGeneralInfo;

  const filtersRef = useRef(null);

  const intersection = useIntersection(filtersRef, {
    threshold: 1,
    rootMargin: '0px',
    root: null,
  });

  return (
    <>
      {(waitingCollectionGeneralInfo && !collectionGeneralInfo) || (waitingCollectionOffChainInfo && !collection) ? (
        <div className='loader-wrapper'>
          <CollectionPageLoader />
        </div>
      ) : (!waitingCollectionGeneralInfo && !collectionGeneralInfo?.contractAddress) && (!waitingCollectionOffChainInfo && !collection?.address) ? (
        <NotFound />
      ) : (
        <Box layerStyle={'StoneBG'}>
          <Cover selectedCollection={collection} collectionGeneralInfo={collectionGeneralInfo} collectionOwner={collectionOwner} />
          <Box sx={{ position: 'relative', p: '0px 20px 80px 20px' }} >
            <Flex sx={{ maxWidth: '1110px', margin: '-208px auto 0px' }}>
              <Box w={'100%'}>
                <Flex sx={{
                  alignItems: 'center',
                  mb: '30px',
                }}>
                  <Avatar
                    src={collection?.coverUrl}
                    name={collectionGeneralInfo?.name || collection?.name}
                    borderRadius={'50%'}
                    pointerEvents={'none'}
                    objectFit={'cover'}
                    w={'65px'}
                    h={'65px'}
                  />
                    <Flex direction={'column'} alignItems={'flex-start'}>
                      <Text
                        fontFamily={'"Sharp Grotesk SemiBold",sans-serif'}
                        fontSize={'20px'}
                        lineHeight={'130%'}
                        color={'#fff'}
                        ml={'20px'}
                    >
                        {collectionGeneralInfo?.name || collection.name}
                    </Text>
                    <Link
                      href={`${process.env.REACT_APP_ETHERSCAN_URL}/address/${collectionGeneralInfo?.contractAddress || collection?.address}`}
                      isExternal
                      padding={'4px 10px'}
                      ml={'18px'}
                      mt={'10px'}
                      borderRadius={'20px'}
                      backgroundColor={'#000'}
                      opacity={'0.6'}
                      _hover={{ textDecoration: 'none' }}
                    >
                        <Text color={'#4D66EB'} fontSize={'12px'} fontWeight={600}>{shortenEthereumAddress(collectionGeneralInfo?.contractAddress || collection?.address)}</Text>
                    </Link>
                    </Flex>
                    <SocialLinks
                      instagramLink={collection?.instagramLink || ''}
                      siteLink={collection?.siteLink || ''}
                      mediumLink={collection?.mediumLink || ''}
                      discordLink={collection?.discordLink || ''}
                      telegramLink={collection?.telegramLink || ''}
                      twitterLink=""
                    />
                    <Box>
                      {isAuthenticated && (address?.toLowerCase() === collectionOwner || process.env.REACT_APP_COLLECTION_EDITOR?.toLowerCase() === address) && ( //
                        <Button className="light-button" onClick={handleEdit}>
                          <span style={{ marginRight: '5px'}}>Edit</span>
                          <EditIcon />
                        </Button>
                      )}
                    </Box>
                </Flex>
                <Box sx={{
                  bgColor: '#e5e5e5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                }}>
                  <CollectionStatistics nftsCount={totalNftsCount} ownersCount={collectionGeneralInfo?.owners} floorPrice={collectionOrderBookData?.floorPrice} volumeTraded={collectionOrderBookData?.volumeTraded} />
                </Box>
              </Box>
            </Flex>
            <Flex sx={{
              // maxWidth: '1110px',
              margin: '0 auto',
              flexDirection: 'column',
            }}>
              <Tabs mt={'60px'}>
                <TabList maxW={'1110px'} m={'auto'}>
                  <Tab>Items</Tab>
                  <Tab>Description</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    <Box
                      ref={filtersRef}
                      sx={{
                        bg: (intersection?.intersectionRect.top ?? 1) === 0 ? 'white' : 'transparent',
                        pos: 'sticky',
                        top: '-1px',
                        mb: '40px',
                        zIndex: 20,
                        '.search--sort--filters--section': {
                          mb: 0,
                        },
                      }}
                    >
                      <SearchFilters />
                    </Box>
                    {/* Orders NFTs based on search filters */}
                    {hasOrderBookFilters ? (
                      hasOrders ? (
                        <div className="mynfts__page">
                          <div className="container mynfts__page__body">
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
                              {(orders?.pages ?? []).map((page) => {
                                return page.data.map(({ order, NFTs }) => {
                                  if (!NFTs.length) {
                                    return null;
                                  }
                                  return (
                                    <NftItem
                                      order={order}
                                      key={order.id}
                                      NFT={NFTs[0]}
                                      collection={`${NFTs[0]._collectionAddress}`}
                                      orderEnd={order.end}
                                      renderContent={({ NFT, collection, creator, owner, bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken, order: orderData }) => (
                                        <NFTItemContentWithPrice
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
                                })
                              })}
                            </SimpleGrid>

                            {!waitingOrders && hasMoreOrders && (
                              <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextOrders()}>Load more</Button>
                            )}

                          </div>
                        </div>
                      ) : (!waitingOrders && <NoNFTsFound />)
                    ) : (
                      // Collection NFTs
                      hasCollectionNFTs ? (
                        <div className="mynfts__page">
                          <div className="container mynfts__page__body">
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
                              {(collectionNFTs?.pages ?? []).map((page) => {
                                return page.data.map((NFT) => (
                                  <NftItem
                                    key={NFT.id}
                                    NFT={NFT}
                                    collection={`${NFT._collectionAddress}`}
                                    renderContent={({ NFT, collection, creator, owner, bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken, order: orderData }) => (
                                      <NFTItemContentWithPrice
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
                                ))
                              })}
                            </SimpleGrid>

                            {!waitingCollectionNFTs && hasMoreCollectionNFTs && (
                              <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextCollectionNFTs()}>Load more</Button>
                            )}

                                {
                                  ((hasOrderBookFilters && waitingOrders) || (!hasOrderBookFilters && waitingCollectionNFTs)) && (
                                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'} mt={10}>
                                      <NftCardSkeleton />
                                      <NftCardSkeleton />
                                      <NftCardSkeleton />
                                      <NftCardSkeleton />
                                    </SimpleGrid>
                                  )
                                }
                          </div>
                        </div>
                      ) : (!waitingCollectionNFTs && <NoNFTsFound />)
                    )}

                    <div className="mynfts__page">
                      <div className="container mynfts__page__body">
                        {
                          ((hasOrderBookFilters && waitingOrders) || (!hasOrderBookFilters && waitingCollectionNFTs)) && (
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'} mt={10}>
                              <NftCardSkeleton />
                              <NftCardSkeleton />
                              <NftCardSkeleton />
                              <NftCardSkeleton />
                            </SimpleGrid>
                          )
                        }
                      </div>
                    </div>

                  </TabPanel>
                  <TabPanel px={0}>
                    {collection.description
                      ? (
                        <div className="container mynfts__page__body">
                          <Box sx={{
                            whiteSpace: 'break-spaces'
                          }}>
                            {collection.description}
                          </Box>
                        </div>
                      )
                      : (<NoDescriptionFound />)
                    }
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  )
};
