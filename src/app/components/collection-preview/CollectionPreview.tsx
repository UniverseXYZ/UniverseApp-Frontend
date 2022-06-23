import {
  getArtistApi,
  GetCollectionApi,
  GetCollectionGeneralInfo,
  GetCollectionNFTsApi,
  GetCollectionOrderBookData,
} from "@app/api";
import { Loading } from "@app/components";
import { formatAddress } from "@app/helpers";
import { IUser } from '@app/modules/account/types';
import { ICollection } from "@app/modules/collection/types";
import { collectionKeys } from "@app/utils/query-keys";
import EthIcon from "@assets/images/eth-icon-new.svg";
import {
  Box,
  Center,
  Flex,
  Image, Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Contracts from "@legacy/contracts.json";
import { Contract, providers, utils } from "ethers";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useCopyToClipboard } from "react-use";
import NextLink from "next/link";
import * as styles from "./CollectionPreview.styles";

const formatPrice = (price: string) => {
  return Number(price) < 0.001
    ? "< 0.001"
    : price && price.length > 7
    ? `> ${price.substring(0, 5)}`
    : price;
};

interface ICollectionPreviewProps {
  collection: ICollection | string | null;
  children:
    | React.ReactChild
    | ((collection: ICollection | null) => React.ReactChild);
}

