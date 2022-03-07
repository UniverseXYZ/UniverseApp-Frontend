import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BigNumber, Signer, utils } from 'ethers';

import WarningSVGIcon from '../../../../../../../assets/images/yellowIcon.svg';
import ArrowSVGIcon from '../../../../../../../assets/images/arrow.svg';
import WalletImage from '../../../../../../../assets/images/v2/wallet.png';
import AudioNFTPreviewImage from '../../../../../../../assets/images/v2/audio-nft-preview.png';
import Contracts from '../../../../../../../contracts/contracts.json';
import { Contract, constants } from "ethers";
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { useErrorContext } from '../../../../../../../contexts/ErrorContext';
import { Checkbox, InputShadow, Loading, TokenIcon } from '../../../../../../components';
import { NFTType } from './components';
import { CheckoutState } from './enums';
import * as styles from './styles';
import { INFT, IOrder } from '../../../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import { TOKENS_MAP } from '../../../../../../constants';
import { TokenTicker } from '../../../../../../enums';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Web3Provider } from '@ethersproject/providers';
import { NFTCustomError } from '../nft-custom-error/NFTCustomError';
import { getEtherscanTxUrl } from '../../../../../../../utils/helpers';
import { formatAddress } from '../../../../../../../utils/helpers/format';
import { useTokenPrice } from '../../../../../../hooks';
// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

