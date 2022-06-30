import { Box, Button, Container, Heading, Image, Text } from "@chakra-ui/react";

import * as styles from './TiersSection.styles';
import React, { useCallback } from "react";
import auctionTierPlaceholder from '@assets/images/auction-tier-placeholder.png';

export const TiersSection = () => {

  const handlePreviewNFTs = useCallback(() => {
    // TODO
  }, []);

  return (
    <Box {...styles.WrapperStyle}>
      <Container {...styles.ContainerStyle}>
        <Box {...styles.HeadingWrapperStyle}>
          <Heading {...styles.HeadingStyle}>Reward tiers</Heading>
          <Text {...styles.TextStyle}>Each Tier has different rewards and different winners! Look through the Tiers and the NFTs for each.</Text>
        </Box>
        <Box {...styles.TierWrapperStyle}>
          <Box display='flex' justifyContent='center' alignItems='flex-start' alignContent='flex-start'>
            <Box {...styles.TierImagesWrapperStyle}>
              <Image
                src={auctionTierPlaceholder}
                alt={'Premium tier'}
                borderRadius={'12px'}
                boxSize={{ base: '150px', lg: '200px' }}
              />
              <Image
                src={auctionTierPlaceholder}
                alt={'Premium tier'}
                borderRadius={'12px'}
                boxSize={{ base: '150px', lg: '200px' }}
              />
              <Image
                src={auctionTierPlaceholder}
                alt={'Premium tier'}
                borderRadius={'12px'}
                boxSize={{ base: '150px', lg: '200px' }}
              />
              <Box {...styles.MoreImagesBubbleStyle}>
                <Text as="span" fontSize="16px" lineHeight="16px">+12</Text>
                <Text as="span" fontSize="12px" lineHeight="12px">more</Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box display='flex' alignItems='center' mb={4}>
              <Box {...styles.TierSymbolStyle} className='u-platinium' />
              <Heading {...styles.TierHeadingStyle}>Platinum tier</Heading>
            </Box>
            <Box {...styles.TierDetailsWrapperStyle} mb={4}>
              <Box {...styles.TierDetailStyle}>Bidders #1-5</Box>
              <Box {...styles.TierDetailStyle}>NFTs: 24</Box>
              <Box {...styles.TierDetailStyle}>Reserve price: 0-2.3 ETH</Box>
            </Box>
            <Text {...styles.TierTextStyle} mb={6}>Amet nibh risus turpis mattis adipiscing. Vitae sit consectetur odio massa fusce scelerisque. Cras ante quisque urna sagittis eu nunc posuere posuere. Proin integer in purus pellentesque.</Text>
            <Button {...styles.TierButtonStyle} onClick={handlePreviewNFTs}>
              Preview NFTs
            </Button>
          </Box>
        </Box>
        <Box {...styles.TierWrapperStyle}>
          <Box display='flex' justifyContent='center'>
            <Box {...styles.TierImagesWrapperStyle}>
              <Image
                src={auctionTierPlaceholder}
                alt={'Gold tier'}
                borderRadius={'12px'}
                boxSize={{ base: '150px', lg: '200px' }}
              />
              <Image
                src={auctionTierPlaceholder}
                alt={'Gold tier'}
                borderRadius={'12px'}
                boxSize={{ base: '150px', lg: '200px' }}
              />
            </Box>
          </Box>
          <Box>
            <Box display='flex' alignItems='center' mb={4}>
              <Box {...styles.TierSymbolStyle} className='u-gold' />
              <Heading {...styles.TierHeadingStyle}>Gold tier</Heading>
            </Box>
            <Box {...styles.TierDetailsWrapperStyle} mb={4}>
              <Box {...styles.TierDetailStyle}>Bidders #6-15</Box>
              <Box {...styles.TierDetailStyle}>NFTs: 16</Box>
            </Box>
            <Text {...styles.TierTextStyle} mb={6}>Amet nibh risus turpis mattis adipiscing. Vitae sit consectetur odio massa fusce scelerisque.</Text>
            <Button {...styles.TierButtonStyle} onClick={handlePreviewNFTs}>
              Preview NFTs
            </Button>
          </Box>
        </Box>
        <Box {...styles.TierWrapperStyle}>
          <Box display='flex' justifyContent='center'>
            <Box {...styles.TierImagesWrapperStyle}>
              <Image
                src={auctionTierPlaceholder}
                alt={'Silver tier'}
                borderRadius={'12px'}
                boxSize={{ base: '150px', lg: '200px' }}
              />
            </Box>
          </Box>
          <Box>
            <Box display='flex' alignItems='center' mb={4}>
              <Box {...styles.TierSymbolStyle} className='u-silver' />
              <Heading {...styles.TierHeadingStyle}>Silver tier</Heading>
            </Box>
            <Box {...styles.TierDetailsWrapperStyle} mb={4}>
              <Box {...styles.TierDetailStyle}>Bidders #16-35</Box>
              <Box {...styles.TierDetailStyle}>NFTs: 19</Box>
            </Box>
            <Text {...styles.TierTextStyle} mb={6}>Faucibus et. Sagittis condimentum etiam quisque viverra consequat nec pharetra aenean egestas.</Text>
            <Button {...styles.TierButtonStyle} onClick={handlePreviewNFTs}>
              Preview NFTs
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
