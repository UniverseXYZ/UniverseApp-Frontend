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
import { utils } from 'ethers';

import WarningSVGIcon from '../../../../../../../assets/images/yellowIcon.svg';
import ArrowSVGIcon from '../../../../../../../assets/images/arrow.svg';
import WalletImage from '../../../../../../../assets/images/v2/wallet.png';
import AudioNFTPreviewImage from '../../../../../../../assets/images/v2/audio-nft-preview.png';

import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { Checkbox, InputShadow, TokenIcon } from '../../../../../../components';
import { NFTType } from './components';
import { CheckoutState } from './enums';
import * as styles from './styles';
import { INFT, IOrder } from '../../../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import { TOKENS_MAP } from '../../../../../../constants';
import { TokenTicker } from '../../../../../../enums';

interface INFTCheckoutPopupProps {
  NFT?: INFT;
  NFTs?: INFT[];
  order: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTCheckoutPopup = ({ NFT, NFTs, order, isOpen, onClose }: INFTCheckoutPopupProps) => {
  const router = useHistory();

  const { address } = useAuthContext();

  const { onCopy } = useClipboard(address);

  const [state, setState] = useState<CheckoutState>(CheckoutState.CHECKOUT);
  const [agree, setAgree] = useState(false);
  const [reviewedByUniverse, setReviewedByUniverse] = useState(false);
  const [isNFTAudio] = useState(false);
  const [agreeBundle, setAgreeBundle] = useState(false);

  const handleCheckoutClick = useCallback(() => {
    setState(CheckoutState.CONGRATULATIONS);
  }, []);

  const handleMyNFTsClick = useCallback(() => {
    router.push('/my-nfts');
  }, []);

  const handleAddFundsClick = useCallback(() => {
    setState(CheckoutState.ADD_FUNDS);
  }, []);

  const handleBackClick = useCallback(() => {
    setState(CheckoutState.CHECKOUT);
  }, []);

  const assetUrl = useMemo(() => (isNFTAudio
    ? AudioNFTPreviewImage
    : 'https://storage.googleapis.com/lobster-images/05020905000503.jpg'
  ), [isNFTAudio]);

  const previewNFT = useMemo(() => {
    return NFT || (NFTs as INFT[])[0];
  }, [NFT, NFTs]);

  useEffect(() => {
    setState(CheckoutState.CHECKOUT);
    setAgree(false);
    setAgreeBundle(!NFTs);
  }, [isOpen, NFTs])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === CheckoutState.CHECKOUT && (
            <>
              <Heading {...styles.TitleStyle}>Checkout</Heading>
              {!reviewedByUniverse && (
                <Box {...styles.WarningStyle}>
                  <Text>
                    <Image src={WarningSVGIcon} />
                    This Item has not been reviewed by Universe
                  </Text>
                </Box>
              )}
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
                    <TokenIcon ticker={order?.take.assetType.assetClass as TokenTicker} display={'inline'} size={20} mr={'6px'} mt={'-3px'} />
                    {utils.formatUnits(order.take.value, `${TOKENS_MAP[order?.take.assetType.assetClass as TokenTicker].decimals}`)}
                  </Text>
                  <Text {...styles.PriceUSDStyle}>$1 408.39</Text>
                </Box>
              </Flex>

              <Flex {...styles.TotalContainerStyle}>
                <Text>Total</Text>
                <Box {...styles.PriceContainerStyle}>
                  <Text fontSize={'18px'}>
                    <TokenIcon ticker={order?.take.assetType.assetClass as TokenTicker} display={'inline'} size={24} mr={'6px'} mt={'-3px'} />
                    {utils.formatUnits(order.take.value, `${TOKENS_MAP[order?.take.assetType.assetClass as TokenTicker].decimals}`)}
                  </Text>
                  <Text {...styles.PriceUSDStyle}>$208.39</Text>
                </Box>
              </Flex>

              {!!NFTs && (
                <Checkbox mb={'20px'} size={'lg'} isChecked={agreeBundle} onChange={(e) => setAgreeBundle(e.target.checked)}>
                  <Text fontSize={'12px'} fontWeight={400}>
                    By checking this box, I acknowledge that this bundle contains an item that has now been reviewed or approved by Universe.
                  </Text>
                </Checkbox>
              )}
              <Checkbox size={'lg'} isChecked={agree} onChange={(e) => setAgree(e.target.checked)}>
                <Text fontSize={'12px'} fontWeight={400}>
                  By checking this box, I agree to Universe’s <Link textDecor={'underline'} target={'_blank'} href={'https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper'}>Terms of Service</Link>
                </Text>
              </Checkbox>

              <Box {...styles.ButtonsContainerStyle}>
                <Button boxShadow={'lg'} onClick={handleCheckoutClick} disabled={!agree || !agreeBundle}>Checkout</Button>
                <Button variant={'outline'} onClick={handleAddFundsClick}>Add Funds</Button>
              </Box>
            </>
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
