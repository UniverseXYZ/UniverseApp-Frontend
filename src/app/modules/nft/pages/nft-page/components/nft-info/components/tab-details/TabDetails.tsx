import { Box, HStack, Image, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import React, { useCallback, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useNFTPageData } from '@app/modules/nft/pages/nft-page/NFTPage.context';
import * as styles from './TabDetails.styles';
import copyOutlinedIcon from '@assets/images/copy-outlined.svg';

export const TabDetails: React.FC = () => {
  const { NFT, collectionAddress, isPolymorph, isLobster, metadata } = useNFTPageData();

  const formattedContractAddress = useBreakpointValue({
    base: `${collectionAddress.slice(0, 6)}...${collectionAddress.slice(-4)}`,
    md: `${collectionAddress.slice(0, 13)}...${collectionAddress.slice(-4)}`,
  });

  const formattedGenome = useBreakpointValue({
    base: `${metadata?.genomeString?.slice(0, 6)}...${metadata?.genomeString?.slice(-4)}`,
    md: `${metadata?.genomeString?.slice(0, 13)}...${metadata?.genomeString?.slice(-4)}`,
  });

  const formattedRoyaltiesAddress = (addr: string) => useBreakpointValue({
    base: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
    md: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
  });

  const [, copyToClipboard] = useCopyToClipboard();

  const [copiedContractAddress, setCopiedContractAddress] = useState(false);
  const [copiedTokenId, setCopiedTokenId] = useState(false);
  const [copiedGenome, setCopiedGenome] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopyContractAddress = useCallback(() => {
    copyToClipboard(collectionAddress);
    setCopiedContractAddress(true);

    setTimeout(() => setCopiedContractAddress(false), 1000);
  }, [collectionAddress]);

  const handleCopyTokenId = useCallback(() => {
    copyToClipboard(NFT.tokenId);
    setCopiedTokenId(true);

    setTimeout(() => setCopiedTokenId(false), 1000);
  }, [NFT]);

  const handleCopyGenome = useCallback(() => {
    copyToClipboard(metadata?.genomeString ?? "");
    setCopiedGenome(true);

    setTimeout(() => setCopiedGenome(false), 1000);
  }, [metadata]);

  const handleCopyJson = useCallback(() => {
    // TODO - pass copy string
    copyToClipboard("json");
    setCopiedJson(true);

    setTimeout(() => setCopiedJson(false), 1000);
  }, [metadata]);

  type IDetailItem = {
    show: boolean;
    name: string;
    renderValue: () => React.ReactNode;
  };

  const detailItems: IDetailItem[] = [
    {
      show: !!(collectionAddress),
      name: "Contract Address",
      renderValue: () => (
        copiedContractAddress
          ? <Text {...styles.HashStyle} cursor={"default"}>Copied!</Text>
          : <Text {...styles.HashStyle} onClick={handleCopyContractAddress}>{formattedContractAddress}</Text>
      )
    },
    {
      show: !!(NFT.tokenId),
      name: "Token ID",
      renderValue: () => (
        copiedTokenId
          ? <Text {...styles.HashStyle} cursor={"default"}>Copied!</Text>
          : <Text {...styles.HashStyle} onClick={handleCopyTokenId}>{NFT.tokenId}</Text>
      )
    },
    {
      show: !!(NFT.standard),
      name: "Token Standard",
      renderValue: () => (
        <Text color="rgba(0, 0, 0, 0.6)">{NFT.standard}</Text>
      )
    },
    {
      show: true,
      name: "Blockchain",
      renderValue: () => (
        <Text color="rgba(0, 0, 0, 0.6)">Ethereum</Text>
      )
    },
    {
      show: isPolymorph || isLobster,
      name: "Genome String",
      renderValue: () => (
        copiedGenome
          ? <Text {...styles.HashStyle} cursor={"default"}>Copied!</Text>
          : <Text {...styles.HashStyle} onClick={handleCopyGenome}>{formattedGenome}</Text>
      )
    },
    {
      show: !!(NFT.royalties?.length),
      name: "Royalties",
      renderValue: () => (
        <VStack spacing={"4px"} {...styles.SubWrapperStyle}>
          {NFT.royalties?.map(({ address, amount }, i) => (
            <HStack key={i} {...styles.SubItemStyle}>
              <Text>{formattedRoyaltiesAddress(address)}</Text>
              <span/>
              <Text>{amount}%</Text>
            </HStack>
          ))}
        </VStack>
      )
    },
  ];

  return (
    <VStack {...styles.WrapperStyle}>
      {detailItems.map(({ show, name, renderValue }, i) => !show ? null : (
        <HStack key={i} {...styles.ItemStyle} className={name === "Royalties" ? "u-column" : ""}>
          <Text>{name}</Text>
          {renderValue()}
        </HStack>
      ))}
      {/* This item is separate because of its different structure */}
      <HStack {...styles.ItemStyle} className="u-column">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Text>JSON</Text>
          {
            copiedJson
              ? <Text {...styles.HashStyle} cursor={"default"}>Copied!</Text>
              : <Image src={copyOutlinedIcon}  {...styles.CopyStyle} alt="Copy" onClick={handleCopyJson} />
          }
        </Box>
        <Box color="rgba(0, 0, 0, 0.6)" {...styles.JsonWrapperStyle}>
          test long text test long text test long text test long text test long text test long text
          test long text test long text test long text test long text test long text test long text
          test long text test long text test long text test long text test long text test long text
          test long text test long text test long text test long text test long text test long text
          test long text test long text test long text test long text test long text test long text
        </Box>
      </HStack>
    </VStack>
  );
};
