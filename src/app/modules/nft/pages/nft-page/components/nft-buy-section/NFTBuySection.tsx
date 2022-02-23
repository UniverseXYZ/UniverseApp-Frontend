import { Box, Button, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMeasure } from 'react-use';
import { UseMeasureRect } from 'react-use/lib/useMeasure';

import ClockIcon from '../../../../../../../assets/images/clock.svg';

import { useDateCountdown } from '../../../../../../hooks';
import * as styles from './styles';
import { HighestBid } from './components';
import { INFT, IOrder, IUser } from '../../../../types';
import { NFTCheckoutPopup } from '../nft-checkout-popup';
import { NFTPlaceABidPopup } from '../nft-place-a-bid-popup';
import { NFTMakeAnOfferPopup } from '../nft-make-an-offer-popup';
import { NFTCancelListingPopup } from '../nft-cancel-listing-popup';
import { NFTChangeListingPricePopup } from '../nft-change-listing-price-popup';
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { BuyNFTSectionState } from './enums';
import { utils } from 'ethers';
import { TOKENS_MAP } from '../../../../../../constants';
import { TokenTicker } from '../../../../../../enums';

interface INFTBuySectionProps {
  NFT?: INFT;
  owner?: IUser;
  NFTs?: INFT[];
  order?: IOrder;
  onMeasureChange?: (measure: UseMeasureRect) => void;
}

