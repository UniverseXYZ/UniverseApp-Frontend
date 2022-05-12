import { CollectionPreview, TokenIcon } from "@app/components";
import { getTokenByAddress, TOKENS_MAP } from "@app/constants";
import { TokenTicker } from "@app/enums";
import { Box, Flex, HStack, Link, Text, Tooltip } from "@chakra-ui/react";
import { utils } from "ethers";
import NextLink from "next/link";
import React, { useMemo } from "react";
import { ICollection } from "../../../../../collection/types";
import { IERC20AssetType, INFT, IOrder } from "../../../../types";
import { formatPrice, formatSecondaryPrice } from "./helpers";
import * as styles from "./NFTCardContent.styles";

export interface INFTCardContentProps {
  NFT: INFT;
  collection?: ICollection;
  order?: IOrder;
  bestOfferPrice?: number | string;
  bestOfferPriceToken?: TokenTicker;
  lastOfferPrice?: number | string;
  lastOfferPriceToken?: TokenTicker;
}

export const NFTCardContent = (props: INFTCardContentProps) => {
  const {
    NFT,
    collection,
    order,
    bestOfferPrice,
    bestOfferPriceToken,
    lastOfferPrice,
    lastOfferPriceToken,
  } = props;

  const [additionPriceLabel, additionPriceValue, additionPriceToken] =
    useMemo(() => {
      const defaultTicker = TOKENS_MAP.ETH.ticker;

      if (Number(bestOfferPrice)) {
        return [
          "Offer",
          bestOfferPrice?.toString(),
          bestOfferPriceToken ?? defaultTicker,
        ];
      }

      if (Number(lastOfferPrice)) {
        return [
          "Last",
          lastOfferPrice?.toString(),
          lastOfferPriceToken ?? defaultTicker,
        ];
      }

      return [null, null, defaultTicker];
    }, [
      bestOfferPrice,
      bestOfferPriceToken,
      lastOfferPrice,
      lastOfferPriceToken,
    ]);

  const [priceToken, price] = useMemo(() => {
    if (!order) {
      return [TOKENS_MAP.ETH, ""];
    }

    const token = getTokenByAddress(
      (order.take.assetType as IERC20AssetType).contract
    );
    const price = utils.formatUnits(order.take.value, `${token.decimals}`);

    return [token, price];
  }, [order]);

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        fontSize={"14px"}
        fontWeight={700}
        mb={"6px"}
      >
        <Text {...styles.NFTName}>{NFT.name}</Text>
        {order && (
          <HStack spacing={"4px"}>
            <Tooltip label={priceToken.ticker} hasArrow placement={"top"}>
              <Box>
                <TokenIcon ticker={priceToken.ticker} boxSize={"20px"} />
              </Box>
            </Tooltip>
            {/*TODO: provide text "top bit" | "min bit" in case of auction*/}
            <Text>{formatPrice(price)}</Text>
          </HStack>
        )}
      </Flex>

      <Flex
        justifyContent={"space-between"}
        alignItems={"top"}
        mb={"14px"}
        onClick={(e) => e.stopPropagation()}
      >
        <CollectionPreview
          collection={
            collection?.address ? collection : NFT._collectionAddress || null
          }
        >
          <Text {...styles.CollectionName} tabIndex={0}>
            <NextLink href={`/collection/${collection?.address}`} passHref>
              <Link {...styles.CollectionLink}>
                {collection?.name ||
                  collection?.address ||
                  NFT._collectionAddress}
              </Link>
            </NextLink>
          </Text>
        </CollectionPreview>
        <Box>
          {additionPriceValue && (
            <HStack spacing={"4px"} fontSize={"11px"} fontWeight={600}>
              <Text color={"#00000066"}>{additionPriceLabel}</Text>
              <Tooltip label={additionPriceToken} hasArrow placement={"top"}>
                <Box>
                  <TokenIcon ticker={additionPriceToken} boxSize={"16px"} />
                </Box>
              </Tooltip>
              <Text color={"black"}>
                {formatSecondaryPrice(additionPriceValue)}
              </Text>
            </HStack>
          )}
        </Box>
      </Flex>
    </>
  );
};
