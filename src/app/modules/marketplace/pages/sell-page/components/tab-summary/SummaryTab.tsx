import { Box, Button, Flex, Heading, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useUpdate } from 'react-use';
import { default as dayjs } from 'dayjs';
import { default as UTC } from 'dayjs/plugin/utc';
import { BigNumber, Contract } from 'ethers';

// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
import BundleWhiteIcon from '../../../../../../../assets/images/marketplace/v2/bundle-white.svg';
import CheckBlackIcon from '../../../../../../../assets/images/check-black.svg';

import { Status, Status as PostingPopupStatus } from './compoents/posting-popup/enums';
import { useMarketplaceSellData } from '../../hooks';
import { FeeItem, Fees, PostingPopup } from './compoents';
import { SellAmountType, SellMethod } from '../../enums';
import { IFixedListingForm } from '../../types';
import { TokenTicker } from '../../../../../../enums';
import { TokenIcon } from '../../../../../../components';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo, mapBackendNft, mapBackendUser } from '../../../../../nft';
import { NFTAssetAudio, NFTAssetImage, NFTAssetVideo } from '../../../../../nft/pages/nft-page/components';
import * as styles from './styles';
import { INFT, INFTBackend, NFTStandard } from '../../../../../nft/types';
import { ICollection } from '../../../../../collection/types';
import { SwiperArrowButton } from '../../../../../../components/swiper-arrow-button';
import Contracts from '../../../../../../../contracts/contracts.json';
import { fetchDAOFee, fetchRoyalties } from '../../../../../../../utils/api/royaltyRegistry';
import { CollectionPageLoader } from '../../../../../../../containers/collection/CollectionPageLoader';
import { getCollectionBackgroundColor } from '../../../../../../../utils/helpers';
import { shortenEthereumAddress } from '../../../../../../../utils/helpers/format';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../../../../../../stores/authStore';
import { useMyNftsStore } from 'src/stores/myNftsStore';
// import './SummaryTab.scss';

dayjs.extend(UTC);

interface IApproveCollection {
  approved: boolean;
  tokenIds: string[];
  standard: NFTStandard;
  collection: ICollection;
  address: string;
}

const NETWORK_CHAIN_ID = process.env.REACT_APP_NETWORK_CHAIN_ID as "1" | "4";
const { contracts: contractsData } = Contracts[NETWORK_CHAIN_ID];

