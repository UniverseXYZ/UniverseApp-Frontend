import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Button, Center,
  Container, Flex,
  Heading,
  Image,
  Link,
  Tab,
  TabList, TabPanel,
  TabPanels,
  Tabs, Text,
} from '@chakra-ui/react';

import bg from '../../../../../assets/images/marketplace/v2/bg.png';
import ethereumIcon from '../../../../../assets/images/eth-icon-new.svg';
import arrow from '../../../../../assets/images/arrow.svg';

// TODO: remove mocks
import nft from '../../mocks/assets/nft.png';
import { fees } from '../../mocks/fees';

import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { sellPageTabs, sellAmountOptions, sellMethodOptions } from './constants';
import { BoxSelect, TieredAuctionsBanner } from './components';
import { SellPageTabs } from './enums';

export const MarketplaceSell = () => {
  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState(SellPageTabs.SUMMARY);

  const handleSelectAmount = useCallback((amount: string) => {
    console.log('handleSelectAmount:', amount);
    setActiveTab(SellPageTabs.SELL_METHOD);
  }, []);

  const handleSelectSellType = useCallback((sellType: string) => {
    console.log('handleSelectSellType:', sellType);
    setActiveTab(SellPageTabs.SUMMARY); // TODO: change to SellPageTabs.SETTINGS
  }, []);

  useEffect(() => setDarkMode(false), []);

  return (
    <Box
      bgImage={bg}
      bgSize="contain"
      bgRepeat="no-repeat"
      w="100%"
      sx={{ '--container-max-width': '1100px' }}
    >
      <Container maxW={'var(--container-max-width)'} pb={'0 !important'}>
        <Box px={{ base: '20px', md: '60px', xl: 0 }}>
          <Link href={'/'} mb={'20px'} fontFamily={'Space Grotesk'} fontWeight={500} sx={{ _hover: { textDecoration: 'none' } }}>
            <Image src={arrow} display="inline" mr="10px" position="relative" top="-2px" />
            NFT name
          </Link>

          <Heading as="h1" mb={'50px'}>Sell NFT</Heading>

          <Tabs isFitted variant={'arrow'} index={activeTab} onChange={setActiveTab}>
            <TabList overflowX={'scroll'}>
              {sellPageTabs.map((tab, i) => (
                <Tab key={i} minW={'130px'} isDisabled={i > activeTab}>
                  <Image src={activeTab === i ? tab.iconActive : tab.icon} />
                  {tab.name}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <Heading as="h3" size="md" my={'60px'}>Select the amount of items</Heading>
                <Box mb={'100px'}>
                  <BoxSelect options={sellAmountOptions} onSelect={handleSelectAmount} />
                </Box>
                <TieredAuctionsBanner />
              </TabPanel>
              <TabPanel p={0}>
                <Heading as="h3" size="md" my={'60px'}>Select your sell method</Heading>
                <Box mb={'120px'}>
                  <BoxSelect options={sellMethodOptions} onSelect={handleSelectSellType} />
                </Box>
              </TabPanel>
              <TabPanel p={0}>3</TabPanel>
              <TabPanel p={0}>
                <Heading as="h3" size="md" my={'60px'}>Summary</Heading>
                <Flex
                  borderRadius={'12px'}
                  boxShadow={'0 10px 36px rgba(136, 120, 172, 0.14)'}
                  p={'50px'}
                  mb={'40px'}
                  sx={{
                    '--image-size': '390px',
                    '--image-margin': '60px',
                  }}
                >
                  <Box mr={'var(--image-margin)'}>
                    <Image src={nft} h={'var(--image-size)'} w={'var(--image-size)'} />
                  </Box>
                  <Flex width={'calc(100% - var(--image-size) - var(--image-margin))'}>
                    <Center flexDir={'column'} alignItems={'flex-start'} w={'100%'}>
                      <Heading as={'h4'} fontFamily={'Space Grotesk'} fontSize={'18px'} mb={'6px'}>
                        Listing
                      </Heading>
                      <Text mb={'30px'} fontSize={'14px'}>
                        Your bundle will be listed for
                        <Image
                          src={ethereumIcon}
                          alt='Ethereum icon'
                          display={'inline'}
                          ml={2}
                          mr={1}
                          w={'11px'}
                        />
                        <strong>0.8</strong>
                      </Text>

                      <Heading as={'h4'} fontFamily={'Space Grotesk'} fontSize={'18px'} mb={'6px'}>Fees</Heading>
                      <Text mb={'20px'} fontSize={'14px'} color={'#00000066'}>
                        Listing is free! At the time of the sale, the following fees will be deducted.
                      </Text>

                      <Box
                        background={'rgba(0, 0, 0, 0.02)'}
                        border={'1px solid rgba(0, 0, 0, 0.1)'}
                        borderRadius={'10px'}
                        p={'28px'}
                        mb={'30px'}
                        w={'100%'}
                      >
                        {fees.map((fee, i) => (
                          <Flex py={'5px'} key={i} fontWeight={i === fees.length - 1 ? 'bold' : 'normal'}>
                            <Box>{fee.name}</Box>
                            <Flex flex={1} borderBottom={'2px dotted rgba(0, 0, 0, 0.1)'} m={'5px'} />
                            <Box>{fee.value}%</Box>
                          </Flex>
                        ))}
                      </Box>

                      <Heading as={'h4'} fontFamily={'Space Grotesk'} fontSize={'18px'}>
                        You will receive:
                        <Image
                          src={ethereumIcon}
                          alt='Ethereum icon'
                          display={'inline'}
                          ml={2}
                          mr={1}
                          width={'14px'}
                        />
                        0.7
                      </Heading>
                    </Center>
                  </Flex>
                </Flex>
                <Box textAlign={'right'} mb={'50px'}>
                  <Button mr={'10px'} variant={'outline'}>Back</Button>
                  <Button boxShadow={'xl'}>Post your listing</Button>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};