export const CollectionPreview = (props: ICollectionPreviewProps) => {
  const { collection: initialCollection, children } = props;

  const [_, copyToClipboard] = useCopyToClipboard();

  const [showCopiedAddress, setShowCopiedAddress] = useState(false);

  const collectionAddress: string | null = typeof initialCollection === "string"
    ? initialCollection
    : initialCollection?.address || null;

  const { data: collection, isLoading: isLoadingCollection } = useQuery(
    collectionKeys.centralizedInfo(collectionAddress || ""),
    () => GetCollectionApi(collectionAddress as string),
    {
      retry: false,
      enabled:
        typeof initialCollection === "string" && initialCollection.length > 0,
      initialData:
        initialCollection && initialCollection !== "string"
          ? (initialCollection as ICollection)
          : null,
    }
  );

  const { data: collectionOwner } = useQuery<Pick<IUser, "address" | "displayName" | "universePageUrl"> | null>(
    collectionKeys.collectionOwner(collectionAddress || ""),
    async () => {
      try {
        const network = providers.getNetwork(
          +`${process.env.REACT_APP_NETWORK_CHAIN_ID}`
        );
        const provider = providers.getDefaultProvider(network);

        const chainId = process.env.REACT_APP_NETWORK_CHAIN_ID || null;

        if (chainId === null) {
          throw new Error("Chain ID is missing !");
        }

        // @ts-ignore
        const { abi } = Contracts[chainId].contracts.UniverseERC721Core;

        const contract = new Contract(utils.getAddress(`${collectionAddress}`.toLowerCase()), abi, provider);

        const address = (await contract.owner())?.toLowerCase?.() ?? undefined;

        if (address) {
          const artist = await getArtistApi(address);

          if (artist?.mappedArtist?.displayName) {
            return {
              address: address,
              displayName: artist?.mappedArtist?.displayName || undefined,
              universePageUrl: artist?.mappedArtist?.universePageUrl || undefined,
            };
          }
          return { address };
        }
      } catch (e) {}

      return null;
    },
    {
      retry: false,
      enabled: !!collectionAddress,
    }
  );

  const { data: collectionStatistic } = useQuery(
    collectionKeys.collectionStatistic(collectionAddress || ""),
    async () => {
      const [NFTsResponse, ownersResponse, orderResponse] =
        await Promise.allSettled([
          GetCollectionNFTsApi(
            utils.getAddress(`${collection?.address}`.toLowerCase()),
            1,
            1,
            ""
          ),
          GetCollectionGeneralInfo(`${collection?.address}`),
          GetCollectionOrderBookData(`${collection?.address}`),
        ]);

      return {
        NFTs:
          NFTsResponse.status === "fulfilled" ? NFTsResponse.value.total : 0,
        owners:
          ownersResponse.status === "fulfilled"
            ? ownersResponse.value.owners
            : "-",
        floorPrice:
          orderResponse.status !== "fulfilled" ||
          parseFloat(orderResponse.value.floorPrice) === 0
            ? null
            : formatPrice(utils.formatEther(orderResponse.value.floorPrice)),
        volumeTraded:
          orderResponse.status !== "fulfilled" ||
          parseFloat(orderResponse.value.volumeTraded) === 0
            ? null
            : formatPrice(utils.formatEther(orderResponse.value.volumeTraded)),
      };
    },
    {
      retry: false,
      enabled: !!collectionAddress,
    }
  );

  const handleCopyCollectionAddress = useCallback(() => {
    copyToClipboard(collectionAddress ?? '');
    setShowCopiedAddress(true);
    setTimeout(() => {
      setShowCopiedAddress(false);
    }, 1000);
  }, [collectionAddress]);

  const renderCollection = useCallback(() => {
    return (
      <Flex flexDir={"column"}>
        <Box
          {...styles.getBannerImageStyles(
            collection?.bannerUrl,
            collection?.address
          )}
        />
        <Center
          {...styles.getCoverImageStyles(
            collection?.coverUrl,
            collection?.address
          )}
        >
          {!collection?.coverUrl && collection?.name ? (
            <Text>{collection?.name.charAt(0)}</Text>
          ) : null}
        </Center>
        <VStack spacing={"16px"} p={"16px"}>
          <Text {...styles.Name}>{collection?.name}</Text>
          <SimpleGrid
            columns={collectionOwner ? 2 : 1}
            spacing={"8px"}
            w={"100%"}
          >
            <Box {...styles.GridItem}>
              <Text {...styles.GridItemLabel}>Contract address</Text>
              {showCopiedAddress ? (
                <Text {...styles.GridItemValue} cursor={'text'}>Copied!</Text>
              ) : (
                <Text {...styles.GridItemValue} onClick={() => handleCopyCollectionAddress()}>
                  {formatAddress(collectionAddress ?? null)}
                </Text>
              )}
            </Box>
            {collectionOwner && (
              <Box {...styles.GridItem}>
                <Text {...styles.GridItemLabel}>Owned by</Text>
                <NextLink href={`/${collectionOwner.universePageUrl || collectionOwner.address}`} passHref>
                  <Link {...styles.GridItemValue}>
                    {collectionOwner?.displayName || formatAddress(collectionOwner.address)}
                  </Link>
                </NextLink>
              </Box>
            )}
          </SimpleGrid>

          <SimpleGrid columns={4} spacing={"10px"} w={"100%"}>
            <Box {...styles.StatisticGridItem}>
              <Text {...styles.StatisticGridItemLabel}>Items</Text>
              <Text {...styles.StatisticGridItemValue}>
                {collectionStatistic?.NFTs || "-"}
              </Text>
            </Box>
            <Box {...styles.StatisticGridItem}>
              <Text {...styles.StatisticGridItemLabel}>Owners</Text>
              <Text {...styles.StatisticGridItemValue}>
                {collectionStatistic?.owners || "-"}
              </Text>
            </Box>
            <Box {...styles.StatisticGridItem}>
              <Text {...styles.StatisticGridItemLabel}>Floor</Text>
              <Text {...styles.StatisticGridItemValue}>
                {!collectionStatistic?.floorPrice ? (
                  "-"
                ) : (
                  <>
                    <Image
                      src={EthIcon}
                      alt={"Ethereum icon"}
                      {...styles.EthereumIcon}
                    />
                    {collectionStatistic?.floorPrice}
                  </>
                )}
              </Text>
            </Box>
            <Box {...styles.StatisticGridItem}>
              <Text {...styles.StatisticGridItemLabel}>Volume</Text>
              <Text {...styles.StatisticGridItemValue}>
                {!collectionStatistic?.volumeTraded ? (
                  "-"
                ) : (
                  <>
                    <Image
                      src={EthIcon}
                      alt={"Ethereum icon"}
                      {...styles.EthereumIcon}
                    />
                    {collectionStatistic?.volumeTraded}
                  </>
                )}
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </Flex>
    );
  }, [collection, collectionOwner, collectionStatistic, showCopiedAddress]);

  const renderLoading = useCallback(() => {
    return (
      <Box p={"16px"}>
        <Loading />
      </Box>
    );
  }, []);

  return (
    <Popover trigger={"hover"} isLazy={true}>
      <PopoverTrigger>
        {typeof children === "function" ? children(null) : children}
      </PopoverTrigger>
      <Portal>
        <PopoverContent {...styles.PopoverContent}>
          <PopoverBody p={0}>
            {isLoadingCollection && renderLoading()}
            {!isLoadingCollection && renderCollection()}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
