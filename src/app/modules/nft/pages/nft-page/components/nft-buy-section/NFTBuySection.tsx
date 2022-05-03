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
import React, { useCallback, useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { useMeasure } from "react-use";
import { UseMeasureRect } from "react-use/lib/useMeasure";
import { useNftCheckoutStore } from "src/stores/nftCheckoutStore";
import ClockIcon from "../../../../../../../assets/images/clock.svg";
import { useAuthStore } from "../../../../../../../stores/authStore";
import { isEmpty } from "../../../../../../../utils/helpers";
import { getRoyaltiesFromRegistry } from "../../../../../../../utils/marketplace/utils";
import { getTokenByAddress } from "../../../../../../constants";
import {
  ICollection,
  IERC20AssetType,
  IERC721AssetType,
  INFT,
  IOrder,
  IUser,
} from "../../../../types";
import { useNFTPageData } from "../../NFTPage.context";
import { NFTCancelListingPopup } from "../nft-cancel-listing-popup";
import { NFTChangeListingPricePopup } from "../nft-change-listing-price-popup";
import { NFTMakeAnOfferPopup } from "../nft-make-an-offer-popup";
import { NFTPlaceABidPopup } from "../nft-place-a-bid-popup";
import { HighestBid } from "./components";
import { HighestOffer } from "./components/highest-offer";
import { BuyNFTSectionState } from "./enums";
import * as styles from "./styles";

interface INFTBuySectionProps {
  NFT?: INFT;
  owner?: IUser;
  NFTs?: INFT[];
  order?: IOrder;
  highestOffer?: { offer: IOrder; creator: IUser };
  onMeasureChange?: (measure: UseMeasureRect) => void;
}

export const NFTBuySection = (props: INFTBuySectionProps) => {
  const { NFT, owner, NFTs, order, highestOffer, onMeasureChange } = props;

  const [ref, measure] = useMeasure<HTMLDivElement>();

  const router = useRouter();

  const [state, setState] = useState<BuyNFTSectionState>();

  const [showCountDown, setShowCountDown] = useState(false);

  const { signer, isAuthenticated } = useAuthStore((s) => ({
    signer: s.signer,
    isAuthenticated: s.isAuthenticated,
  }));

  const { setIsOpen, setNFT, setCollection, setOrder } = useNftCheckoutStore(
    (s) => ({
      setIsOpen: s.setIsOpen,
      setNFT: s.setNFT,
      setCollection: s.setCollection,
      setOrder: s.setOrder,
    })
  );

  const { collection } = useNFTPageData();

  const updateSectionState = useCallback(async () => {
    if (!isAuthenticated || !signer) {
      return;
    }

    try {
      const isOrderExpired =
        order && order.end ? order.end * 1000 <= Date.now() : false;

      const address = (await signer.getAddress()) as string;

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

  const [isCheckoutPopupOpened, setIsCheckoutPopupOpened] = useState(false);
  const [isPlaceABidPopupOpened, setIsPlaceABidPopupOpened] = useState(false);
  const [isMakeAnOfferPopupOpened, setIsMakeAnOfferPopupOpened] =
    useState(false);
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
  const token = getTokenByAddress(
    (order?.take.assetType as IERC721AssetType)?.contract
  );
  const listingPrice = utils.formatUnits(
    order?.take?.value || 0,
    token.decimals ?? 18
  );
  const buyNowButton = () => (
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
          setIsOpen(true);
          setOrder(order || ({} as IOrder));
          setNFT(NFT || ({} as INFT));
          setCollection(collection || ({} as ICollection));
        }}
        disabled={!canCheckoutOrder}
        style={{ width: "100%" }}
      >
        Buy for{" "}
        {listingPrice && listingPrice.length > 7
          ? `${listingPrice.substring(0, 5)}...`
          : listingPrice}{" "}
        {
          getTokenByAddress((order?.take.assetType as IERC20AssetType).contract)
            .ticker
        }
      </Button>
    </Tooltip>
  );

  const royaltiesText = () => (
    <Text {...styles.ContentFeeLabelStyle} textAlign={"center"} mt={"12px"}>
      ({nftRoyalties}% of sales will go to creator)
    </Text>
  );

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
                onClick={() => setIsMakeAnOfferPopupOpened(true)}
              >
                Make offer
              </Button>
            </SimpleGrid>
          </>
        )}
        {order && state === BuyNFTSectionState.BUYER_FIXED_LISTING_BUY_N_OFFER && (
          <>
            {!isEmpty(highestOffer?.offer) && (
              <HighestOffer
                offer={highestOffer?.offer}
                creator={highestOffer?.creator as IUser}
              />
            )}
            <SimpleGrid columns={2} spacingX={"12px"}>
              {buyNowButton()}
              <Button
                variant={"outline"}
                onClick={() => setIsMakeAnOfferPopupOpened(true)}
              >
                Make offer
              </Button>
            </SimpleGrid>
            {!!nftRoyalties && royaltiesText()}
          </>
        )}
        {order && state === BuyNFTSectionState.BUYER_FIXED_LISTING_BUY && (
          <>
            {buyNowButton()}
            {!!nftRoyalties && royaltiesText()}
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
            {!!nftRoyalties && royaltiesText()}
          </>
        )}
        {state === BuyNFTSectionState.BUYER_NO_LISTING_OFFER && (
          <>
            {!isEmpty(highestOffer?.offer) && (
              <HighestOffer
                offer={highestOffer?.offer}
                creator={highestOffer?.creator as IUser}
              />
            )}
            <SimpleGrid columns={1} spacingX={"12px"}>
              <Button
                variant={"outline"}
                onClick={() => setIsMakeAnOfferPopupOpened(true)}
              >
                Make offer
              </Button>
            </SimpleGrid>
          </>
        )}
        {state === BuyNFTSectionState.OWNER_PUT_ON_SALE && (
          <>
            {!isEmpty(highestOffer?.offer) && (
              <HighestOffer
                offer={highestOffer?.offer}
                creator={highestOffer?.creator as IUser}
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
              {!isEmpty(highestOffer?.offer) && (
                <HighestOffer
                  offer={highestOffer?.offer}
                  creator={highestOffer?.creator as IUser}
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
                <strong>
                  {listingPrice}{" "}
                  {
                    getTokenByAddress(
                      (order?.take.assetType as IERC20AssetType).contract
                    ).ticker
                  }
                </strong>
              </Text>
            </>
          )}
      </Box>
      {/* <NFTCheckoutPopup
        NFT={NFT}
        NFTs={NFTs}
        order={order as IOrder}
        isOpen={isCheckoutPopupOpened}
        onClose={() => setIsCheckoutPopupOpened(false)}
      /> */}
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
