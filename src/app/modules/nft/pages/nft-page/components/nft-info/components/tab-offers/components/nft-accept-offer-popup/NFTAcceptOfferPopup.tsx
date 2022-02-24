import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber, Signer, utils } from 'ethers';
import { useMutation } from 'react-query';

import AudioNFTPreviewImage from '../../../../../../../../../../../assets/images/v2/audio-nft-preview.png';

import { useAuthContext } from '../../../../../../../../../../../contexts/AuthContext';
import { Loading, TokenIcon } from '../../../../../../../../../../components';
import { NFTType } from './components';
import { AcceptState } from './enums';
import * as styles from './styles';
import { INFT, IOrder } from '../../../../../../../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../../../../../helpers';
import { TOKENS_MAP } from '../../../../../../../../../../constants';
import { TokenTicker } from '../../../../../../../../../../enums';
import { Fee } from '../../../../../../../../../marketplace/pages/sell-page/components/tab-summary/compoents';

interface INFTAcceptOfferPopupProps {
  NFT?: INFT;
  NFTs?: INFT[];
  order: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTAcceptOfferPopup = ({ NFT, NFTs, order, isOpen, onClose }: INFTAcceptOfferPopupProps) => {
  const { address, signer } = useAuthContext() as any;

  const [state, setState] = useState<AcceptState>(AcceptState.CHECKOUT);
  const [isNFTAudio] = useState(false);

  const prepareMutation = useMutation(({ hash, data }: { hash: string, data: any }) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}/prepare`, data);
  });

  const handleAcceptClick = useCallback(async () => {
    // TODO: add processing & remove setTimeout
    setState(AcceptState.PROCESSING);
    setTimeout(() => {
      setState(AcceptState.CONGRATULATIONS);
    }, 3000);
  }, [order, address]);

  const sendSellTransaction = async (data: string, from: string, to: string, value: BigNumber ) => {

    const sellTx = await (signer as Signer).sendTransaction({
      data,
      from,
      to,
      value
    })

    return sellTx.wait();
    
  }

  const previewNFT = useMemo(() => {
    return NFT || (NFTs as INFT[])[0];
  }, [NFT, NFTs]);

  useEffect(() => {
    setState(AcceptState.CHECKOUT);
  }, [isOpen, NFTs]);

  if (!order) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === AcceptState.CHECKOUT && (
            <>
              <Heading {...styles.TitleStyle}>Accept this offer</Heading>
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
                    <TokenIcon ticker={(order as any).make.assetType.assetClass as TokenTicker} display={'inline'} size={20} mr={'6px'} mt={'-3px'} />
                    {utils.formatUnits((order as any).make.value, `${TOKENS_MAP[(order as any).make.assetType.assetClass as TokenTicker]?.decimals ?? 18}`)}
                  </Text>
                  <Text {...styles.PriceUSDStyle}>$1 408.39</Text>
                </Box>
              </Flex>

              <Box>
                <Text fontSize={'16px'} fontWeight={700}>Fees</Text>
                <Box layerStyle={'grey'} {...styles.FeesContainerStyle}>
                  <Fee name={'To Universe'} amount={10} />
                  <Fee name={'To creator'} amount={2} />
                  <Fee name={'Total'} amount={12} />
                </Box>
              </Box>

              <Flex {...styles.TotalContainerStyle}>
                <Text>Total</Text>
                <Box {...styles.PriceContainerStyle}>
                  <Text fontSize={'18px'}>
                    <TokenIcon ticker={(order as any).make.assetType.assetClass as TokenTicker} display={'inline'} size={24} mr={'6px'} mt={'-3px'} />
                    {utils.formatUnits((order as any).make.value, `${TOKENS_MAP[(order as any).make.assetType.assetClass as TokenTicker]?.decimals ?? 18}`)}
                  </Text>
                  <Text {...styles.PriceUSDStyle}>$208.39</Text>
                </Box>
              </Flex>

              <Box {...styles.ButtonsContainerStyle}>
                <Button boxShadow={'lg'} onClick={handleAcceptClick}>Accept</Button>
              </Box>
            </>
          )}

          {state === AcceptState.PROCESSING && (
            <Box>
              <Loading my={'64px'} />
              <Text textAlign={'center'} color={'rgba(0, 0, 0, 0.6)'}>
                Loading.... do not click refresh or leave this page.<br/>
                Just kidding you can do whatever you want.<br/>
                This is Ethereum!
              </Text>
            </Box>
          )}

          {state === AcceptState.CONGRATULATIONS && (
            <>
              <Heading {...styles.TitleStyle} mb={'10px'}>Congratulations!</Heading>
              <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>
                You have successfully sold <strong>{NFT?.name}</strong>
              </Text>

              <Box {...styles.AssetCongratsStyle}>
                {isNFTAssetImage(previewNFT.artworkType) && <Image src={previewNFT.thumbnailUrl} />}
                {isNFTAssetVideo(previewNFT.artworkType) && <video src={previewNFT.thumbnailUrl} />}
                {isNFTAssetAudio(previewNFT.artworkType) && <Image src={AudioNFTPreviewImage} />}
                {!!NFTs && (<NFTType type={'bundle'} count={NFTs.length} />)}
              </Box>

              <Box {...styles.ButtonsContainerStyle}>
                <Button variant={'outline'} onClick={onClose}>Close</Button>
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