export const NFTBuySection = ({ NFT, owner, NFTs, order, onMeasureChange }: INFTBuySectionProps) => {
  const [ref, measure] = useMeasure<HTMLDivElement>();

  const router = useHistory();

  const { signer, web3Provider } = useAuthContext() as any;

  const [state, setState] = useState<BuyNFTSectionState>();

  const updateSectionState = useCallback(async () => {
    if (!signer) {
      return;
    }

    try {
      const address = (await signer.getAddress()) as string;
      if (!order) {
        if (NFT) {
          if (address.toUpperCase() === owner?.address.toUpperCase()) {
            setState(BuyNFTSectionState.OWNER_PUT_ON_SALE);
          }
        }
      } else {
        if (order.maker.toUpperCase() === address.toUpperCase()) {
          // TODO: process case with NFTBuyNFTSectionState.OWNER_AUCTION_LOWER_PRICE
          setState(BuyNFTSectionState.OWNER_FIXED_LISTING_CHANGE_PRICE);
        } else {
          // TODO: case with NFTBuyNFTSectionState.BUYER_FIXED_LISTING_BUY
          // TODO: case with NFTBuyNFTSectionState.BUYER_AUCTION_BID
          // TODO: case with NFTBuyNFTSectionState.BUYER_AUCTION_BID_N_OFFER
          setState(BuyNFTSectionState.BUYER_FIXED_LISTING_BUY_N_OFFER);
        }
      }
    } catch (e) {
    }
  }, [signer, NFT, order, owner]);

  useEffect(() => {
    onMeasureChange && onMeasureChange(measure);
  }, [measure]);

  useEffect(() => {
    updateSectionState();
  }, [signer, NFT, order, updateSectionState]);

  const { countDownString } = useDateCountdown(new Date(new Date().setDate(new Date().getDate() + 1)));

  const [isCheckoutPopupOpened, setIsCheckoutPopupOpened] = useState(false);
  const [isPlaceABidPopupOpened, setIsPlaceABidPopupOpened] = useState(false);
  const [isMakeAnOfferPopupOpened, setIsMakeAnOfferPopupOpened] = useState(false);
  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] = useState(false);
  const [isChangeListingPricePopupOpened, setIsChangeListingPricePopupOpened] = useState(false);

  if (state === undefined) {
    return <Box ref={ref}></Box>;
  }

  return (
    <Box {...styles.WrapperStyle} ref={ref}>
      {/*<Box {...styles.CountDownWrapperStyle} cursor={'pointer'}>*/}
      {/*  <Box {...styles.CountDownContentStyle} minW={`${((countDownString?.length ?? 0) + 5) * 10}px`}>*/}
      {/*    <Text>*/}
      {/*      <Image src={ClockIcon} />*/}
      {/*      {countDownString} left*/}
      {/*    </Text>*/}
      {/*    <Text>Reserve price has been met</Text>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      <Box {...styles.ContentStyle}>

        {state === BuyNFTSectionState.BUYER_AUCTION_BID_N_OFFER && (
          <>
            <HighestBid />
            <SimpleGrid columns={2} spacingX={'12px'}>
              <Button boxShadow={'lg'} onClick={() => setIsPlaceABidPopupOpened(true)}>Place a bid</Button>
              <Button variant={'outline'} onClick={() => setIsMakeAnOfferPopupOpened(true)}>Make offer</Button>
            </SimpleGrid>
          </>
        )}
        {state === BuyNFTSectionState.BUYER_FIXED_LISTING_BUY_N_OFFER && (
          <>
            <HighestBid />
            <SimpleGrid columns={2} spacingX={'12px'}>
              <Button boxShadow={'lg'} onClick={() => setIsCheckoutPopupOpened(true)}>
                Buy for {utils.formatUnits(order?.take.value ?? '', `${TOKENS_MAP[order?.take.assetType.assetClass as TokenTicker]?.decimals}`)} {order?.take.assetType.assetClass}
              </Button>
              <Button variant={'outline'} onClick={() => setIsMakeAnOfferPopupOpened(true)}>Make offer</Button>
            </SimpleGrid>
          </>
        )}
        {state === BuyNFTSectionState.BUYER_FIXED_LISTING_BUY && (
          <>
            <Button boxShadow={'lg'} w={'100%'} onClick={() => setIsCheckoutPopupOpened(true)}>
              Buy for {utils.formatUnits(order?.take.value ?? '', `${TOKENS_MAP[order?.take.assetType.assetClass as TokenTicker]?.decimals}`)} {order?.take.assetType.assetClass}
            </Button>
            <Text {...styles.ContentFeeLabelStyle} textAlign={'center'} mt={'12px'}>(10% of sales will go to creator)</Text>
          </>
        )}
        {state === BuyNFTSectionState.BUYER_AUCTION_BID && (
          <>
            <Button boxShadow={'lg'} w={'100%'} onClick={() => setIsPlaceABidPopupOpened(true)}>Place a bid</Button>
            <Text {...styles.ContentFeeLabelStyle} textAlign={'center'} mt={'12px'}>(10% of sales will go to creator)</Text>
          </>
        )}
        {state === BuyNFTSectionState.OWNER_PUT_ON_SALE && (
          <>
            <Button boxShadow={'lg'} w={'100%'} onClick={() => router.push(`/nft/${NFT?.collection?.address}/${NFT?.tokenId}/sell`)}>Put on sale</Button>
            <Text {...styles.ContentFeeLabelStyle} textAlign={'center'} mt={'12px'} color={'rgba(0, 0, 0, 0.4)'}>
              This NFT is in your wallet
            </Text>
          </>
        )}
        {state === BuyNFTSectionState.OWNER_AUCTION_LOWER_PRICE && (
          <>
            <HighestBid />
            <SimpleGrid columns={2} spacingX={'12px'}>
              <Button boxShadow={'lg'} _focus={{ boxShadow: 'lg' }} onClick={() => setIsChangeListingPricePopupOpened(true)}>Lower Price</Button>
              <Button variant={'outline'} onClick={() => setIsCancelListingPopupOpened(true)}>Cancel listing</Button>
            </SimpleGrid>
          </>
        )}
        {state === BuyNFTSectionState.OWNER_FIXED_LISTING_CHANGE_PRICE && (
          <>
            {/*TODO: show if highest bid exist, if not show message (below) "This NFT is in your wallet" */}
            {/*<HighestBid />*/}
            <SimpleGrid columns={2} spacingX={'12px'}>
              <Button boxShadow={'lg'} onClick={() => setIsChangeListingPricePopupOpened(true)}>Change price</Button>
              <Button variant={'outline'} onClick={() => setIsCancelListingPopupOpened(true)}>Cancel listing</Button>
            </SimpleGrid>
            <Text {...styles.ContentFeeLabelStyle} textAlign={'center'} mt={'12px'}>
              This NFT is in your wallet
            </Text>
          </>
        )}
      </Box>
      <NFTCheckoutPopup
        NFT={NFT}
        NFTs={NFTs}
        order={order as IOrder}
        isOpen={isCheckoutPopupOpened}
        onClose={() => setIsCheckoutPopupOpened(false)}
      />
      <NFTPlaceABidPopup
        order={order}
        isOpen={isPlaceABidPopupOpened}
        onClose={() => setIsPlaceABidPopupOpened(false)}
      />
      <NFTMakeAnOfferPopup
        order={order}
        isOpen={isMakeAnOfferPopupOpened}
        onClose={() => setIsMakeAnOfferPopupOpened(false)}
      />
      <NFTCancelListingPopup
        order={order}
        isOpen={isCancelListingPopupOpened}
        onClose={() => setIsCancelListingPopupOpened(false)}
        handleCancel={() => setIsCancelListingPopupOpened(false)}
      />
      <NFTChangeListingPricePopup
        nft={NFT}
        order={order}
        isOpen={isChangeListingPricePopupOpened}
        onClose={() => setIsChangeListingPricePopupOpened(false)}
      />
    </Box>
  );
}
