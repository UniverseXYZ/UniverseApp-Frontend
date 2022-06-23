import { Box, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { utils } from "ethers";
import NextLink from "next/link";
import React, { useCallback, useMemo } from 'react';
import { useQuery } from "react-query";

import { ItemWrapper } from '@app/components';
import { getTokenByAddress } from '@app/constants';
import { TokenTicker } from '@app/enums';
import {
  collectionKeys,
  nftKeys,
  orderKeys,
} from '@app/utils/query-keys';

import { OrderSide, OrderStatus } from "../../../marketplace/enums";
import { ICollection } from "../../../collection/types";
import { INFT, IOrder, IOrderAssetTypeSingleListing, IOrderAssetTypeERC20 } from '../../types';
import { NFTCardAsset, NFTCardFooter, NFTCardContent, NFTCardCountdown } from './components';
import * as styles from "./NFTCard.styles";
import { useAuthStore } from '../../../../../stores/authStore';
import { useNftCheckoutStore } from '../../../../../stores/nftCheckoutStore';
import { GetCollectionApi, GetActiveListingApi, GetBestAndLastOffer } from "../../../../api";

type IRenderFuncProps = {
  NFT: INFT;
  collection?: ICollection;
  order?: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;
};

type IRenderFunc = ((props: IRenderFuncProps) => React.ReactNode) | null;

export interface INFTCardProps {
  NFT: INFT;
  order?: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;
  isSelected?: boolean;
  selectedLabel?: string;
  showBuyNowButton?: boolean;
  renderHeader?: IRenderFunc;
  renderAsset?: IRenderFunc;
  renderContent?: IRenderFunc;
  renderFooter?: IRenderFunc;

  onClick?: (e: React.MouseEvent<HTMLElement>, NFT: INFT) => void;
  onTimerEnd?: () => void;
}

export const NFTCard = (props: INFTCardProps) => {
  const {
    NFT,
    order: initialOrder,
    isSelected,
    selectedLabel,
    showBuyNowButton = true,
    renderHeader,
    renderAsset,
    renderContent,
    renderFooter,
    onClick,
    onTimerEnd,
  } = props;

  const { userAddress, isAuthenticated } = useAuthStore(s => ({
    userAddress: s.address,
    isAuthenticated: s.isAuthenticated
  }));

  const { checkoutNFT } = useNftCheckoutStore();

  // Get Collection Info Query
  const { data: collection, isLoading: isLoadingCollection } = useQuery(
    collectionKeys.centralizedInfo(NFT?._collectionAddress ?? ''),
    () => GetCollectionApi(NFT?._collectionAddress ?? ''),
    {
      retry: false,
      enabled: !!NFT?._collectionAddress,
    }
  );

  // Get Active Listing Query
  const { data: order } = useQuery(
    orderKeys.listing({
      collectionAddress: NFT?._collectionAddress || "",
      tokenId: NFT?.tokenId || "",
    }),
    () => GetActiveListingApi(NFT?._collectionAddress ?? "", NFT?.tokenId ?? ""),
    {
      retry: false,
      enabled: !initialOrder && !!NFT?._collectionAddress && !!NFT?.tokenId,
      initialData: initialOrder,
    }
  );

  // Get Last And Best Offer Query
  const { data: bestLastOfferData } = useQuery(
    orderKeys.cardOffers({
      collectionAddress: NFT?._collectionAddress || "",
      tokenId: NFT?.tokenId || "",
    }),
    () => GetBestAndLastOffer(NFT?._collectionAddress || "", NFT?.tokenId || ""),
    {
      retry: false,
      enabled: !!NFT?._collectionAddress && !!NFT?.tokenId,
    }
  );

  const handleBuy = useCallback(() => {
    if (NFT && collection && order) {
      checkoutNFT(NFT, collection, order);
    }
  }, [NFT, collection, order]);

  const [bestOfferPriceToken, bestOfferPrice] = useMemo(() => {
    if (!bestLastOfferData?.bestOffer) {
      return [null, null];
    }

    const { bestOffer } = bestLastOfferData;

    const token = getTokenByAddress(bestOffer.make.assetType.contract);
    const price = utils.formatUnits(bestOffer.make.value || 0, token.decimals ?? 18);

    return [token, price];
  }, [bestLastOfferData]);

  const [lastOfferPriceToken, lastOfferPrice] = useMemo(() => {
    if (!bestLastOfferData?.lastOffer) {
      return [null, null];
    }

    const { lastOffer } = bestLastOfferData;

    const token = getTokenByAddress(lastOffer.make.assetType.contract);
    const price = utils.formatUnits(lastOffer.make.value || 0, token.decimals ?? 18);

    return [token, price];
  }, [bestLastOfferData]);

  const renderFuncProps: IRenderFuncProps = {
    NFT,
    collection,
    order: order || undefined,
  };

  const isBuyButtonAvailable = showBuyNowButton
    && isAuthenticated
    && userAddress?.toLowerCase() !== NFT?._ownerAddress?.toLowerCase()
    && order?.side === OrderSide.SELL
    && order?.status === OrderStatus.CREATED
  ;

  return (
    <ItemWrapper
      isBundle={NFT && NFT.numberOfEditions > 1}
      isSelected={isSelected}
      selectedLabel={selectedLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => onClick && onClick(e, NFT as INFT)}
    >
      <LinkBox>
        <NextLink href={`/nft/${NFT?._collectionAddress}/${NFT?.tokenId}`}>
          <LinkOverlay display={"contents"}>
            {!NFT || renderHeader === null ? null :
              renderHeader ? renderHeader(renderFuncProps) : null
            }

            <Box
              {...styles.AssetContainerStyle}
              borderRadius={renderHeader ? "" : "12px 12px 0 0"}
            >
              {!NFT || renderAsset === null ? null :
                renderAsset ? renderAsset(renderFuncProps) : (
                  <NFTCardAsset NFT={NFT} />
                )
              }

              {!!order?.end && (
                <NFTCardCountdown
                  date={new Date(order.end * 1000)}
                  onComplete={() => onTimerEnd && onTimerEnd()}
                />
              )}
            </Box>
            <Box {...styles.NFTContentStyle}>
              {!NFT || renderContent === null ? null :
                renderContent ? renderContent(renderFuncProps) : (
                  <NFTCardContent
                    NFT={NFT}
                    collection={collection}
                    order={order || undefined}
                    bestOfferPrice={bestOfferPrice || 0}
                    bestOfferPriceToken={bestOfferPriceToken?.ticker || undefined}
                    lastOfferPrice={lastOfferPrice || 0}
                    lastOfferPriceToken={lastOfferPriceToken?.ticker || undefined}
                  />
                )
              }

              {!NFT || renderFooter === null ? null :
                renderFooter ? renderFooter(renderFuncProps) : (
                  <NFTCardFooter
                    NFT={NFT as INFT}
                    showBuyNowButton={isBuyButtonAvailable}
                    onBuy={handleBuy}
                  />
                )
              }
            </Box>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ItemWrapper>
  );
};