interface INFTCheckoutPopupProps {
  NFT?: INFT;
  NFTs?: INFT[];
  order: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTCheckoutPopup = ({ NFT, NFTs, order, isOpen, onClose }: INFTCheckoutPopupProps) => {
  const router = useHistory();

  const { address, signer, web3Provider } = useAuthContext() as any;
  const { setShowError } = useErrorContext() as any;
  const { onCopy } = useClipboard(address);

  const [state, setState] = useState<CheckoutState>(CheckoutState.CHECKOUT);
  const [isNFTAudio] = useState(false);
  const [approveTx, setApproveTx] = useState<string>('')

  const prepareMutation = useMutation(({ hash, data }: { hash: string, data: any }) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}/prepare`, data);
  });

  const tokenTicker = order?.take.assetType.assetClass as TokenTicker

  const tokenDecimals = TOKENS_MAP[tokenTicker]?.decimals ?? 18

  const listingPrice = Number(utils.formatUnits(order?.take.value || 0, tokenDecimals))
  
  const usdPrice = useTokenPrice(tokenTicker);

  const usdListingPrice = Math.round(listingPrice * usdPrice)

  const handleCheckoutClick = useCallback(async () => {
    try {
      setState(CheckoutState.PROCESSING);

      const paymentToken = TOKENS_MAP[order.take.assetType.assetClass as TokenTicker];

      if (paymentToken.ticker !== TokenTicker.ETH) {
        const paymentAmount = utils.parseUnits(order.take.value, paymentToken.decimals);
  
        const contract = new Contract(contractsData[paymentToken.contractName].address, contractsData[paymentToken.contractName].abi, signer);
        const balance = await contract.balanceOf(address);
  
        if (paymentAmount.gt(balance)) {
          setState(CheckoutState.INSUFFICIENT_BALANCE);
          return;
        }
  
        const allowance = await contract.allowance(address, process.env.REACT_APP_MARKETPLACE_CONTRACT);
  
        if(paymentAmount.gt(allowance)) {
          setState(CheckoutState.APPROVAL);
  
          const approveTx = await contract.approve(process.env.REACT_APP_MARKETPLACE_CONTRACT, constants.MaxUint256);
          setApproveTx(approveTx?.hash);
  
          await approveTx.wait();
  
          setState(CheckoutState.PROCESSING);
        }

      }

      const response = await prepareMutation.mutateAsync({
        hash: order.hash,
        data: {
          maker: address,
          amount: order.make.value,
        },
      });
      console.log('response', response);
  
      const {data, from, to, value} = response.data;
  
      await sendSellTransaction(data, from, to, BigNumber.from(value.hex), signer); // TODO Test after new version of contracts and backend redeployed
      setState(CheckoutState.CONGRATULATIONS);

    } catch(err) {
      console.log(err)      
      setShowError(true)
      setState(CheckoutState.CHECKOUT)
    }
    
  }, [order, address]);

  const sendSellTransaction = async (data: string, from: string, to: string, value: BigNumber, signer: any ) => {

    const sellTx = await (signer as Signer).sendTransaction({
      data,
      from,
      to,
      value
    })

    return sellTx.wait();
    
  }

  const handleMyNFTsClick = useCallback(() => {
    router.push('/my-nfts');
  }, []);

  const handleAddFundsClick = useCallback(() => {
    setState(CheckoutState.ADD_FUNDS);
  }, []);

  const handleBackClick = useCallback(() => {
    setState(CheckoutState.CHECKOUT);
  }, []);

  const previewNFT = useMemo(() => {
    return NFT || (NFTs as INFT[])[0];
  }, [NFT, NFTs]);

  useEffect(() => {
    setState(CheckoutState.CHECKOUT);
  }, [isOpen, NFTs]);

  if (!order) {
    return null;
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === CheckoutState.CHECKOUT && (
            <>
              <Heading {...styles.TitleStyle}>Checkout</Heading>
              <Flex {...styles.TitlesContainerStyle}>
                <Text>Item</Text>
                <Text>Subtotal</Text>
              </Flex>

              <Flex {...styles.NFTContainerStyle}>
                <Box pos={'relative'}>
                  <Box {...styles.AssetStyle}>
                    {isNFTAssetImage(previewNFT.artworkType) && <Image src={previewNFT.thumbnailUrl} />}
                    {isNFTAssetVideo(previewNFT.artworkType) && <video src={previewNFT.thumbnailUrl} />}
                    {isNFTAssetAudio(previewNFT.artworkType) && <Image src={AudioNFTPreviewImage} />}
                  </Box>
                  {!!NFTs && (<NFTType type={'bundle'} count={NFTs.length} />)}
                </Box>
                <Box flex={1} p={'20px'}>
                  <Text>NFT name</Text>
                  <Text {...styles.CollectionNameStyle}>Collection name</Text>
                </Box>
                <Box {...styles.PriceContainerStyle}>
                  <Text fontSize={'14px'}>
                    <TokenIcon ticker={tokenTicker} display={'inline'} size={20} mr={'6px'} mt={'-3px'} />
                    {listingPrice}
                  </Text>
                  <Text {...styles.PriceUSDStyle}>${usdListingPrice}</Text>
                </Box>
              </Flex>

              <Flex {...styles.TotalContainerStyle}>
                <Text>Total</Text>
                <Box {...styles.PriceContainerStyle}>
                  <Text fontSize={'18px'}>
                    <TokenIcon ticker={tokenTicker} display={'inline'} size={24} mr={'6px'} mt={'-3px'} />
                    {listingPrice}
                  </Text>
                  <Text {...styles.PriceUSDStyle}>${usdListingPrice}</Text>
                </Box>
              </Flex>

              <Box {...styles.ButtonsContainerStyle}>
                <Button boxShadow={'lg'} onClick={handleCheckoutClick}>Checkout</Button>
                <Button variant={'outline'} onClick={handleAddFundsClick}>Add Funds</Button>
              </Box>
            </>
          )}

          {state === CheckoutState.INSUFFICIENT_BALANCE && (
            <NFTCustomError
              title={`Insufficient balance`}
              message={`You do not have enough ${TOKENS_MAP[order.take.assetType.assetClass as TokenTicker].ticker} in your wallet!`}
            ></NFTCustomError>
          )}

          {state === CheckoutState.PROCESSING && (
            <Box>
              <Heading {...styles.TitleStyle} mb={'20px'}>Purchasing the NFT...</Heading>

              <Text fontSize={'14px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Just accept the signature request and wait for us to process your offer
              </Text>

              <Loading my={'64px'} />
            </Box>
          )}

          {state === CheckoutState.APPROVAL && (
            <Box>
              <Heading {...styles.TitleStyle} mb={'20px'}>Purchasing the NFT...</Heading>

              <Text fontSize={'14px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Please give an approval for the specified amount ..
              </Text>

              <Loading my={'64px'} />


              {approveTx && (
                <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'} key={approveTx}>
                  Transaction hash #{1}:{' '}
                  <a target="_blank" href={getEtherscanTxUrl(approveTx)} rel="noreferrer" style={{color: 'blue'}}>
                    {formatAddress(approveTx)}
                  </a>
                </Text>
              )}

            </Box>
          )}

          {state === CheckoutState.CONGRATULATIONS && (
            <>
              <Heading {...styles.TitleStyle} mb={'10px'}>Congratulations!</Heading>
              <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>You have successfully bought the NFT</Text>

              <Box {...styles.AssetCongratsStyle}>
                {isNFTAssetImage(previewNFT.artworkType) && <Image src={previewNFT.thumbnailUrl} />}
                {isNFTAssetVideo(previewNFT.artworkType) && <video src={previewNFT.thumbnailUrl} />}
                {isNFTAssetAudio(previewNFT.artworkType) && <Image src={AudioNFTPreviewImage} />}
                {!!NFTs && (<NFTType type={'bundle'} count={NFTs.length} />)}
              </Box>

              <Box {...styles.ButtonsContainerStyle}>
                <Button boxShadow={'lg'} onClick={handleMyNFTsClick}>My NFTs</Button>
                <Button variant={'outline'} onClick={onClose}>Close</Button>
              </Box>
            </>
          )}

          {state === CheckoutState.ADD_FUNDS && (
            <>
              <Heading {...styles.TitleStyle} mb={'40px'} position={'relative'}>
                <Image src={ArrowSVGIcon}
                       cursor={'pointer'}
                       position={'absolute'}
                       left={0}
                       transform={'translateY(50%)'}
                       onClick={handleBackClick}
                />
                Add funds
              </Heading>

              <Image src={WalletImage} {...styles.WalletStyle} />

              <Text textAlign={'center'} px={'20px'} mb={'30px'}>
                Transfer funds from an exchange or another wallet to your wallet address below:
              </Text>

              <Flex position={'relative'} flexDir={{ base: 'column', md: 'row' }}>
                <InputShadow
                  flex={1}
                  mr={{ base: 0, md: '14px' }}
                  mb={{ base: '14px', md: 0 }}
                >
                  <Input defaultValue={address} />
                </InputShadow>

                <Button size={'lg'} boxShadow={'lg'} onClick={onCopy}>Copy</Button>
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
