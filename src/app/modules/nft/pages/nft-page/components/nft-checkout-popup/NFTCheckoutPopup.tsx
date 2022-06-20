import {
  Box,
  Button,
  Center,
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber, constants, Contract, Signer, utils } from 'ethers';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { ReactComponent as InfoSVG } from '@assets/images/info.svg';
import AudioNFTPreviewImage from '@assets/images/v2/audio-nft-preview.png';
import Contracts from '../../../../../../../contracts/contracts.json';

import { AmountSelector, Checkbox, Loading, TokenIcon } from '../../../../../../components';
import { NFTType } from './components';
import { CheckoutState } from './enums';
import {
  INFT,
  IOrder,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
} from '../../../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import { getTokenByAddress, TOKENS_MAP } from '../../../../../../constants';
import { TokenTicker } from '../../../../../../enums';
import { NFTCustomError } from '../nft-custom-error/NFTCustomError';
import { getEtherscanTxUrl } from '../../../../../../../utils/helpers';
import { formatAddress, shortenEthereumAddress } from '../../../../../../../utils/helpers/format';
import { useTokenPrice } from '../../../../../../hooks';
import { nftKeys, orderKeys } from '../../../../../../utils/query-keys';
import CheckIcon from '../../../../../../../assets/images/check-vector.svg';
import { useAuthStore } from '../../../../../../../stores/authStore';
import { useErrorStore } from '../../../../../../../stores/errorStore';
import { useNftCheckoutStore } from 'src/stores/nftCheckoutStore';
import { GetActiveListingApi, GetNFTApi } from '../../../../../../api';

import * as s from './NFTCheckoutPopup.styles';
import { OrderAssetClass } from '@app/modules/nft/enums';

const NETWORK_CHAIN_ID = process.env.REACT_APP_NETWORK_CHAIN_ID as "1" | "4";
const { contracts: contractsData } = Contracts[NETWORK_CHAIN_ID];

