import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { utils } from "ethers";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Countdown, { zeroPad } from "react-countdown";
import { useMeasure } from "react-use";
import { UseMeasureRect } from "react-use/lib/useMeasure";
import { useNftCheckoutStore } from "src/stores/nftCheckoutStore";
import ClockIcon from "../../../../../../../assets/images/clock.svg";
import { useAuthStore } from "../../../../../../../stores/authStore";
import { getRoyaltiesFromRegistry } from "../../../../../../../utils/marketplace/utils";
import { getTokenByAddress, TOKENS_MAP } from '../../../../../../constants';
import { IUser } from "../../../../../account/types";
import {
  INFT,
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
} from '../../../../types';
import { useNFTPageData } from "../../NFTPage.context";
import { NFTCancelListingPopup } from "../nft-cancel-listing-popup";
import { NFTChangeListingPricePopup } from "../nft-change-listing-price-popup";
import { NFTPlaceABidPopup } from "../nft-place-a-bid-popup";
import { HighestBid } from "./components";
import { HighestOffer } from "./components/highest-offer";
import { BuyNFTSectionState } from "./enums";
import * as styles from "./styles";
import { useNFTMakeOfferStore } from '../../../../../../../stores/nftMakeOfferStore';

interface INFTBuySectionProps {
  NFT?: INFT;
  owner?: IUser;
  NFTs?: INFT[];
  order?: IOrder<IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing, IOrderAssetTypeERC20>;
  highestOfferOrder?: IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing>;
  highestOfferCreator?: IUser;
  onMeasureChange?: (measure: UseMeasureRect) => void;
}

