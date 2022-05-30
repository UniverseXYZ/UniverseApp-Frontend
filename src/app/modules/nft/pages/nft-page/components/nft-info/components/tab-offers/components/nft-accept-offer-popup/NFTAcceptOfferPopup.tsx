import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber as EthersBigNumber, Contract, Signer, utils } from 'ethers';
import BigNumber from 'bignumber.js';
import { useMutation, useQueryClient } from 'react-query';

import AudioNFTPreviewImage from '@assets/images/v2/audio-nft-preview.png';
import CheckIcon from '@assets/images/check-vector.svg';

import { AmountSelector, Loading, TokenIcon } from '@app/components';
import { NFTType } from './components';
import { AcceptState } from './enums';
import * as s from './NFTAcceptOfferPopup.styles';
import {
  INFT,
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
} from '@app/modules/nft/types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '@app/modules/nft';
import { getTokenByAddress } from '@app/constants';
import { FeeItem, Fees } from '@app/modules/marketplace/pages/sell-page/components/tab-summary/compoents';
import { getRoyaltiesFromRegistry } from '@legacy/marketplace/utils';
import { useTokenPrice } from '@app/hooks';
import { nftKeys, orderKeys } from '@app/utils/query-keys';
import { GetOrdersApi, GetNFTApi } from '@app/api';
import { OrderAssetClass } from '@app/modules/nft/enums';
import { useNFTPageData } from '../../../../../../NFTPage.context';
import Contracts from '../../../../../../../../../../../contracts/contracts.json';
import { NFTCustomError } from '../../../../../nft-custom-error/NFTCustomError';
import { useAuthStore } from '../../../../../../../../../../../stores/authStore';
import { useErrorStore } from '../../../../../../../../../../../stores/errorStore';

type IOfferOrder =
  | IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>
  | IOrder<IOrderAssetTypeERC20, IOrderAssetTypeBundleListing>;


interface INFTAcceptOfferPopupProps {
  NFT?: INFT;
  NFTs?: INFT[];
  order: IOfferOrder;
  isOpen: boolean;
  onClose: () => void;
}

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