export const NFTCheckoutPopup = () => {
  const router = useRouter();

  const { address, signer, web3Provider } = useAuthStore(s => ({address: s.address, signer: s.signer, web3Provider: s.web3Provider}))
  const { setShowError, setErrorBody } = useErrorStore(s => ({setShowError: s.setShowError, setErrorBody: s.setErrorBody}))
  const { NFT, collection, NFTs, order, isOpen, closeCheckout } = useNftCheckoutStore();
  const queryClient = useQueryClient();

  const [state, setState] = useState<CheckoutState>(CheckoutState.CHECKOUT);
  const [isNFTAudio] = useState(false);
  const [approveTx, setApproveTx] = useState<string>('');

  const [amount, setAmount] = useState<number>(1);

  // INDEXING
  const [fetchOrderCount, setFetchOrderCount] = useState(0);
  const [fetchNftCount, setFetchNftCount] = useState(0);
  const [isOrderIndexed, setIsOrderIndexed] = useState(false);
  const [isNftIndexed, setIsNftIndexed] = useState(false);
  const [newOrderInfo, setNewOrderInfo] = useState<IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>>();
  const [newNftInfo, setNewNftInfo] = useState<INFT>();

  const [nftInterval, setNftInterval] = useState<NodeJS.Timer>();
  const [orderInterval, setOrderInterval] = useState<NodeJS.Timer>();

  const [verificationChecked, setVerificationChecked] = useState(false);

  type IPrepareMutationData = {
    hash: string;
    data: any;
  };

  const prepareMutation = useMutation<AxiosResponse<any>, AxiosError<any>, IPrepareMutationData>(({ hash, data }) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}/prepare`, data);
  });

  const priceToken = useMemo(() => {
    if (!order) {
      return TOKENS_MAP.ETH;
    }

    return getTokenByAddress(order.take?.assetType?.contract);
  }, [order]);

  const usdPrice = useTokenPrice(priceToken.ticker);

  const handleCheckoutClick = useCallback(async () => {
    try {
      if (!signer || !web3Provider || !order) {
        return;
      }
      setFetchOrderCount(0);
      setState(CheckoutState.PROCESSING);


      if (priceToken.ticker !== TokenTicker.ETH) {
        const paymentAmount = BigNumber.from(+order.take.value * amount);

        const contract = new Contract(
          (contractsData as any)[(priceToken.contractName as any)].address,
          (contractsData as any)[(priceToken.contractName as any)].abi,
          signer
        );
        const balance = await contract.balanceOf(address);

        if (paymentAmount.gt(balance)) {
          setState(CheckoutState.INSUFFICIENT_BALANCE);
          return;
        }

        const allowance = await contract.allowance(address, process.env.REACT_APP_MARKETPLACE_CONTRACT);

        if (paymentAmount.gt(allowance)) {
          setState(CheckoutState.APPROVAL);

          const approveTx = await contract.approve(process.env.REACT_APP_MARKETPLACE_CONTRACT, constants.MaxUint256);
          setApproveTx(approveTx?.hash);

          await approveTx.wait();

          setState(CheckoutState.PROCESSING);
        }
      } else {
        const paymentAmount = BigNumber.from(+order.take.value * amount);
        const balance = await web3Provider.getBalance(address);

        if (paymentAmount.gt(balance)) {
          setState(CheckoutState.INSUFFICIENT_BALANCE);
          return;
        }
      }

      const response = await prepareMutation.mutateAsync({
        hash: order.hash,
        data: {
          amount,
          maker: address,
        },
      });
      console.log('response', response);

      const { data, from, to, value } = response.data;

      await sendSellTransaction(data, from, to, BigNumber.from(value.hex)); // TODO Test after new version of contracts and backend redeployed

      setState(CheckoutState.INDEXING);
      // This polling mechanic is temporary until we have marketplace web sockets
      const orderIndexing = setInterval(async () => {
        setFetchOrderCount((count) => (count += 1));

        // TODO: [Bundle] add bundle support
        const singleListingOrder = order as IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;

        const tokenId = singleListingOrder.make.assetType.tokenId?.toString();
        const collectionAddress = singleListingOrder.make.assetType.contract;

        // Fetch order api until a diffrent response is returned
        const newOrder = await GetActiveListingApi(collectionAddress, tokenId);

        // Change query information about order
        if (!newOrder?.id || order.id !== newOrder.id) {
          clearInterval(orderIndexing);
          setNewOrderInfo(newOrder);
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

      setNftInterval(nftIndexing);
      setOrderInterval(orderIndexing);
    } catch (err: any) {
      console.log(err);
      setState(CheckoutState.CHECKOUT);

      // Code 4001 is user rejected transaction
      if (err?.code === 4001) {
        return;
      }

      // Check if error comes from api request and if the api has returned a meaningful messages
      if (prepareMutation.isError && !!prepareMutation?.error?.response?.data?.message) {
        setErrorBody(prepareMutation.error.response.data.message);
      } else if (err.response?.data?.message) {
        setErrorBody(err.response.data.message);
      } else if (err.error?.message) {
        setErrorBody(err.error.message);
      }

      setShowError(true);
    }
  }, [order, address, signer, web3Provider, amount, priceToken]);

  const sendSellTransaction = async (data: string, from: string, to: string, value: BigNumber) => {
    const sellTx = await (signer as Signer).sendTransaction({
      data,
      from,
      to,
      value,
    });

    return sellTx.wait();
  };

  const handleMyNFTsClick = useCallback(() => {
    router.push('/my-nfts');
  }, []);

  const previewNFT = useMemo(() => {
    if (NFT) {
      return NFT;
    }
    if (NFTs && NFTs?.length) {
      return NFTs[0];
    }
    return null;
  }, [NFT, NFTs]);

  const priceTicker = useMemo(() => {
    if (!order?.take) {
      return TokenTicker.ETH;
    }

    return getTokenByAddress(order.take.assetType.contract).ticker
  }, [order]);

  const listingPrice = useMemo(() => {
    return Number(utils.formatUnits(order?.take?.value || 0, priceToken.decimals));
  }, [order, priceToken]);

  const listingUSDPrice = useMemo(() => {
    return Math.round(listingPrice * usdPrice);
  }, [listingPrice, usdPrice]);

  const totalPrice = useMemo(() => {
    return listingPrice * amount;
  }, [listingPrice, amount]);

  const totalUSDPrice = useMemo(() => {
    return Math.round(totalPrice * usdPrice);
  }, [totalPrice, usdPrice]);

  useEffect(() => {
    setState(CheckoutState.CHECKOUT);
    setVerificationChecked(false);
    setAmount(+(order?.make.value ?? 1));
  }, [isOpen, NFTs, order]);

  useEffect(() => {
    if (isOrderIndexed && isNftIndexed) {
      const tokenId = NFT?.tokenId || '';
      const collectionAddress = NFT?._collectionAddress || '';

      setState(CheckoutState.CONGRATULATIONS);

      //TODO: Invalidate browse marketplace page if order has been loaded
      queryClient.refetchQueries(orderKeys.browseAny);

      // Invalidate listing because it's not active anymore
      queryClient.invalidateQueries(orderKeys.listing({ tokenId, collectionAddress }));
      queryClient.invalidateQueries(orderKeys.history({ tokenId, collectionAddress }));
      queryClient.setQueriesData(orderKeys.listing({ tokenId, collectionAddress }), newOrderInfo);

      // Invalidate nfts counter
      queryClient.invalidateQueries(nftKeys.fetchNftSummary(address));

      // Invalidate nft info query in order to refetch new owner info
      if (newNftInfo) {
        queryClient.setQueryData(nftKeys.nftInfo({ tokenId, collectionAddress }), newNftInfo);
      } else {
        // queryClient.invalidateQueries(nftKeys.nftInfo({tokenId, collectionAddress}));
        queryClient.setQueryData(nftKeys.nftInfo({ tokenId, collectionAddress }), null);
      }

      // Invalidate my nfts query in order to see the new nft
      queryClient.refetchQueries(nftKeys.userNfts(address));

      setNewNftInfo(undefined);
      setNewOrderInfo(undefined);
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

  if (!previewNFT || !NFT?.tokenId || !order?.id) {
    return null;
  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => closeCheckout()}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === CheckoutState.CHECKOUT && (
            <>
              <Heading {...s.TitleStyle}>Checkout</Heading>

              <HStack spacing={0} justifyContent={'space-between'}>
                <Text {...s.DataLabel}>Item</Text>
                <Text {...s.DataLabel}>Subtotal</Text>
              </HStack>

              <HStack spacing={'16px'} {...s.NFTWrapper}>
                <Box pos={'relative'}>
                  <Box {...s.AssetStyle}>
                    {(isNFTAssetImage(previewNFT.artworkTypes) && <Image src={previewNFT.thumbnailUrl} />) ||
                      (isNFTAssetVideo(previewNFT.artworkTypes) && <video src={previewNFT.thumbnailUrl} />) ||
                      (isNFTAssetAudio(previewNFT.artworkTypes) && <Image src={AudioNFTPreviewImage} />)}
                  </Box>
                </Box>
                <Box flex={1}>
                  <Text {...s.Text}>{NFT?.name}</Text>
                  <Text {...s.SecondaryText}>
                    {collection?.name || shortenEthereumAddress(NFT?._collectionAddress)}
                  </Text>
                </Box>
                <Box {...s.PriceContainerStyle}>
                  <HStack spacing={'6px'}>
                    <TokenIcon ticker={priceToken.ticker} size={20} />
                    <Text {...s.Text}>{listingPrice}</Text>
                  </HStack>
                  <Text {...s.SecondaryText}>${listingUSDPrice}</Text>
                </Box>
              </HStack>

              {order.make.assetType.assetClass === OrderAssetClass.ERC1155 && (
                <HStack spacing={0} {...s.AmountWrapper}>
                  <Text {...s.DataLabel}>Amount</Text>
                  <AmountSelector
                    size={'sm'}
                    options={{
                      value: amount,
                      min: 1,
                      max: +(order?.make.value ?? 1),
                      onChange: (_, value) => setAmount(value),
                    }}
                  />
                </HStack>
              )}

              <HStack justifyContent={'space-between'} py={'32px'}>
                <Text {...s.DataLabel}>Total</Text>
                <Box {...s.PriceContainerStyle}>
                  <HStack spacing={'6px'}>
                    <TokenIcon ticker={priceToken.ticker} size={24} />
                    <Text fontSize={'18px'} fontWeight={700}>{totalPrice}</Text>
                  </HStack>
                  <Text {...s.SecondaryText}>${totalUSDPrice}</Text>
                </Box>
              </HStack>

              <HStack spacing={'16px'} {...s.AlertInfo}>
                <Box as={InfoSVG} />
                <Text flex={1}>
                  Always verify on Etherscan to confirm that the contract address is the same address as the project you are trying to buy. Ethereum transactions are irreversible.
                </Text>
              </HStack>

              <Box>
                <Checkbox
                  spacing={'10px'}
                  isChecked={verificationChecked}
                  onChange={() => setVerificationChecked(!verificationChecked)}
                >
                  <Text fontSize={'12px'} fontWeight={600}>
                    By checking this box, I acknowledge this information.
                  </Text>
                </Checkbox>
              </Box>

              <Center mt={'24px'}>
                <Button disabled={!verificationChecked} boxShadow={'lg'} onClick={handleCheckoutClick}>
                  Checkout
                </Button>
              </Center>
            </>
          )}

          {state === CheckoutState.INSUFFICIENT_BALANCE && (
            <NFTCustomError
              title={`Insufficient balance`}
              message={`You do not have enough ${priceTicker} in your wallet!`}
            ></NFTCustomError>
          )}

          {state === CheckoutState.PROCESSING && (
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>
                Purchasing the NFT...
              </Heading>

              <Text fontSize={'14px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Just accept the signature request and wait for us to process your offer
              </Text>

              <Loading my={'64px'} />
            </Box>
          )}

          {state === CheckoutState.INDEXING && (
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>
                Purchasing the NFT...
              </Heading>

              <Text fontSize={'16px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Indexing order transaction
                {!isOrderIndexed ? (
                  '...'
                ) : (
                  <Box display={'inline-block'} marginLeft={'5px'}>
                    <Image src={CheckIcon} alt={'Check icon'} />
                  </Box>
                )}
              </Text>

              <Text fontSize={'16px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Indexing NFT changes
                {!isNftIndexed ? (
                  '...'
                ) : (
                  <Box display={'inline-block'} marginLeft={'5px'}>
                    <Image src={CheckIcon} alt={'Check icon'} />
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

          {state === CheckoutState.APPROVAL && (
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>
                Purchasing the NFT...
              </Heading>

              <Text fontSize={'14px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Please give an approval for the specified amount ..
              </Text>

              <Loading my={'64px'} />

              {approveTx && (
                <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'} key={approveTx}>
                  Transaction hash #{1}:{' '}
                  <a target="_blank" href={getEtherscanTxUrl(approveTx)} rel="noreferrer" style={{ color: 'blue' }}>
                    {formatAddress(approveTx)}
                  </a>
                </Text>
              )}
            </Box>
          )}

         {state === CheckoutState.CONGRATULATIONS && (
          <>
            <Heading {...s.TitleStyle} mb={'10px'}>Congratulations!</Heading>
            <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>You have successfully bought the NFT</Text>

            <Box {...s.AssetCongratsStyle}>
              {isNFTAssetImage(previewNFT.artworkTypes) && <Image src={previewNFT.thumbnailUrl} />}
              {isNFTAssetVideo(previewNFT.artworkTypes) && <video src={previewNFT.thumbnailUrl} />}
              {isNFTAssetAudio(previewNFT.artworkTypes) && <Image src={AudioNFTPreviewImage} />}
              {!!NFTs && !!NFTs?.length && <NFTType type={'bundle'} count={NFTs.length} />}
            </Box>

            <HStack spacing={'16px'} justifyContent={'center'} mt={'32px'}>
              <Button boxShadow={'lg'} onClick={handleMyNFTsClick}>My NFTs</Button>
              <Button variant={'outline'} onClick={closeCheckout}>Close</Button>
            </HStack>
          </>
        )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
