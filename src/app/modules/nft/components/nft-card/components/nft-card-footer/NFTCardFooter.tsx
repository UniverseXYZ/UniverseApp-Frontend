import { Button, Box, BoxProps, Flex, HStack } from '@chakra-ui/react';
import React from 'react';

import { INFT, NFTStandard } from '@app/modules/nft/types';

import {
  NFTLike,
  BundleLabel,
  CompositionLabel,
  EditionsLabel,
  StandardLabel,
} from './components';
import * as styles from './NFTCardFooter.styles';

interface INFTCardFooterProps extends BoxProps {
  NFT: INFT;
  showBuyNowButton?: boolean;
  onBuy?: () => void;
}

export const NFTCardFooter = (props: INFTCardFooterProps) => {
  const {
    NFT,
    children,
    showBuyNowButton,
    onBuy,
    ...rest
  } = props;

  const isComposition = false;
  const isBundle = false;
  const showLikes = false;

  return (
    <Flex {...styles.Wrapper} {...rest}>
      {children ? children : (
        <>
          <Box className={showBuyNowButton ? 'hide-on-hover' : ''}>
            <HStack spacing={'6px'}>
              <StandardLabel standard={NFT.standard} />

              {(NFT.standard === NFTStandard.ERC1155) && (
                <EditionsLabel amount={NFT.tokenIds?.length ?? 1} />
              )}

              {/*TODO: composition*/}
              {(isComposition) && (<CompositionLabel count={10} />)}
              {(isBundle) && (<BundleLabel count={10} />)}
            </HStack>
          </Box>

          {(showBuyNowButton) && (
            <Box className={'show-on-hover'} display={'none'}>
              <HStack spacing={'6px'}>
                <Button
                  size='sm'
                  {...styles.BuyButton}
                  onClick={(e) => {
                    e.preventDefault();
                    onBuy && onBuy();
                  }}
                >Buy now</Button>
              </HStack>
            </Box>
          )}

          <HStack spacing={'6px'} ml={'auto'}>
            {/*TODO: likes*/}
            {(showLikes) && <NFTLike likes={[]} isLiked={true} />}
          </HStack>
        </>
      )}
    </Flex>
  );
};
