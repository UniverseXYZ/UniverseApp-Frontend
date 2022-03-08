import { Box, Button, Image, Popover, PopoverBody, PopoverContent, PopoverTrigger, SimpleGrid, Text, Tooltip } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMeasure } from 'react-use';
import { UseMeasureRect } from 'react-use/lib/useMeasure';

import ClockIcon from '../../../../../../../assets/images/clock.svg';

import { useDateCountdown } from '../../../../../../hooks';
import * as styles from './styles';
import { HighestBid } from './components';
import { IERC20AssetType, INFT, IOrder, IUser } from '../../../../types';
import { NFTCheckoutPopup } from '../nft-checkout-popup';
import { NFTPlaceABidPopup } from '../nft-place-a-bid-popup';
import { NFTMakeAnOfferPopup } from '../nft-make-an-offer-popup';
import { NFTCancelListingPopup } from '../nft-cancel-listing-popup';
import { NFTChangeListingPricePopup } from '../nft-change-listing-price-popup';
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { BuyNFTSectionState } from './enums';
import { utils } from 'ethers';
import { getTokenByAddress, TOKENS_MAP } from '../../../../../../constants';
import { TokenTicker } from '../../../../../../enums';
import { getRoyaltiesFromRegistry } from '../../../../../../../utils/marketplace/utils';
import { HighestOffer } from './components/highest-offer';
import { isEmpty } from '../../../../../../../utils/helpers';

interface INFTBuySectionProps {
  NFT?: INFT;
  owner?: IUser;
  NFTs?: INFT[];
  order?: IOrder;
  highestOffer?: {offer: IOrder, creator: IUser};
  onMeasureChange?: (measure: UseMeasureRect) => void;
}

export const NFTBuySection = ({ NFT, owner, NFTs, order, highestOffer, onMeasureChange }: INFTBuySectionProps) => {
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
          } else {
            setState(BuyNFTSectionState.BUYER_NO_LISTING_OFFER);
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

  const fetchNftRoyalties = async () => {
    if (NFT?._collectionAddress && NFT.tokenId && signer) {
      const { nftRoyaltiesPercent } = await getRoyaltiesFromRegistry(NFT._collectionAddress, NFT.tokenId, signer);
      setNftRoyalties(nftRoyaltiesPercent.toNumber())
    }
  };

  useEffect(() => {
    onMeasureChange && onMeasureChange(measure);
  }, [measure]);

  useEffect(() => {
    updateSectionState();
  }, [signer, NFT, order, updateSectionState]);

  useEffect(() => {
    fetchNftRoyalties();
  }, [signer, NFT?._collectionAddress, NFT?.tokenId])

  // const { countDownString } = useDateCountdown(new Date(new Date().setDate(new Date().getDate() + 1)));

  const [isCheckoutPopupOpened, setIsCheckoutPopupOpened] = useState(false);
  const [isPlaceABidPopupOpened, setIsPlaceABidPopupOpened] = useState(false);
  const [isMakeAnOfferPopupOpened, setIsMakeAnOfferPopupOpened] = useState(false);
  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] = useState(false);
  const [isChangeListingPricePopupOpened, setIsChangeListingPricePopupOpened] = useState(false);
  const [nftRoyalties, setNftRoyalties] = useState(0);

  const utcTimestamp = Math.floor(new Date().getTime() / 1000);

  const canCheckoutOrder = 
    (!order?.start && !order?.end) || // Order doesn't have start and end
    (order.start && order.end && utcTimestamp > order.start && utcTimestamp < order.end) || // Order has both start & end
    (order.start && !order.end && utcTimestamp > order.start) || // Order has only start
    (!order.start && order.end && utcTimestamp < order.end ) // Order has only end 
  ;

  const token = order?.take.assetType.assetClass as TokenTicker;
  const tokenDecimals = TOKENS_MAP[token]?.decimals;
  const listingPrice = utils.formatUnits(order?.take.value ?? 0, tokenDecimals);
  
  const buyNowButton = () => (
    <Tooltip label={"Can't buy this NFT. It's either not available yet or already expired."} isDisabled={!!canCheckoutOrder} hasArrow shouldWrapChildren placement='top'>
      <Button boxShadow={'lg'} onClick={() => setIsCheckoutPopupOpened(true)} disabled={!canCheckoutOrder} style={{"width": "100%"}}>
        Buy for {listingPrice} {getTokenByAddress((order?.take.assetType as IERC20AssetType).contract).ticker}
      </Button>
    </Tooltip>
  );

  const royaltiesText = () => <Text {...styles.ContentFeeLabelStyle} textAlign={'center'} mt={'12px'}>({nftRoyalties}% of sales will go to creator)</Text>;

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
          {!isEmpty(highestOffer?.offer) && (
            <HighestOffer offer={highestOffer?.offer} creator={highestOffer?.creator as IUser} />
          )}
            <SimpleGrid columns={2} spacingX={'12px'}>
              {buyNowButton()}
              <Button variant={'outline'} onClick={() => setIsMakeAnOfferPopupOpened(true)}>Make offer</Button>
            </SimpleGrid>
            {!!nftRoyalties && royaltiesText()}
          </>
        )}
        {state === BuyNFTSectionState.BUYER_FIXED_LISTING_BUY && (
          <>
            {buyNowButton()}
            {!!nftRoyalties && royaltiesText()}
          </>
        )}
        {state === BuyNFTSectionState.BUYER_AUCTION_BID && (
          <>
            <Button boxShadow={'lg'} w={'100%'} onClick={() => setIsPlaceABidPopupOpened(true)}>Place a bid</Button>
            {!!nftRoyalties && royaltiesText()}
          </>
        )}
        {state === BuyNFTSectionState.BUYER_NO_LISTING_OFFER && (
          <>
          {!isEmpty(highestOffer?.offer) && (
            <HighestOffer offer={highestOffer?.offer} creator={highestOffer?.creator as IUser} />
          )}
          <SimpleGrid columns={1} spacingX={'12px'}>
            <Button variant={'outline'} onClick={() => setIsMakeAnOfferPopupOpened(true)}>Make offer</Button>
          </SimpleGrid>
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
          {!isEmpty(highestOffer?.offer) && (
            <HighestOffer offer={highestOffer?.offer} creator={highestOffer?.creator as IUser} />
          )}
            <SimpleGrid columns={2} spacingX={'12px'}>
              <Button boxShadow={'lg'} onClick={() => setIsChangeListingPricePopupOpened(true)}>Change price</Button>
              <Button variant={'outline'} onClick={() => setIsCancelListingPopupOpened(true)}>Cancel listing</Button>
            </SimpleGrid>
            <Text {...styles.ContentFeeLabelStyle} textAlign={'center'} mt={'12px'}>
              This NFT is in your wallet and listed for <strong>{listingPrice} {getTokenByAddress((order?.take.assetType as IERC20AssetType).contract).ticker}</strong>
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
        nft={NFT}
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