export const NFTAcceptOfferPopup: React.FC<INFTAcceptOfferPopupProps> = (props) => {
  const { NFT, NFTs, order, isOpen, onClose } = props;

  const { address, signer } = useAuthStore(s => ({address: s.address, signer: s.signer}))

  const { setShowError, setErrorBody } = useErrorStore();

  type IPrepareMutationData = {
    hash: string;
    data: any;
  };

  const prepareMutation = useMutation<AxiosResponse<any>, AxiosError<any>, IPrepareMutationData>(({ hash, data }) => {
    return axios.post<any>(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}/prepare`, data);
  });

  const queryClient = useQueryClient();
  const { offers } = useNFTPageData();

  const [state, setState] = useState<AcceptState>(AcceptState.CHECKOUT);
  const [netFinalPrice, setNetFinalPrice] = useState(0);
  const [nftRoyalties, setNftRoyalties] = useState(0);
  const [collectionRoyalties, setCollectionRoyalties] = useState(0);
  const [daoFee, setDaoFee] = useState(0);
  const [isNFTAudio] = useState(false);
  const [amount, setAmount] = useState(1);

  // INDEXING
  const [fetchOrderCount, setFetchOrderCount] = useState(0);
  const [fetchNftCount, setFetchNftCount] = useState(0);
  const [isOrderIndexed, setIsOrderIndexed] = useState(false);
  const [isNftIndexed, setIsNftIndexed] = useState(false);
  const [newOffersInfo, setNewOffersInfo] = useState<IOfferOrder[]>([]);
  const [newNftInfo, setNewNftInfo] = useState<INFT | null>(null);
  const [nftInterval, setNftInterval] = useState<NodeJS.Timer>();
  const [orderInterval, setOrderInterval] = useState<NodeJS.Timer>();

  const token = useMemo(() => {
    return getTokenByAddress(order.make.assetType.contract);
  }, [order]);

  const tokenUSDPrice = useTokenPrice(token.ticker);

  const listingPrice = useMemo(() => {
    return Number(utils.formatUnits(order.make.value, token.decimals));
  }, [order, token]);

  const listingPriceUSD = useMemo(() => {
    return new BigNumber(tokenUSDPrice).multipliedBy(listingPrice).toFixed(2);
  }, [tokenUSDPrice, listingPrice]);

  const grossFinalPrice = useMemo(() => {
    return amount * listingPrice;
  }, [amount, listingPrice])

  const netFinalPriceUSD = useMemo(() => {
    return new BigNumber(tokenUSDPrice).multipliedBy(netFinalPrice).toFixed(2);
  }, [tokenUSDPrice, netFinalPrice]);

  const previewNFT = useMemo(() => {
    return NFT || (NFTs as INFT[])[0];
  }, [NFT, NFTs]);

  const isERC1155 = useMemo(() => {
    switch (order?.take?.assetType.assetClass) {
      case OrderAssetClass.ERC1155: return true;
      default: return false;
    }
  }, [order]);

  const handleAcceptClick = useCallback(async () => {
    try {
      if (!signer || !order) {
        return;
      }
      const contract = new Contract(`${NFT?._collectionAddress}`, contractsData[NFT?.standard].abi, signer);

      const isApprovedForAll = await contract.isApprovedForAll(address, process.env.REACT_APP_MARKETPLACE_CONTRACT);

      if (!isApprovedForAll) {
        setState(AcceptState.APPROVAL);
        const approveTx = await contract.setApprovalForAll(process.env.REACT_APP_MARKETPLACE_CONTRACT, true);
        await approveTx.wait();
      }

      const paymentToken = getTokenByAddress(order.make.assetType.contract);
      const paymentAmount = EthersBigNumber.from(+(order?.make?.value ?? 0) * amount);
      const tokenContract = new Contract(contractsData[paymentToken.contractName].address, contractsData[paymentToken.contractName].abi, signer);
      const balance = await tokenContract.balanceOf(order.maker);

      if (paymentAmount.gt(balance)) {
        setState(AcceptState.INSUFFICIENT_BALANCE);
        return;
      }

      setFetchOrderCount(0);
      setState(AcceptState.PROCESSING);

      const response = await prepareMutation.mutateAsync({
        hash: order.hash,
        data: {
          amount,
          maker: address,
        },
      });
      console.log('response', response);

      const { data, from, to, value } = response.data;

      await sendAcceptOfferTransaction(data, from, to, EthersBigNumber.from(value.hex));
      setState(AcceptState.INDEXING);
      // This polling mechanic is temporary until we have marketplace web sockets
      const orderIndexing = setInterval(async () => {
        const stringifiedOffers = offers?.orders?.map((offer) => offer.id).join('');
        setFetchOrderCount((count) => (count += 1));

        // TODO: [Bundle] add bundle support
        const singleListingOrder = order as IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>;

        const tokenId = singleListingOrder.take.assetType.tokenId?.toString();
        const collectionAddress = singleListingOrder.take.assetType.contract;

        const newOffers = await GetOrdersApi<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>({
          side: 0,
          tokenIds: tokenId,
          collection: collectionAddress,
        });

        // Change query information about order
        const newStringifiedoffers = newOffers?.orders?.map((offer) => offer.id).join('');
        if (stringifiedOffers !== newStringifiedoffers) {
          clearInterval(orderIndexing);
          setNewOffersInfo(newOffers.orders);
          setIsOrderIndexed(true);
        }
      }, 4000);

      const nftIndexing = setInterval(async () => {
        setFetchNftCount((count) => (count += 1));

        const tokenId = NFT?.tokenId || '';
        const collectionAddress = NFT?._collectionAddress || '';

        // Fetch order api until a diffrent response is returned
        const newNft = await GetNFTApi(collectionAddress, tokenId, false);

        // Change query information about order
        if (NFT?._ownerAddress?.toLowerCase() !== newNft._ownerAddress?.toLowerCase()) {
          clearInterval(nftIndexing);
          setNewNftInfo(newNft || null);
          setIsNftIndexed(true);
        }
      }, 10000);

      setOrderInterval(orderIndexing);
      setNftInterval(nftIndexing);
    } catch (err: any) {
      console.log(err);
      setState(AcceptState.CHECKOUT);

      // Code 4001 is user rejected transaction
      if (err?.code === 4001) {
        return;
      }

      // Check if error comes from api request and if the api has returned a meaningful messages
      if (prepareMutation.isError && !!prepareMutation.error?.response?.data.message) {
        setErrorBody(prepareMutation.error.response.data.message);
      }

      setShowError(true);
    }
  }, [order, address, signer, amount]);

  const sendAcceptOfferTransaction = async (data: string, from: string, to: string, value: EthersBigNumber) => {
    const sellTx = await (signer as Signer).sendTransaction({
      data,
      from,
      to,
      value,
    });

    return sellTx.wait();
  };

  const fetchNftRoyalties = async () => {
    if (NFT?._collectionAddress && NFT.tokenId) {
      try {
        const { nftRoyaltiesPercent, collectionRoyaltiesPercent, daoFee } = await getRoyaltiesFromRegistry(
          NFT._collectionAddress,
          NFT.tokenId,
          signer
        );
        setNftRoyalties(+nftRoyaltiesPercent / 100);
        setCollectionRoyalties(+collectionRoyaltiesPercent / 100);
        setDaoFee(+daoFee / 100);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchNftRoyalties();
  }, [NFT?._collectionAddress, NFT?.tokenId, signer]);

  useEffect(() => {
    setState(AcceptState.CHECKOUT);
  }, [isOpen, NFTs]);

  useEffect(() => {
    if (isOrderIndexed && isNftIndexed) {
      const tokenId = NFT?.tokenId || '';
      const collectionAddress = NFT?._collectionAddress || '';

      setState(AcceptState.CONGRATULATIONS);

      //TODO: Invalidate browse marketplace page if order has been loaded
      queryClient.refetchQueries(orderKeys.browseAny);

      // Invalidate listing because it's not active anymore
      queryClient.invalidateQueries(orderKeys.listing({ tokenId, collectionAddress }));
      queryClient.invalidateQueries(orderKeys.history({ tokenId, collectionAddress }));
      queryClient.setQueriesData(orderKeys.offers({ tokenId, collectionAddress }), newOffersInfo);

      // Invalidate nfts counter
      queryClient.invalidateQueries(nftKeys.fetchNftSummary(address));

      // Set fetched nft info or invalidate query
      if (newNftInfo) {
        queryClient.setQueryData(nftKeys.nftInfo({ tokenId, collectionAddress }), newNftInfo);
      } else {
        queryClient.invalidateQueries(nftKeys.nftInfo({ tokenId, collectionAddress }));
      }

      // Invalidate my nfts query in order to see the new nft
      queryClient.refetchQueries(nftKeys.userNfts(address));

      setNewNftInfo(null);
      setNewOffersInfo([]);
    }
  }, [isOrderIndexed, isNftIndexed]);

  // Clear intervals on unmount
  useEffect(() => {
    return () => {
      if (nftInterval) {
        clearInterval(nftInterval);
      }

      if (orderInterval) {
        clearInterval(orderInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (order && order.take) {
      setAmount(+order.take.value);
    }
  }, [order]);

  if (!order) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === AcceptState.CHECKOUT && (
            <>
              <Heading {...s.TitleStyle}>Accept this offer</Heading>

              <Flex {...s.TitlesContainerStyle}>
                <Text>Item</Text>
                <Text>Subtotal</Text>
              </Flex>

              <Flex {...s.NFTContainerStyle}>
                <Box pos={'relative'}>
                  <Box {...s.AssetStyle}>
                    {(isNFTAssetImage(previewNFT.artworkTypes) && <Image src={previewNFT.thumbnailUrl} />) ||
                      (isNFTAssetVideo(previewNFT.artworkTypes) && <video src={previewNFT.thumbnailUrl} />) ||
                      (isNFTAssetAudio(previewNFT.artworkTypes) && <Image src={AudioNFTPreviewImage} />)}
                  </Box>
                  {!!NFTs && <NFTType type={'bundle'} count={NFTs.length} />}
                </Box>
                <Box flex={1} p={'20px'}>
                  <Text>{NFT?.name}</Text>
                  <Text isTruncated title={NFT?._collectionAddress} {...s.CollectionNameStyle}>
                    {NFT?._collectionAddress}
                  </Text>
                </Box>
                <Box textAlign={'right'}>
                  <Text fontSize={'14px'}>
                    <TokenIcon ticker={token.ticker} display={'inline'} size={20} mr={'6px'} mt={'-3px'} />
                    {listingPrice}
                  </Text>
                  <Text {...s.PriceUSD}>${listingPriceUSD}</Text>
                </Box>
              </Flex>

              {isERC1155 && (
                <HStack spacing={0} justifyContent={'space-between'} sx={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  py: '24px',
                }}>
                  <Text fontWeight={600}>Custom amount</Text>
                  <AmountSelector
                    size={'sm'}
                    options={{
                      min: 1,
                      max: +(order?.take.value ?? 1),
                      value: amount,
                      onChange: (_, value) => setAmount(value)
                    }}
                  />
                </HStack>
              )}

              <Box py={'24px'}>
                <Text fontSize={'16px'} fontWeight={700} mb={'8px'}>Fees</Text>

                <Fees
                  fontSize={'14px'}
                  mb={0}
                  price={grossFinalPrice}
                  ticker={token.ticker}
                  onTotalFee={(totalFee) => setNetFinalPrice(grossFinalPrice - totalFee)}
                >
                  <FeeItem name={'Creator'} percent={nftRoyalties} />
                  <FeeItem name={'Collection'} percent={collectionRoyalties} />
                  <FeeItem name={'Universe'} percent={daoFee} />
                </Fees>
              </Box>

              <HStack spacing={0} justifyContent={'space-between'}>
                <Text {...s.TotalLabel}>Total</Text>

                <Box textAlign={'right'}>
                  <HStack spacing={'6px'}>
                    <TokenIcon ticker={token.ticker} boxSize={'24px'} />
                    <Text {...s.TotalPrice}>{netFinalPrice.toFixed(`${listingPrice}`.length)}</Text>
                  </HStack>
                  <Text {...s.PriceUSD}>${netFinalPriceUSD}</Text>
                </Box>
              </HStack>

              <Box {...s.ButtonsContainerStyle}>
                <Button boxShadow={'lg'} onClick={handleAcceptClick}>
                  Accept
                </Button>
              </Box>
            </>
          )}

          {state === AcceptState.APPROVAL && (
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>
                Accepting offer...
              </Heading>

              <Loading my={'64px'} />
              <Text textAlign={'center'} color={'rgba(0, 0, 0, 0.6)'}>
                Please approve this collection before accepting the offer.
              </Text>
            </Box>
          )}

          {state === AcceptState.PROCESSING && (
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>
                Accepting offer...
              </Heading>

              <Loading my={'64px'} />
              <Text textAlign={'center'} color={'rgba(0, 0, 0, 0.6)'}>
                Loading.... do not click refresh or leave this page.
                <br />
                Just kidding you can do whatever you want.
                <br />
                This is Ethereum!
              </Text>
            </Box>
          )}

          {state === AcceptState.INDEXING && (
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>
                Accepting offer...
              </Heading>

              <Text fontSize={'16px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Indexing order transaction
                {!isOrderIndexed ? (
                  '...'
                ) : (
                  <Box display={'inline-block'} marginLeft={'5px'}>
                    <Image src={CheckIcon} alt={''} />
                  </Box>
                )}
              </Text>

              <Text fontSize={'16px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Indexing NFT changes
                {!isNftIndexed ? (
                  '...'
                ) : (
                  <Box display={'inline-block'} marginLeft={'5px'}>
                    <Image src={CheckIcon} alt={''} />
                  </Box>
                )}
              </Text>

              {(fetchOrderCount >= 3 && !isOrderIndexed) ||
                (fetchNftCount >= 5 && !isNftIndexed && (
                  <Text marginTop={'20px'} fontSize={'14px'} mx={'auto'} maxW={'330px'} textAlign={'center'}>
                    Receving the events from the blockchain is taking longer than expected. Please be patient.
                  </Text>
                ))}

              <Loading my={'64px'} />
            </Box>
          )}

          {state === AcceptState.CONGRATULATIONS && (
            <>
              <Heading {...s.TitleStyle} mb={'10px'}>
                Congratulations!
              </Heading>
              <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>
                You have successfully sold <strong>{NFT?.name}</strong>
              </Text>

              <Box {...s.AssetCongratsStyle}>
                {isNFTAssetImage(previewNFT.artworkTypes) && <Image src={previewNFT.thumbnailUrl} />}
                {isNFTAssetVideo(previewNFT.artworkTypes) && <video src={previewNFT.thumbnailUrl} />}
                {isNFTAssetAudio(previewNFT.artworkTypes) && <Image src={AudioNFTPreviewImage} />}
                {!!NFTs && <NFTType type={'bundle'} count={NFTs.length} />}
              </Box>

              <Box {...s.ButtonsContainerStyle}>
                <Button variant={'outline'} onClick={onClose}>
                  Close
                </Button>
              </Box>
            </>
          )}

          {state === AcceptState.INSUFFICIENT_BALANCE && (
            <NFTCustomError
              title={`Insufficient balance`}
              message={`The creator of the offer does not have enough ${token.ticker} in the wallet!`}
            ></NFTCustomError>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