export const SummaryTab = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { signer, address, loggedInArtist} = useAuthStore(state => ({signer: state.signer, address: state.address, loggedInArtist: state.loggedInArtist}))
  const myNFTs = useMyNftsStore(s => s.myNFTs)
  // const params = useParams<{ collectionAddress: string; tokenId: string; }>();
  const router = useRouter();
  const params = router.query as { collectionAddress: string; tokenId: string; };

  const [activeIndex, setActiveIndex] = useState(0);
  const [collections, setCollections] = useState<IApproveCollection[]>([]);
  const [creatorRoyalties, setCreatorRoyalties] = useState(0);
  const [collectionRoyalties, setCollectionRoyalties] = useState(0);
  const [daoFee, setDaoFee] = useState(0);
  const [collectionIsAppovedForAll, setCollectionIsApprovedForAll] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [totalNetPrice, setTotalNetPrice] = useState(0);

  const { nft, isPosted, form, sellMethod, amountType, goBack, postingPopupStatus, setPostingPopupStatus } = useMarketplaceSellData();

  const update = useUpdate();

  const handleSave = useCallback(() => {
    setPostingPopupStatus(PostingPopupStatus.PROCESSING)
    // @ts-ignore
    let start = form.values.startDate;
    // @ts-ignore
    let end = form.values.endDate;
    if(start) {
      start = dayjs(start).utc().toDate();
    }
    if(end) {
      dayjs(end).utc().toDate();
    }
     // @ts-ignore
    form.values.startDate = start;
     // @ts-ignore
    form.values.endDate = end;
    form.submitForm();
  }, [nft]);

  const handleApproveCollection = useCallback(async ({ standard, address }: IApproveCollection) => {
    if(!signer) {
      return;
    }
    
    const contract = new Contract(address, contractsData[standard].abi, signer);

    const approveTx = await contract.setApprovalForAll(process.env.REACT_APP_MARKETPLACE_CONTRACT, true)
    setIsApproving(true);

    await approveTx.wait();

    setCollectionIsApprovedForAll(true);
    setIsApproving(false);

    setCollections(collections.map((collectionItem) => {
      return collectionItem.address !== address
        ? collectionItem
        : { ...collectionItem, approved: true };
    }))
  }, [collections]);

  const [price, ticker] = useMemo<[number, TokenTicker]>(() => {
    switch (sellMethod) {
      case SellMethod.FIXED:
        const value = form.values as IFixedListingForm;
        return [+value.price, value.priceCurrency as TokenTicker] // TODO: remove as
    }
    return [0, TokenTicker.ETH];
  }, [form.values]);

  const grossTotalPrice = useMemo(() => {
    return form.values.amount > 1 ? form.values.amount * price : price;
  }, [form.values, price]);

  const NFTsForPreview = useMemo<INFT[]>(() => {
    switch(amountType) {
      case SellAmountType.BUNDLE: {
        const selectedIds = [`${nft.tokenId}`, ...form.values.bundleSelectedNFTs.map((key) => key.split(':')[0])];
        return selectedIds.reduce<INFT[]>((acc, id) => {
          const _myNFT = (myNFTs as INFTBackend[]).find((_myNFT) => `${_myNFT.id}` === id);
          if (_myNFT) {
            const myNFT = mapBackendNft(_myNFT);
            myNFT.owner = mapBackendUser(loggedInArtist);
            acc.push(myNFT);
          }
          return acc;
        }, []);
      }
      case SellAmountType.SINGLE: {
        return [nft];
      }
    }
  }, [myNFTs, nft, form.values]);

  const isAllCollectionApproved = useMemo(() => {
    return collections.every((collectionItem) => collectionItem.approved);
  }, [collections]);

    const fetchRoyaltyRegistry = async () => {
      if (params.collectionAddress && params.tokenId && signer) {
        try {
          const [ ,royalties] = await fetchRoyalties(
            params.collectionAddress,
            signer,
            params.tokenId
          );
    
          // Index 0 is nft royalties
          if (royalties.length && royalties[0].length) {
            const nftRoyalties = royalties[0].map((royalty: [string, BigNumber]) => ({
              address: royalty[0],
              amount: BigNumber.from(royalty[1]),
            }));
            const total = nftRoyalties.reduce((total: number, obj: any) => +obj.amount + total, 0);
            setCreatorRoyalties(total / 100 || 0);
          }
    
          // Index 1 is collection royalties
          if (royalties.length && royalties[1].length) {
            const collectionRoyalties = royalties[1].map((royalty: [string, BigNumber]) => ({
              address: royalty[0],
              amount: BigNumber.from(royalty[1]),
            }));
            const total = collectionRoyalties.reduce((total: number, obj: any) => +obj.amount + total, 0);
            setCollectionRoyalties(total / 100 || 0);
          }
        } catch (err) {
          console.log(err);
        }

        try {
          const [ ,_daoFee] = await fetchDAOFee(signer);
          setDaoFee(+BigNumber.from(_daoFee) / 100 || 0);

        } catch (err) {
          console.log(err);
        }

      }
  };

  const fetchIsApprovedForAll = async () => {
    if (params.collectionAddress && params.tokenId && signer) {
      const contract = new Contract(params.collectionAddress, contractsData[nft.standard].abi, signer);
      const isApprovedForAll = await contract.isApprovedForAll(address, process.env.REACT_APP_MARKETPLACE_CONTRACT);
      setCollectionIsApprovedForAll(isApprovedForAll);
    }
  }

  useEffect(() => {
    fetchRoyaltyRegistry();
  }, [params.collectionAddress, params.tokenId, signer])

  useEffect(() => {
    fetchIsApprovedForAll();
  }, [params.collectionAddress, params.tokenId, signer])

  useEffect(() => {
    if (isPosted) {
      setPostingPopupStatus(Status.SUCCESS);
    }
  }, [isPosted]);

  useEffect(() => {
    const collections = Object.values(
      NFTsForPreview.reduce<Record<string, IApproveCollection>>((collectionsMap, NFT) => {
        if (NFT._collectionAddress) {
          if (!collectionsMap.hasOwnProperty(NFT._collectionAddress)) {
            collectionsMap[NFT._collectionAddress] = {
              approved: collectionIsAppovedForAll,
              standard: NFT.standard,
              tokenIds: [],
              collection: NFT.collection || {} as ICollection,
              address: NFT._collectionAddress
            };
          }

          collectionsMap[NFT._collectionAddress].tokenIds.push(NFT.tokenId);
        }
        return collectionsMap;
      }, {})
    );

    setCollections(collections);
  }, [NFTsForPreview, collectionIsAppovedForAll]);

  useEffect(() => {
    update();
  }, [])

  return (
    <>
      <Flex {...styles.MainContainerStyle}>
        <Box {...styles.ImageContainerStyle}>
          {amountType === 'single' && (
            <>
              {
                isNFTAssetImage(nft.artworkTypes) &&
                <NFTAssetImage
                  image={nft.originalUrl}
                  alt={nft.name}
                  containerProps={{
                    flex: 1,
                    w: 'var(--image-size)',
                  }}
                  allowFullscreen={false}
                />
              ||
              isNFTAssetVideo(nft.artworkTypes) &&
                <NFTAssetVideo
                  video={nft.originalUrl}
                  h={'var(--image-size)'}
                  w={'var(--image-size)'}
                />
              ||
              isNFTAssetAudio(nft.artworkTypes) &&
                <NFTAssetAudio
                  audio={nft.originalUrl}
                  h={'var(--image-size)'}
                  w={'var(--image-size)'}
                  allowFullscreen={false}
                />
              }
            </>
          )}

          {amountType === 'bundle' && (
            <Box w={'var(--image-size)'} pos={'relative'}>
              <Box {...styles.BundleLabelStyle}>
                <Image src={BundleWhiteIcon} display={'inline-block'} mr={'6px'} mt={'-3px'} w={'20px'} />
                {activeIndex + 1} of {NFTsForPreview.length}
              </Box>
              <SwiperArrowButton ref={prevRef} dir={'left'} left={'15px'} />
              <SwiperArrowButton ref={nextRef} dir={'right'} right={'15px'} />
              {prevRef?.current && nextRef?.current && (
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  loop={true}
                  onRealIndexChange={(s) => setActiveIndex(s.realIndex)}
                >
                  {NFTsForPreview.map((_NFT, i) => (
                    <SwiperSlide key={i}>
                      {isNFTAssetImage(_NFT.artworkTypes) &&
                        <NFTAssetImage
                          image={_NFT.originalUrl}
                          alt={nft.name}
                          containerProps={{ boxSize: 'var(--image-size)' }}
                          allowFullscreen={false}
                        />
                      }
                      {isNFTAssetVideo(_NFT.artworkTypes) &&
                        <NFTAssetVideo
                          video={_NFT.originalUrl}
                          h={'var(--image-size)'}
                          w={'var(--image-size)'}
                        />
                      }
                      {isNFTAssetAudio(_NFT.artworkTypes) &&
                        <NFTAssetAudio
                          audio={_NFT.originalUrl}
                          h={'var(--image-size)'}
                          w={'var(--image-size)'}
                          allowFullscreen={false}
                        />
                      }
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </Box>
          )}
        </Box>
        <Box {...styles.TextContainerStyle}>
          <Heading as={'h4'}>Listing</Heading>

          <HStack spacing={'4px'} color={'#00000099'} mb={'30px'}>
            {nft.standard === NFTStandard.ERC1155 ? (
              <>
                <Text>{form.values.amount} of your items will be listed for</Text>
                <TokenIcon ticker={ticker} size={20} />
                <Text color={"black"}><strong>{price}</strong></Text>
                <Text>each</Text>
              </>
            ) : (
              <>
                <Text>Your NFT will be listed for</Text>
                <TokenIcon ticker={ticker} size={20} />
                <Text color={"black"}><strong>{price}</strong></Text>
              </>
            )}
          </HStack>

          <Heading as={'h4'}>Fees</Heading>
          <Text mb={'20px'} color={'#00000099'}>
            Listing is free! At the time of the sale, the following fees will be deducted.
          </Text>

          <Fees
            price={grossTotalPrice}
            ticker={ticker}
            onTotalFee={(totalFee) => setTotalNetPrice(grossTotalPrice - totalFee)}
          >
            <FeeItem name={'Creator'} percent={creatorRoyalties} />
            <FeeItem name={'Collection'} percent={collectionRoyalties} />
            <FeeItem name={'Universe'} percent={daoFee} />
          </Fees>

          <Heading as={'h4'} mb={'0 !important'} display={'inline-flex'} gap={'4px'}>
            You will receive:
            <TokenIcon ticker={ticker} size={24} />
            {totalNetPrice}
          </Heading>
        </Box>
      </Flex>
      <Box {...styles.MainContainerStyle} mt={'30px'}>
        <Heading as={'h4'}>Approve collections for sale</Heading>
        <Text color={'#00000066'}>To get set up for listings for the first time, you must approve these collections for sale.</Text>

        <SimpleGrid mt={'30px'} columns={[1, null, 2, 3]} spacing={'20px'}>
          {collections.map((collectionItem, i) => (
            <Flex
              key={i}
              sx={{
                alignItems: 'center',
                bg: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                padding: ['10px', '30px', '20px', null, '30px'],
              }}
            >
              <Box
                bg={
                  collectionItem.collection?.coverUrl
                    ? `url(${collectionItem.collection?.coverUrl}) center / cover`
                    // This is temporary fix so the color doesn't flicker on rerender
                    : getCollectionBackgroundColor({id: nft.tokenId, address: nft._collectionAddress})
                }
                borderRadius={'50%'}
                objectFit={'cover'}
                h={{ base: '80px', md: '80px', lg: '60px', xl: '80px',  }}
                w={{ base: '80px', md: '80px', lg: '60px', xl: '80px',  }}
                maxW={{ base: '80px', md: '80px', lg: '60px', xl: '80px',  }}
                minW={{ base: '80px', md: '80px', lg: '60px', xl: '80px',  }}
                m={'auto'}
              />
              <Box className="approve-section" ml={'20px'} flex={1}>
                <Heading as={'h4'} wordBreak='break-word' >{collectionItem.collection?.name || shortenEthereumAddress(nft._collectionAddress)}</Heading>
                {isApproving && (
                  <Box sx={{
                    transform: 'scale(0.6)'
                  }}>
                    <CollectionPageLoader />
                  </Box>
                )}
                
                {!collectionItem.approved && !isApproving &&
                  <Button onClick={() => handleApproveCollection(collectionItem)}>Approve</Button>
                }
                
                {collectionItem.approved && !isApproving &&
                   <Button variant={'simpleOutline'} disabled={true} rightIcon={<Image src={CheckBlackIcon} />}>Approved</Button>
                }
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
      {!isPosted && (
        <Box textAlign={'right'} mb={'50px'}>
          <Button mr={'10px'} variant={'outline'} onClick={goBack}>Back</Button>
          <Button boxShadow={'xl'} disabled={!isAllCollectionApproved} onClick={handleSave}>Post your listing</Button>
        </Box>
      )}
      <PostingPopup
        status={postingPopupStatus}
        onClose={() => setPostingPopupStatus(PostingPopupStatus.HIDDEN)}
      />
    </>
  );
};
