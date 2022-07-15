import { HStack, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useNFTPageData } from '@app/modules/nft/pages/nft-page/NFTPage.context';
import * as styles from './TabDetails.styles';

export const TabDetails: React.FC = () => {
  const testData = useNFTPageData();
  const { NFT, collectionAddress, isPolymorph, isLobster, metadata } = testData

  const formatAddress = (addr: string, mdSlice = 13) => {
    return useBreakpointValue({
      base: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
      md: `${addr.slice(0, mdSlice)}...${addr.slice(-4)}`,
    })
  }

  const [, copyToClipboard] = useCopyToClipboard();

  const [copiedContractAddress, setCopiedContractAddress] = useState(false);
  const [copiedTokenId, setCopiedTokenId] = useState(false);
  const [copiedGenome, setCopiedGenome] = useState(false);

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
          : <Text {...styles.HashStyle} onClick={handleCopyContractAddress}>{formatAddress(collectionAddress)}</Text>
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
          : <Text {...styles.HashStyle} onClick={handleCopyGenome}>{formatAddress(metadata?.genomeString ?? "")}</Text>
      )
    },
    {
      show: !!(NFT.royalties?.length),
      name: "Royalties",
      renderValue: () => (
        <VStack spacing={"4px"} {...styles.SubWrapperStyle}>
          {NFT.royalties?.map(({ address, amount }, i) => (
            <HStack key={i} {...styles.SubItemStyle}>
              <Text>{formatAddress(address, 6)}</Text>
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
    </VStack>
  );
};