export const NFTBuySection = (props: INFTBuySectionProps) => {
  const { NFT, owner, NFTs, order, highestOfferOrder, highestOfferCreator, onMeasureChange } = props;

  const { makeOffer } = useNFTMakeOfferStore();

  const [ref, measure] = useMeasure<HTMLDivElement>();

  const router = useRouter();

  const [state, setState] = useState<BuyNFTSectionState>();

  const [showCountDown, setShowCountDown] = useState(false);

  const { signer, isAuthenticated } = useAuthStore((s) => ({
    signer: s.signer,
    isAuthenticated: s.isAuthenticated,
  }));

  const { checkoutNFT } = useNftCheckoutStore();

  const { collection } = useNFTPageData();

  const updateSectionState = useCallback(async () => {
    if (!isAuthenticated || !signer) {
      return;
    }

    try {
      const isOrderExpired =
        order && order.end ? order.end * 1000 <= Date.now() : false;

      const address = await signer.getAddress();

      if (!order || isOrderExpired) {
        if (NFT) {
          if (
            address.toUpperCase() ===
            (owner?.address.toUpperCase() || NFT?._ownerAddress)
          ) {
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
    } catch (e) {}
  }, [isAuthenticated, signer, NFT, order, owner]);

  const fetchNftRoyalties = async () => {
    if (NFT?._collectionAddress && NFT.tokenId && signer) {
      const { nftRoyaltiesPercent } = await getRoyaltiesFromRegistry(
        NFT._collectionAddress,
        NFT.tokenId,
        signer
      );
      setNftRoyalties(+nftRoyaltiesPercent / 100);
    }
  };

  useEffect(() => {
    onMeasureChange && onMeasureChange(measure);
  }, [measure]);

  useEffect(() => {
    updateSectionState();
  }, [isAuthenticated, signer, NFT, order, updateSectionState]);

  useEffect(() => {
    fetchNftRoyalties();
  }, [signer, NFT?._collectionAddress, NFT?.tokenId]);

  useEffect(() => {
    setShowCountDown(
      !!(order?.end && new Date(order?.end * 1000) > new Date())
    );
  }, [order]);

  const [isPlaceABidPopupOpened, setIsPlaceABidPopupOpened] = useState(false);
  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] =
    useState(false);
  const [isChangeListingPricePopupOpened, setIsChangeListingPricePopupOpened] =
    useState(false);
  const [nftRoyalties, setNftRoyalties] = useState(0);

  const utcTimestamp = Math.floor(new Date().getTime() / 1000);

  const canCheckoutOrder =
    (!order?.start && !order?.end) || // Order doesn't have start and end
    (order.start &&
      order.end &&
      utcTimestamp > order.start &&
      utcTimestamp < order.end) || // Order has both start & end
    (order.start && !order.end && utcTimestamp > order.start) || // Order has only start
    (!order.start && order.end && utcTimestamp < order.end); // Order has only end

  const token = useMemo(() => {
    if (!order) {
      return TOKENS_MAP.ETH;
    }

    return getTokenByAddress(order.take?.assetType?.contract);
  }, [order]);

  const listingPrice = utils.formatUnits(
    order?.take?.value || 0,
    token.decimals ?? 18
  );

  const priceTicker = useMemo(() => {
    if (!order) {
      return '';
    }
    const orderTakeAsset = order.take.assetType as IOrderAssetTypeERC20;
    return getTokenByAddress(orderTakeAsset.contract).ticker;
  }, [order]);

  const renderBuyNowButton = () => (
    <Tooltip
      label={
        "Can't buy this NFT. It's either not available yet or already expired."
      }
      isDisabled={!!canCheckoutOrder}
      hasArrow
      shouldWrapChildren
      placement="top"
    >
      <Button
        boxShadow={"lg"}
        onClick={() => {
          if (NFT && collection && order) {
            checkoutNFT(NFT, collection, order);
          }
        }}
        disabled={!canCheckoutOrder}
        style={{ width: "100%" }}
      >
        Buy for{" "}
        {listingPrice && listingPrice.length > 7
          ? `${listingPrice.substring(0, 5)}...`
          : listingPrice
        }
        {` ${priceTicker}`}
      </Button>
    </Tooltip>
  );

  const renderRoyaltiesText = useCallback(() => !nftRoyalties ? null : (
    <Text {...styles.ContentFeeLabelStyle} textAlign={"center"} mt={"12px"}>
      ({nftRoyalties}% of sales will go to creator)
    </Text>
  ), [nftRoyalties]);

  if (state === undefined) {
    return <Box ref={ref}></Box>;
  }

  return (
    <Box {...styles.WrapperStyle} ref={ref}>
      {showCountDown && order && (
        <Box {...styles.CountDownWrapperStyle} cursor={"pointer"}>
          <Box {...styles.CountDownContentStyle}>
            <Text>
              <Image src={ClockIcon} />
              <Countdown
                date={new Date(order.end * 1000)}
                renderer={({ days, hours, minutes, seconds }) => {
                  if (!days && !hours && !minutes) {
                    return (
                      [seconds || minutes ? `${zeroPad(seconds)}s` : ""]
                        .filter(Boolean)
                        .join(" : ") + " left"
                    );
                  }
                  return (
                    [
                      days ? `${days}d` : "",
                      hours || days ? `${zeroPad(hours)}h` : "",
                      minutes || hours ? `${zeroPad(minutes)}m` : "",
                    ]
                      .filter(Boolean)
                      .join(" : ") + " left"
                  );
                }}
                onComplete={() => {
                  setShowCountDown(false);
                  updateSectionState();
                }}
              />
            </Text>
          </Box>
        </Box>
      )}
      <Box {...styles.ContentStyle}>
        {state === BuyNFTSectionState.BUYER_AUCTION_BID_N_OFFER && (
          <>
            <HighestBid />
            <SimpleGrid columns={2} spacingX={"12px"}>
              <Button
                boxShadow={"lg"}
                onClick={() => setIsPlaceABidPopupOpened(true)}
              >
                Place a bid
              </Button>
              <Button
                variant={"outline"}
                onClick={() => NFT && makeOffer(NFT, undefined)}
              >
                Make offer
              </Button>
            </SimpleGrid>
          </>
        )}
        {order && state === BuyNFTSectionState.BUYER_FIXED_LISTING_BUY_N_OFFER && (
          <>
            {highestOfferOrder && highestOfferOrder && (
              <HighestOffer
                offer={highestOfferOrder}
                creator={highestOfferCreator}
              />
            )}
            <SimpleGrid columns={2} spacingX={"12px"}>
              {renderBuyNowButton()}
              <Button
                variant={"outline"}
                onClick={() => NFT && order && makeOffer(NFT, order)}
              >
                Make offer
              </Button>
            </SimpleGrid>
            {renderRoyaltiesText()}
          </>
        )}
        {order && state === BuyNFTSectionState.BUYER_FIXED_LISTING_BUY && (
          <>
            {renderBuyNowButton()}
            {renderRoyaltiesText()}
          </>
        )}
        {state === BuyNFTSectionState.BUYER_AUCTION_BID && (
          <>
            <Button
              boxShadow={"lg"}
              w={"100%"}
              onClick={() => setIsPlaceABidPopupOpened(true)}
            >
              Place a bid
            </Button>
            {renderRoyaltiesText()}
          </>
        )}
        {state === BuyNFTSectionState.BUYER_NO_LISTING_OFFER && (
          <>
            {highestOfferOrder && highestOfferOrder && (
              <HighestOffer
                offer={highestOfferOrder}
                creator={highestOfferCreator}
              />
            )}
            <SimpleGrid columns={1} spacingX={"12px"}>
              <Button
                variant={"outline"}
                onClick={() => NFT && makeOffer(NFT, undefined)}
              >
                Make offer
              </Button>
            </SimpleGrid>
          </>
        )}
        {state === BuyNFTSectionState.OWNER_PUT_ON_SALE && (
          <>
            {highestOfferOrder && highestOfferOrder && (
              <HighestOffer
                offer={highestOfferOrder}
                creator={highestOfferCreator}
              />
            )}
            <Button
              boxShadow={"lg"}
              w={"100%"}
              onClick={() =>
                router.push(
                  `/nft/${NFT?._collectionAddress}/${NFT?.tokenId}/sell`
                )
              }
            >
              Put on sale
            </Button>
            <Text
              {...styles.ContentFeeLabelStyle}
              textAlign={"center"}
              mt={"12px"}
              color={"rgba(0, 0, 0, 0.4)"}
            >
              This NFT is in your wallet
            </Text>
          </>
        )}
        {state === BuyNFTSectionState.OWNER_AUCTION_LOWER_PRICE && (
          <>
            <HighestBid />
            <SimpleGrid columns={2} spacingX={"12px"}>
              <Button
                boxShadow={"lg"}
                _focus={{ boxShadow: "lg" }}
                onClick={() => setIsChangeListingPricePopupOpened(true)}
              >
                Lower Price
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setIsCancelListingPopupOpened(true)}
              >
                Cancel listing
              </Button>
            </SimpleGrid>
          </>
        )}
        {order &&
          state === BuyNFTSectionState.OWNER_FIXED_LISTING_CHANGE_PRICE && (
            <>
              {highestOfferOrder && highestOfferOrder && (
                <HighestOffer
                  offer={highestOfferOrder}
                  creator={highestOfferCreator}
                />
              )}
              <SimpleGrid columns={2} spacingX={"12px"}>
                <Button
                  boxShadow={"lg"}
                  onClick={() => setIsChangeListingPricePopupOpened(true)}
                >
                  Change price
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => setIsCancelListingPopupOpened(true)}
                >
                  Cancel listing
                </Button>
              </SimpleGrid>
              <Text
                {...styles.ContentFeeLabelStyle}
                textAlign={"center"}
                mt={"12px"}
              >
                This NFT is in your wallet and listed for{" "}
                <strong>{listingPrice}{" "}{priceTicker}</strong>
              </Text>
            </>
          )}
      </Box>
      <NFTPlaceABidPopup
        order={order}
        isOpen={isPlaceABidPopupOpened}
        onClose={() => setIsPlaceABidPopupOpened(false)}
      />
      <NFTCancelListingPopup
        order={order}
        isOpen={isCancelListingPopupOpened}
        onClose={() => setIsCancelListingPopupOpened(false)}
      />
      <NFTChangeListingPricePopup
        nft={NFT}
        order={order}
        isOpen={isChangeListingPricePopupOpened}
        onClose={() => setIsChangeListingPricePopupOpened(false)}
      />
    </Box>
  );
};
