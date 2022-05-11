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
import {
  ICollection,
  IERC721AssetType,
  INFT,
  IOrder,
} from "../../types";
import { NFTCardAsset, NFTCardFooter, NFTCardContent, NFTCardCountdown } from './components';
import * as styles from "./NFTCard.styles";
import { useAuthStore } from '../../../../../stores/authStore';
import { useNftCheckoutStore } from '../../../../../stores/nftCheckoutStore';
import { GetNFT2Api, GetCollectionApi, GetActiveListingApi, GetBestAndLastOffer } from "../../../../api";

type IRenderFuncProps = {
  NFT: INFT;
  collection?: ICollection;
  isLoadingNFT: boolean;
  isLoadingCollection: boolean;
  bestOfferPrice?: number | string;
  bestOfferPriceToken?: TokenTicker;
  lastOfferPrice?: number | string;
  lastOfferPriceToken?: TokenTicker;
  order?: IOrder | null;
};

type IRenderFunc = ((props: IRenderFuncProps) => React.ReactNode) | null;

export interface INFTCardProps {
  NFT: INFT;
  order?: IOrder;
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
    NFT: initialNFT,
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

  const { setNFT, setCollection, setIsOpen, setOrder } = useNftCheckoutStore(s => ({
    setNFT: s. setNFT,
    setCollection: s. setCollection,
    setIsOpen: s. setIsOpen,
    setOrder: s. setOrder,
  }));

  // Get NFT Info Query
  const { data: NFT, isLoading: isLoadingNFT } = useQuery(
    nftKeys.nftInfo({
      collectionAddress: initialNFT._collectionAddress || "",
      tokenId: initialNFT.tokenId || "",
    }),
    () => GetNFT2Api(initialNFT._collectionAddress || "", initialNFT.tokenId, false),
    {
      retry: false,
      enabled: !!initialNFT._collectionAddress && !!initialNFT.tokenId,
      initialData: initialNFT,
    }
  );

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
    setIsOpen(true);
    setNFT(NFT || {} as INFT)
    setOrder(order || {} as IOrder);
    setCollection(collection as ICollection);
  }, [NFT, order, collection]);

  const [bestOfferPriceToken, bestOfferPrice] = useMemo(() => {
    if (!bestLastOfferData?.bestOffer) {
      return [null, null];
    }

    const token = getTokenByAddress((bestLastOfferData.bestOffer.make.assetType as IERC721AssetType).contract);
    const price = utils.formatUnits(bestLastOfferData.bestOffer.make.value || 0, token.decimals ?? 18);

    return [token, price];
  }, [bestLastOfferData]);

  const [lastOfferPriceToken, lastOfferPrice] = useMemo(() => {
    if (!bestLastOfferData?.lastOffer) {
      return [null, null];
    }

    const sources: Record<OrderSide, any> = {
      [OrderSide.BUY]: bestLastOfferData?.lastOffer.make,
      [OrderSide.SELL]: bestLastOfferData?.lastOffer.take,
    };

    const source = sources[bestLastOfferData.lastOffer.side as OrderSide];

    let token = getTokenByAddress((source.assetType as IERC721AssetType).contract);
    let price = utils.formatUnits(source.value || 0, token.decimals ?? 18);

    return [token, price];
  }, [bestLastOfferData]);

  const renderFuncProps: IRenderFuncProps = {
    NFT: NFT as INFT,
    collection: collection,
    order,
    isLoadingNFT,
    isLoadingCollection,
    bestOfferPrice: bestOfferPrice || "0",
    bestOfferPriceToken: bestOfferPriceToken?.ticker,
    lastOfferPrice: lastOfferPrice || "0",
    lastOfferPriceToken: lastOfferPriceToken?.ticker,
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
                    name={NFT.name}
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
