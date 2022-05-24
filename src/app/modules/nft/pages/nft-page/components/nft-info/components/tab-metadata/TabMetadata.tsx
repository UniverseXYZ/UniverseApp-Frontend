import { HStack, Link, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useCopyToClipboard } from 'react-use';

import { TokenIcon } from '@app/components';
import { TokenTicker } from '@app/enums';
import { useNFTPageData } from '@app/modules/nft/pages/nft-page/NFTPage.context';

import * as s from './TabMetadata.styles';

export const TabMetadata: React.FC = () => {
  const { isPolymorph, isLobster, metadata } = useNFTPageData();

  const formattedOwnerAddress = useBreakpointValue({
    base: `${metadata?.owner?.slice(0, 6)}...${metadata?.owner?.slice(-4)}`,
    md: `${metadata?.owner?.slice(0, 13)}...${metadata?.owner?.slice(-4)}`,
  });

  const formattedGenome = useBreakpointValue({
    base: `${metadata?.genomeString?.slice(0, 6)}...${metadata?.genomeString?.slice(-4)}`,
    md: `${metadata?.genomeString?.slice(0, 13)}...${metadata?.genomeString?.slice(-4)}`,
  });

  const [, copyToClipboard] = useCopyToClipboard();

  const [copiedGenome, setCopiedGenome] = useState(false);

  const handleCopyGenome = useCallback(() => {
    copyToClipboard(metadata?.genomeString ?? "");
    setCopiedGenome(true);

    setTimeout(() => setCopiedGenome(false), 1000);
  }, [metadata]);

  const ownerLink = useMemo<string | null>(() => {
    if (!metadata?.owner) {
      return null;
    }

    let contract = null;

    switch (true) {
      case isPolymorph:
        contract = process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS;
        break;
      case isLobster:
        contract = process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS;
        break;
    }

    return !contract ? null : `${process.env.REACT_APP_ETHERSCAN_URL}/token/${contract}?a=${metadata.owner}`;
  }, [metadata, isPolymorph, isLobster]);

  type IMetadataItem = {
    show: boolean;
    name: string;
    renderValue: () => React.ReactNode;
  };

  const metadataItems: IMetadataItem[] = [
    {
      show: !!(metadata?.nextMorphPrice),
      name: "Next morph price",
      renderValue: () => (
        <HStack spacing={"4px"}>
          <TokenIcon ticker={TokenTicker.ETH} boxSize={"20px"} />
          <Text fontSize={"18px"} fontWeight={700}>{metadata?.nextMorphPrice}</Text>
        </HStack>

      )
    },
    {
      show: !!ownerLink,
      name: "Owner",
      renderValue: () => (
        <Link
          href={ownerLink ? ownerLink : ''}
          target={"_blank"}
          rel={"noreferrer"}
          {...s.HashStyle}
        >{formattedOwnerAddress}</Link>)
    },
    {
      show: !!(metadata?.genomeString),
      name: "Genome string",
      renderValue: () => copiedGenome
        ? <Text {...s.HashStyle} cursor={"default"}>Copied!</Text>
        : <Text {...s.HashStyle} onClick={handleCopyGenome}>{formattedGenome}</Text>,
    },
  ];

  return (
    <VStack spacing={"20px"}>
      {metadataItems.map(({ show, name, renderValue }, i) => !show ? null : (
        <HStack key={i} {...s.ItemStyle}>
          <Text>{name}</Text>
          {renderValue()}
        </HStack>
      ))}
    </VStack>
  );
};
