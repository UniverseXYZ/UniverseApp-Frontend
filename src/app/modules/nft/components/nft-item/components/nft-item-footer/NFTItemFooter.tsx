import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import { INft } from '../../../../types';
import { NFTItemPrice } from '../nft-item-price';
import { NFTItemPriceInfo } from '../nft-item-price-info';

interface IStyles {
  nameRow: BoxProps;
  additionsRow: BoxProps;
}

const styles: IStyles = {
  nameRow: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 700,
    justifyContent: 'space-between',
    mb: '10px',
  },
  additionsRow: {
    display: 'flex',
    fontSize: '10px',
    fontWeight: 600,
    justifyContent: 'space-between',
    color: '#00000066',
  },
};

interface INFTItemFooterProps {
  nft: INft;
  renderNFTName?: React.ReactNode | null;
  renderNFTPrice?: React.ReactNode | null;
  renderNFTAdditions?: React.ReactNode | null;
  renderNFTPriceInfo?: React.ReactNode | null;
}

export const NFTItemFooter = (
  {
    nft,
    renderNFTName,
    renderNFTPrice,
    renderNFTAdditions,
    renderNFTPriceInfo,
  }: INFTItemFooterProps
) => {
  return (
    <>
      <Box {...styles.nameRow}>
        <Box flex={1}>
          {renderNFTName || renderNFTName === null ? renderNFTName : <Text>{nft.name}</Text>}
        </Box>
        <Box>
          {renderNFTPrice || renderNFTPrice === null ? renderNFTPrice : (nft.price && (
            <NFTItemPrice price={nft.price} />
          ))}
        </Box>
      </Box>
      <Box {...styles.additionsRow}>
        <Box flex={1}>
          {renderNFTAdditions || renderNFTAdditions === null ? renderNFTAdditions : (
            <Text>{nft.tokenIds?.length ?? 0}/{nft.numberOfEditions}</Text>
          )}
        </Box>
        <Box>
          {renderNFTPriceInfo || renderNFTPriceInfo === null ? renderNFTPriceInfo : (
            <NFTItemPriceInfo offerPrice={nft.offerPrice} lastPrice={nft.lastPrice} />
          )}
        </Box>
      </Box>
    </>
  );
};
