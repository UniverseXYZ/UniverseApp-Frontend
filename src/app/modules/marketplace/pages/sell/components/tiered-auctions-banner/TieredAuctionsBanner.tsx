import { Box, Button, Center, Container, Heading, Image } from '@chakra-ui/react';
import universeTieredAuctionsBG
  from '../../../../../../../assets/images/sellNft/go-to-universe-auction-section-bg-img.png';
import arrowRight from '../../../../../../../assets/images/arrow-black.svg';
import React from 'react';

export const TieredAuctionsBanner = () => {
  return (
    <Box bgColor={'black'} h={'200px'} mt={'250px'}>
      <Container maxW={'var(--container-max-width)'} p={0}>
        <Box px={{ base: '20px', md: '60px', xl: 0 }}>
          <Box
            bgGradient={`
              radial-gradient(95.11% 95.11% at 36.64% 4.89%, #2AD0CA 0%, #E1F664 22.92%, #FEB0FE 46.88%, #ABB3FC 68.23%, #5DF7A4 87.5%, #58C4F6 100%),
              conic-gradient(from 176.21deg at 50% 50%, #000000 -24.66deg, #FFFFFF 0.25deg, #000000 50.63deg, #000000 51.97deg, #FFFFFF 88.12deg, #000000 142.5deg, #FFFFFF 196.87deg, #000000 256.87deg, #FFFFFF 300deg, #000000 335.2deg, #000000 335.34deg, #FFFFFF 360.25deg)`
            }
            borderRadius={'12px'}
            padding={'2px'}
            position={'relative'}
            top={'-150px'}
          >
            <Center
              h={'250px'}
              bgImage={universeTieredAuctionsBG}
              bgSize={'cover'}
              borderRadius={'inherit'}
            >
              <Box textAlign={'center'}>
                <Heading size={'lg'} mb={'28px'}>Universe tiered auctions</Heading>
                <Button rightIcon={<Image src={arrowRight} />}>Go to Universe auctions</Button>
              </Box>
            </Center>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
