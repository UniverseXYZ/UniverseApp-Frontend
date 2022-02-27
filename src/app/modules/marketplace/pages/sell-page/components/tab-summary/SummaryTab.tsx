import { Box, Button, Center, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { useUpdate } from 'react-use';
import { useParams } from 'react-router-dom';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import BundleWhiteIcon from '../../../../../../../assets/images/marketplace/v2/bundle-white.svg';
import CheckBlackIcon from '../../../../../../../assets/images/check-black.svg';

import { Status, Status as PostingPopupStatus } from './compoents/posting-popup/enums';
import { useMarketplaceSellData } from '../../hooks';
import { Fee, PostingPopup } from './compoents';
import { fees, totalFee } from './constants';
import { SellAmountType, SellMethod } from '../../enums';
import { IFixedListingForm } from '../../types';
import { TokenTicker } from '../../../../../../enums';
import { TokenIcon } from '../../../../../../components';
import {
  isNFTAssetAudio,
  isNFTAssetImage,
  isNFTAssetVideo,
  mapBackendNft,
  mapBackendUser,
} from '../../../../../nft';
import { NFTAssetAudio, NFTAssetImage, NFTAssetVideo } from '../../../../../nft/pages/nft-page/components';
import * as styles from './styles';
import { ICollection, INFT, INFTBackend, NFTStandard } from '../../../../../nft/types';
import { useMyNftsContext } from '../../../../../../../contexts/MyNFTsContext';
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { SwiperArrowButton } from '../../../../../../components/swiper-arrow-button';
import Contracts from '../../../../../../../contracts/contracts.json';
import { Contract, BigNumber } from 'ethers';
import { fetchRoyalties, fetchDAOFee } from '../../../../../../../utils/api/royaltyRegistry';
import { default as dayjs } from 'dayjs';
import { default as UTC } from 'dayjs/plugin/utc';
import { CollectionPageLoader } from '../../../../../../../containers/collection/CollectionPageLoader';
import './SummaryTab.scss';

dayjs.extend(UTC);

interface IApproveCollection {
  approved: boolean;
  tokenIds: string[];
  standard: NFTStandard;
  collection: ICollection;
}

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

export const SummaryTab = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { signer, address} = useAuthContext() as any;
  const { myNFTs } = useMyNftsContext() as any;
  const { loggedInArtist } = useAuthContext();
  const params = useParams<{ collectionAddress: string; tokenId: string; }>();

  const [activeIndex, setActiveIndex] = useState(0);
  const [collections, setCollections] = useState<IApproveCollection[]>([]);
  const [creatorRoyalties, setCreatorRoyalties] = useState(0);
  const [collectionRoyalties, setCollectionRoyalties] = useState(0);
  const [daoFee, setDaoFee] = useState(0);
  const [collectionIsAppovedForAll, setCollectionIsApprovedForAll] = useState(false);
  const [totalFees, setTotalFees] = useState(0);
  const [isApproving, setIsApproving] = useState(false);

  const { nft, isPosted, form, sellMethod, amountType, goBack } = useMarketplaceSellData();

  const update = useUpdate();

  const [postingPopupStatus, setPostingPopupStatus] = useState<PostingPopupStatus>(PostingPopupStatus.HIDDEN);

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

  const handleApproveCollection = useCallback(async ({ collection, standard, tokenIds }: IApproveCollection) => {
    const contract = new Contract(`${collection.address}`, contractsData[standard].abi, signer);

    const approveTx = await contract.setApprovalForAll(process.env.REACT_APP_MARKETPLACE_CONTRACT, true)
    setIsApproving(true);

    await approveTx.wait();

    setCollectionIsApprovedForAll(true);
    setIsApproving(false);

    setCollections(collections.map((collectionItem) => {
      return collectionItem.collection.address !== collection.address
        ? collectionItem
        : { ...collectionItem, approved: true };
    }))
  }, [collections]);

  const [price, ticker] = useMemo<[number, TokenTicker]>(() => {
    switch (sellMethod) {
      case SellMethod.FIXED: return [
        +(form.values as IFixedListingForm).price,
        (form.values as IFixedListingForm).priceCurrency as TokenTicker, // TODO: remove as
      ];
    }
    return [0, TokenTicker.ETH];
  }, [form.values]);

  const totalPrice = useMemo(() => {
    return parseFloat((price - (price * totalFees / 100)).toFixed(6));
  }, [form.values, price, totalFees]);

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
           setCreatorRoyalties(+nftRoyalties[0].amount / 100 || 0)
          }
    
          // Index 1 is collection royalties
          if (royalties.length && royalties[1].length) {
            const collectionRoyalties = royalties[1].map((royalty: [string, BigNumber]) => ({
              address: royalty[0],
              amount: BigNumber.from(royalty[1]),
            }));
           setCollectionRoyalties(+collectionRoyalties[0].amount / 100 || 0)
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
      const contract = new Contract(`${nft.collection?.address}`, contractsData[nft.standard].abi, signer);
      const isApprovedForAll = await contract.isApprovedForAll(address, process.env.REACT_APP_MARKETPLACE_CONTRACT);
      setCollectionIsApprovedForAll(isApprovedForAll);
  } 

  useEffect(() => {
    setTotalFees(creatorRoyalties + collectionRoyalties + daoFee);
  }, [creatorRoyalties, collectionRoyalties, daoFee])

  useEffect(() => {
    fetchRoyaltyRegistry();
  }, [params.collectionAddress, params.tokenId, signer])

  useEffect(() => {
    fetchIsApprovedForAll();
  }, [collectionIsAppovedForAll])

  useEffect(() => {
    if (isPosted) {
      setPostingPopupStatus(Status.SUCCESS);
    }
  }, [isPosted]);

  useEffect(() => {
    const collections = Object.values(
      NFTsForPreview.reduce<Record<string, IApproveCollection>>((collectionsMap, NFT) => {
        if (NFT.collection?.address) {
          if (!collectionsMap.hasOwnProperty(NFT.collection.address)) {
            collectionsMap[NFT.collection.address] = {
              approved: collectionIsAppovedForAll,
              standard: NFT.standard,
              tokenIds: [],
              collection: NFT.collection,
            };
          }

          collectionsMap[NFT.collection.address].tokenIds.push(NFT.tokenId);
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
              {isNFTAssetImage(nft.artworkType) &&
                <NFTAssetImage
                  image={nft.originalUrl}
                  h={'var(--image-size)'}
                  w={'var(--image-size)'}
                  allowFullscreen={false}
                />
              }
              {isNFTAssetVideo(nft.artworkType) &&
                <NFTAssetVideo
                  video={nft.originalUrl}
                  h={'var(--image-size)'}
                  w={'var(--image-size)'}
                />
              }
              {isNFTAssetAudio(nft.artworkType) &&
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
                      {isNFTAssetImage(_NFT.artworkType) &&
                        <NFTAssetImage
                          image={_NFT.originalUrl}
                          h={'var(--image-size)'}
                          w={'var(--image-size)'}
                          allowFullscreen={false}
                        />
                      }
                      {isNFTAssetVideo(_NFT.artworkType) &&
                        <NFTAssetVideo
                          video={_NFT.originalUrl}
                          h={'var(--image-size)'}
                          w={'var(--image-size)'}
                        />
                      }
                      {isNFTAssetAudio(_NFT.artworkType) &&
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
        <Flex {...styles.TextContainerStyle}>
          <Center flexDir={'column'} alignItems={'flex-start'} w={'100%'}>
            <Heading as={'h4'}>Listing</Heading>
            <Text mb={'30px'} color={'#00000066'}>
              Your bundle will be listed for
              <TokenIcon ticker={ticker} size={20} />
              <Box as={'strong'} color={'black'}>{price}</Box>
            </Text>

            <Heading as={'h4'}>Fees</Heading>
            <Text mb={'20px'} color={'#00000066'}>
              Listing is free! At the time of the sale, the following fees will be deducted.
            </Text>

            <Box layerStyle={'grey'} {...styles.FeesContainerStyle}>
              <Fee name={'To Universe'} amount={daoFee} />
              <Fee name={'To Collection'} amount={collectionRoyalties} />
              <Fee name={'To Creator'} amount={creatorRoyalties} />
              <Fee name={'Total'} amount={totalFees} />
            </Box>

            <Heading as={'h4'} mb={'0 !important'}>
              You will receive:
              <TokenIcon ticker={ticker} size={24} />
              {totalPrice}
            </Heading>
          </Center>
        </Flex>
      </Flex>
      <Box {...styles.MainContainerStyle} mt={'30px'}>
        <Heading as={'h4'}>Approve collections for sale</Heading>
        <Text color={'#00000066'}>To get set up for listings for the first time, you must approve these collections for sale.</Text>

        <SimpleGrid mt={'30px'} columns={3} spacing={'20px'}>
          {collections.map((collectionItem, i) => (
            <Flex
              key={i}
              sx={{
                alignItems: 'center',
                bg: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                padding: '30px',
              }}
            >
              <Image src={collectionItem.collection?.coverUrl} borderRadius={'50%'} objectFit={'cover'} h={'80px'} w={'80px'} />
              <Box ml={'20px'} className="approve-section">
                <Heading as={'h4'}>{collectionItem.collection?.name}</Heading>
                {isApproving && <CollectionPageLoader />}
                
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
      <Box textAlign={'right'} mb={'50px'}>
        <Button mr={'10px'} variant={'outline'} onClick={goBack}>Back</Button>
        <Button boxShadow={'xl'} disabled={!isAllCollectionApproved} onClick={handleSave}>Post your listing</Button>
      </Box>
      <PostingPopup
        status={postingPopupStatus}
        onClose={() => setPostingPopupStatus(PostingPopupStatus.HIDDEN)}
      />
    </>
  );
};
