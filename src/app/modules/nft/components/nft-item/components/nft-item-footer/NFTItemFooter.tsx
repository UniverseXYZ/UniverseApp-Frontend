import { Box, BoxProps, Image, Text } from '@chakra-ui/react';
import React from 'react';

import ethereumIcon from '../../../../../../../assets/images/marketplace/eth-icon.svg';
import { INft } from '../../../../types';

interface IStyles {
  nameLine: BoxProps;
  additionLine: BoxProps;
}

const styles: IStyles = {
  nameLine: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 700,
    justifyContent: 'space-between',
    mb: '10px',
  },
  additionLine: {
    display: 'flex',
    fontSize: '10px',
    fontWeight: 600,
    justifyContent: 'space-between',
    color: '#00000066',
  },
};

interface INFTItemFooterProps {
  nft: INft;
  showNFTName?: boolean;
  showNFTPrice?: boolean;
}

export const NFTItemFooter = (
  {
    nft,
    showNFTName = true,
    showNFTPrice = true,
  }: INFTItemFooterProps
) => {
  return (
    <>
      <Box {...styles.nameLine}>
        <Box flex={1}>
          {showNFTName && (<Text>{nft.name}</Text>)}
        </Box>
        <Box>
          {showNFTPrice && nft.price && (
            <Text>
              <Image
                src={ethereumIcon}
                alt={'Ethereum icon'}
                display={'inline'}
                mx={'4px'}
                position={'relative'}
                top={'-2px'}
                width={'9px'}
              />
              {nft.price}
            </Text>
          )}
        </Box>
      </Box>
      <Box {...styles.additionLine}>
        <Box flex={1}>
          <Text>{nft.tokenIds?.length ?? 0}/{nft.numberOfEditions}</Text>
        </Box>
        <Box>
          <Text>
            Offer for
            <Image
              src={ethereumIcon}
              alt={'Ethereum icon'}
              display={'inline'}
              mx={'4px'}
              position={'relative'}
              top={'-1px'}
              width={'6px'}
            />
            <Box as={'span'} color={'black'}>0.35</Box>
          </Text>
        </Box>
      </Box>
    </>
  );
};
