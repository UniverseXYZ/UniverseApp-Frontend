import {
    Avatar,
    Box,
    Button,
    Flex,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import SocialLinks from '../../../../../../../../src/components/collection/SocialLinks';
import { useCollectionPageData } from '../../CollectionPage.context';
import {
  NftItem, NFTItemContentWithPrice, NoNFTsFound,
} from '../../../../components';
import { CollectionPageLoader } from '../../../../../../../containers/collection/CollectionPageLoader';
import { useErrorContext } from '../../../../../../../contexts/ErrorContext';
import { CollectionStatistics } from './components/index';
import NotFound from '../../../../../../../components/notFound/NotFound';
import BGImage from '../../../../../../../assets/images/v2/stone_bg.jpg';
import Cover from '../../../../../../../components/collection/Cover';
import Tabs from '../../../../../../../components/tabs/Tabs';
import Description from '../../../../../../../components/collection/Description.jsx';
import EmptyData from '../../../../../../../components/collection/EmptyData.jsx';
import { OrderAssetClass } from '../../../../enums';
import { NoDescriptionFound } from '../../../../components/no-description-found';
import { useFiltersContext } from '../../../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { SearchFilters } from '../../../../../account/pages/my-nfts-page/components/search-filters';

const PER_PAGE = 8;

export const CollectionInfo = () => {
  const tabs = ['Items', 'Description'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const { collection, collectionAddress, owners, collectionAdditionalData } = useCollectionPageData();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext() as any;

  const scrollContainer = useRef(null);

  const {
    setCollectionAddress,
    setShowSaleTypeFilters,
    setShowPriceRangeFilters,
    collectionNFTs,
    fetchNextCollectionNFTs,
    hasMoreCollectionNFTs,
    isFetchingCollectionNFTs,
    isLoadingCollectionNFTs,
    isIdleCollectionNFTs,
  } = useFiltersContext();

  useEffect(() => {
    setCollectionAddress(collectionAddress);
    setShowSaleTypeFilters(true);
    setShowPriceRangeFilters(true);
  }, [collectionAddress])

  return (
      <>
        {isFetchingCollectionNFTs && !collection ? (
          <div className='loader-wrapper'>
            <CollectionPageLoader />
          </div>
        ) : !isFetchingCollectionNFTs && !collection ? (
          <NotFound />
        ) : (
          <Box sx={{
              bg: `url(${BGImage}) center / cover`
            }}>
            <Cover selectedCollection={collection}/>
            <Box sx={{
                position: 'relative',
                padding: '0 60px 80px',
            }}>
                <Flex sx={{
                    maxWidth: '1110px',
                    margin: '-170px auto 0px'
                }}>
                    <Box sx={{
                      width: '100%',
                    }}>
                        <Flex sx={{
                          alignItems: 'center',
                          mb: '30px',
                        }}>
                            <Avatar
                                w={'65px'}
                                h={'65px'}
                                borderRadius={'50%'}
                                pointerEvents={'none'}
                                objectFit={'cover'}
                                src={collection.coverUrl}
                            />
                            <Text
                                fontFamily={'"Sharp Grotesk SemiBold",sans-serif'}
                                fontSize={'20px'}
                                lineHeight={'130%'}
                                textAlign={'center'}
                                color={'#fff'}
                                ml={'20px'}
                            >
                                {collection.name}
                            </Text>
                            <SocialLinks
                                instagramLink={collection?.instagramLink || ''}
                                siteLink={collection?.siteLink || ''}
                                mediumLink={collection?.mediumLink || ''}
                                discordLink={collection?.discordLink || ''}
                                telegramLink={collection?.telegramLink || ''}
                                twitterLink=""
                            />
                        </Flex>
                        <Box sx={{
                          bgColor: '#e5e5e5',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          boxSizing: 'border-box',
                          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                        }}>
                        <CollectionStatistics nftsCount={collectionNFTs?.pages?.length && collectionNFTs.pages[0].total} ownersCount={owners?.owners} floorPrice={collectionAdditionalData?.floorPrice} volumeTraded={collectionAdditionalData?.volumeTraded} />
                        </Box>
                    </Box>
                </Flex>
                <Flex sx={{
                    maxWidth: '1110px',
                    margin: '0 auto',
                    flexDirection: 'column',
                  }}>
                  <Box>
                    <Tabs
                      scrollContainer={scrollContainer}
                      items={tabs.map((tab, index) => ({
                        name: tab,
                        active: selectedTabIndex === index,
                        handler: setSelectedTabIndex.bind(this, index),
                      }))}
                    />
                  </Box>
                  <Box>
                    <SearchFilters />
                  </Box>
                  <Box>
                    {selectedTabIndex === 0 ? (
                      <>
                        {collectionNFTs?.pages?.length && collectionNFTs.pages[0].data?.length ? (
                          <div className="mynfts__page">
                            <div className="container mynfts__page__body">
                              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
                                {(collectionNFTs?.pages ?? []).map((page) => {
                                  return page.data.map((NFT) => (
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
                                  ))
                                })}
                              </SimpleGrid>
                              {isFetchingCollectionNFTs &&
                                <Box sx={{
                                  mt: '50px'
                                }}>
                                  <CollectionPageLoader />
                                </Box>}
                              {!isFetchingCollectionNFTs && hasMoreCollectionNFTs && (
                                <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextCollectionNFTs()}>Load more</Button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <NoNFTsFound />
                        )}
                      </>
                      ) : selectedTabIndex === 1 ? (
                        <>
                          {collection.description ? (
                            <Description selectedCollection={collection}/>
                          ) : (
                            <NoDescriptionFound />
                          )}
                        </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Flex>
            </Box>
          </Box>
        )}
    </>
  )
};
