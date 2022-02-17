import {
  Box, BoxProps, Image,
  Text, TextProps,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useBoolean } from 'react-use';

import { INft } from '../../types';
import {
  NFTItemAssetAudioLabel,
  NFTItemAssetVideoLabel,
  NFTItemHeader,
  NFTItemAsset,
  NFTItemAuctionTimer,
} from './components';
import { ItemWrapper } from '../../../../components';

import ethereumIcon from './../../../../../assets/images/marketplace/eth-icon.svg';

interface IStyles {
  assetContainer: BoxProps;
  assetLabelContainer: BoxProps;
  footer: {
    nameLine: BoxProps;
    additionLine: BoxProps;
  }
}

const styles: IStyles = {
  assetContainer: {
    borderRadius: '6px',
    my: '16px',
    overflow: 'hidden',
    position: 'relative',
  },
  assetLabelContainer: {
    display: 'flex',
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
  },
  footer: {
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
    }
  },
};

interface INftItemProps {
  nft: INft;
  isSelected?: boolean;
  selectedLabel?: string;
  onAuctionTimeOut?: () => void;

  showAuctionTimer?: boolean;
  showNFTName?: boolean;
  showNFTPrice?: boolean;

  renderAssetLabel?: React.ReactNode;
  assetLabelContainerProps?: BoxProps;

  renderFooter?: React.ReactNode;
}

export const NftItem = (
  {
    nft,
    isSelected,
    selectedLabel,
    onAuctionTimeOut,
    showAuctionTimer = true,
    showNFTName = true,
    showNFTPrice = true,
    renderAssetLabel,
    assetLabelContainerProps,
    renderFooter,
  }: INftItemProps
) => {
  const [existAuctionTimer, toggleExistAuctionTimer] = useBoolean(!!nft.auctionExpDate);

  const handleAuctionTimeOut = useCallback(() => {
    toggleExistAuctionTimer(false);
    onAuctionTimeOut && onAuctionTimeOut();
  }, [onAuctionTimeOut]);

  return (
    <ItemWrapper isBundle={nft.tokenIds.length > 1} isSelected={isSelected} selectedLabel={selectedLabel}>

      {/*TODO: add render header*/}
      <NFTItemHeader nft={nft} />

      <Box {...styles.assetContainer}>

        <NFTItemAsset nft={nft} showSwiperPagination={!showAuctionTimer || !existAuctionTimer} />

        <Box {...styles.assetLabelContainer} {...assetLabelContainerProps}>
          {renderAssetLabel ? renderAssetLabel : (
            <>
              {nft.isAudio && (<NFTItemAssetAudioLabel />)}
              {nft.isVideo && (<NFTItemAssetVideoLabel />)}
            </>
          )}
        </Box>

        {showAuctionTimer && existAuctionTimer && (
          <NFTItemAuctionTimer expDate={nft.auctionExpDate} onAuctionTimeOut={handleAuctionTimeOut}  />
        )}
      </Box>

      {renderFooter ? renderFooter : (
        <>
          <Box {...styles.footer.nameLine}>
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
          <Box {...styles.footer.additionLine}>
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
      )}
    </ItemWrapper>
  );
};
