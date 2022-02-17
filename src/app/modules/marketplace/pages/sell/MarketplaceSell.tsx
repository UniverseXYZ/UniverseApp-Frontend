import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Container, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';

import bg from '../../../../../assets/images/marketplace/v2/bg.png';

import singleIcon from '../../../../../assets/images/sellNft/single-icon.svg';
import collectionIcon from '../../../../../assets/images/sellNft/collection-icon.svg';
import universeTieredAuctionsBG from '../../../../../assets/images/sellNft/go-to-universe-auction-section-bg-img.png';

import arrow from '../../../../../assets/images/arrow.svg';
import arrowRight from '../../../../../assets/images/arrow-black.svg';
import { useThemeContext } from '../../../../../contexts/ThemeContext';

import RewardIcon from '../../../../../assets/images/ion_layers-disactive.svg';
import RewardIconActive from '../../../../../assets/images/ion_layers.svg';
import SelectSellMethodIcon from '../../../../../assets/images/sellNft/select-sell-method-black.svg';
import SelectSellMethodIconActive from '../../../../../assets/images/sellNft/select-sell-method-white.svg';
import SettingIcon from '../../../../../assets/images/setting-solid-disactive.svg';
import SettingIconActive from '../../../../../assets/images/settings-solid.svg';
import ReviewIcon from '../../../../../assets/images/eye-review.svg';
import ReviewIconActive from '../../../../../assets/images/eye-review-disactive.svg';

import './MarketplaceSell.scss';

export interface IMarketplaceBrowseNFTsProps {}

const tabs = [
  { name: 'Select items', icon: RewardIcon, iconActive: RewardIconActive, },
  { name: 'Select sell method', icon: SelectSellMethodIcon, iconActive: SelectSellMethodIconActive, },
  { name: 'Settings', icon: SettingIcon, iconActive: SettingIconActive, },
  { name: 'Summary', icon: ReviewIcon, iconActive: ReviewIconActive, },
];

const options = [
  { title: 'Single Item', description: 'Sell one item', icon: singleIcon },
  { title: 'Bundle', description: 'Group this item with others to sell', icon: collectionIcon },
];

const containerMaxWidth = '1100px';

export const MarketplaceSell = (props: IMarketplaceBrowseNFTsProps) => {
  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <Box w="100%" bgImage={bg} bgSize="contain" bgRepeat="no-repeat">
      <Container maxW={containerMaxWidth}>
        <Link href={'/'} mb={30} sx={{ _hover: { textDecoration: 'none !important' } }}>
          <Image src={arrow} display="inline" mr="10px" position="relative" top="-2px" />
          NFT name
        </Link>
        <Heading as="h1" mb={50}>Sell NFT</Heading>

        <Box mb={'60px'}>
          {/* TODO: use Tabs component */}
          <div className="arrow-steps clearfix">
            {tabs.map((tab, i) => (
              <div key={i} className={`step ${activeTab === i ? 'current' : ''}`} onClick={() => setActiveTab(i)}>
              <span>
                <Image src={activeTab === i ? tab.iconActive : tab.icon} display={'inline'} mr={'5px'} h={'17px'} />
                {tab.name}
              </span>
              </div>
            ))}
          </div>
        </Box>

        <Heading as="h3" size="md" mb={'60px'}>Select the amount of items</Heading>

        <Flex justifyContent={'space-between'} mb={'200px'}>
          {options.map((option, i) => (
            <Center
              key={i}
              border={'1px solid rgba(0, 0, 0, 0.1)'}
              borderRadius={12}
              h="290px"
              w={'calc(100% / 2 - 15px)'}
              sx={{
                _hover: {
                  boxShadow: 'xl',
                  bg: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
                  cursor: 'pointer',
                }
              }}
            >
              <Flex flexDir={'column'} alignItems={'center'}>
                <Image src={option.icon} maxW={'72px'} maxH={'72px'} mb={'24px'} />
                <Heading as={'h4'} fontFamily={'Space Grotesk'} fontSize={'18px'} mb={'4px'}>{option.title}</Heading>
                <Text color={'rgba(0, 0, 0, 0.4)'} fontSize={'14px'} mb={'20px'}>{option.description}</Text>
                <Button>Select</Button>
              </Flex>
            </Center>
          ))}
        </Flex>
      </Container>

      <Box bgColor={'black'} h={'200px'}>
        <Container maxW={containerMaxWidth} p={0}>
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
        </Container>
      </Box>
    </Box>
  );
};
