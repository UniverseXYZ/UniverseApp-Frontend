import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  SimpleGrid,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text, Tooltip,
} from '@chakra-ui/react';

import { NftItem } from '../../components';
import { INft } from '../../types';
import { Nfts } from '../../../marketplace/mocks/nfts';
import { NFTLike } from '../../components/nft-item/components';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { NFTMenu, Tabs as NFTTabs } from './constants';
import Lottie from 'react-lottie';
import { Bindings } from './mocks';
import { LineTabList } from '../../../../components';
import { NFTPageContext } from './NFTPage.context';

import playerAnimation from './../../../../../utils/animations/music-player.json'

import DotsIcon from './../../../../../assets/images/marketplace/3-dots.svg';
import EthIcon from './../../../../../assets/images/eth-icon-new.svg';
import UserImage from './../../../../../assets/images/collection_img3.svg';

const MenuItemStyles: MenuItemProps = {
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 500,
  padding: '15px',
  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
  },
  _focus: {
    bg: 'transparent',
  },
};

// TODO: hide metadata tab for not Polymorph NFT type
export const NFTPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setDarkMode } = useThemeContext() as any;

  const [NFT] = useState<INft>(Nfts[1] as INft);

  const [moreNFTs] = useState<INft[]>(Nfts.slice(0, 4) as INft[]);

  const [isPolymorph] = useState(true);

  useEffect(() => setDarkMode(false), []);

  useEffect(() => {
    if (canvasRef.current) {
      const $ = canvasRef.current.getContext('2d') as any;

      var col = function(x: any, y: any, r: any, g: any, b: any) {
        $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        $.fillRect(x, y, 1,1);
      }
      var R = function(x: any, y: any, t: any) {
        return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
      }

      var G = function(x: any, y: any, t: any) {
        return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
      }

      var B = function(x: any, y: any, t: any) {
        return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
      }

      var t = 0;

      var run = function() {
        for(let x=0;x<=35;x++) {
          for(let y = 0; y <= 35; y++) {
            col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
          }
        }
        t = t + 0.04;
        window.requestAnimationFrame(run);
      }

      run();
    }
  }, [canvasRef.current]);

  return (
    <NFTPageContext.Provider value={{ NFT, isPolymorph }}>
      <Box>
        <Flex
          sx={{
            // alignItems: 'center',
            // flex: 1,
            justifyContent: 'center',
            py: '60px',
            w: 'calc(100% - 550px)',

            float: 'left',
            position: 'sticky',
            top: '84px',
          }}
        >
          {/*TODO: add video / audio / bundle / storybook */}
          {/*<Image*/}
          {/*  src={'https://storage.googleapis.com/lobster-images/05020905000503.jpg'}*/}
          {/*  sx={{*/}
          {/*    borderRadius: '12px',*/}
          {/*    maxH: '600px',*/}
          {/*    maxW: '600px',*/}
          {/*  }}*/}
          {/*/>*/}

          <Box sx={{
            borderRadius: '12px',
            // h: '600px',
            // w: '600px',
            h: 'calc(100vh - 84px - 120px)',
            w: 'calc(100vh - 84px - 120px)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <canvas ref={canvasRef} width="32" height="32" style={{ width: '100%', height: '100%'}}></canvas>
            <Box sx={{
              position: 'absolute',
              top: 0,
            }}>
              <Lottie options={{
                loop: true,
                autoplay: true,
                animationData: playerAnimation,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }} />
            </Box>
          </Box>
        </Flex>
        <Box
          sx={{
            borderLeft: '1px solid #E4E4E4',
            w: '550px',

            float: 'right',
          }}
        >
          <Box sx={{ p: '60px 40px', }}>
            <Flex sx={{
              alignItems: 'center',
              mb: '12px',
              justifyContent: 'space-between'
            }}>
              <Heading as={'h2'} sx={{ fontSize: '26px', }}>NFT long name</Heading>
              <Box>
                <NFTLike
                  likes={NFT.likes}
                  isLiked={false}
                  sx={{
                    padding: '15px 17px',
                    height: '42px',
                    borderRadius: '12px',
                    mr: '7px',
                  }}
                />

                <Menu>
                  <MenuButton
                    as={Button}
                    variant={'simpleOutline'}
                    sx={{
                      borderRadius: '12px',
                      height: '42px',
                      padding: '10px',
                    }}
                  >
                    <Image src={DotsIcon} />
                  </MenuButton>
                  <MenuList
                    sx={{
                      borderRadius: '12px',
                      boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
                      padding: '8px',
                    }}
                  >
                    {NFTMenu.map((menuItem, i) => (
                      <MenuItem
                        key={i}
                        {...MenuItemStyles}
                        color={menuItem.red ? '#FF4949' : ''}
                      >
                        {menuItem.icon && <Image src={menuItem.icon} mr={'6px'} />}
                        {menuItem.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            </Flex>

            <Text
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '14px',
                fontWeight: 500,
                mb: '30px',
              }}
            >Edition 1/20</Text>

            <Flex mb={'24px'}>
              {Bindings.map((binding, i) => (
                <Flex key={i} sx={{
                  alignItems: 'center',
                  flex: 1,
                }}>
                  <Image src={binding.getImage(null)} sx={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    h: '30px',
                    w: '30px',
                  }} />
                  <Box fontSize={'12px'} ml={'10px'}>
                    <Text color={'rgba(0, 0, 0, 0.4)'} fontWeight={500}>{binding.name}</Text>
                    <Text fontWeight={700}>{binding.getValue(null)}</Text>
                  </Box>
                </Flex>
              ))}
            </Flex>

            <Text sx={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: '14px',
              mb: '40px',
            }}>
              Cras vel eget vitae quis scelerisque arcu ut.
              Tristique velit nec sed sit massa. Odio molestie velit purus at blandit.
              Lacus, fusce quam dolor imperdiet velit augue neque tincidunt lorem et diam...
              <Link sx={{ color: 'black', fontWeight: 'bold', ml: '6px' }}>Read more</Link>
            </Text>

            <Tabs>
              <LineTabList>
                {NFTTabs.map(({ name }, i) => (<Tab key={i}>{name}</Tab>))}
              </LineTabList>

              <TabPanels>
                {NFTTabs.map(({ component: TabContentComponent }, i) => (
                  <TabPanel key={i} px={0} pt={'30px'} pb={0}>
                    <TabContentComponent />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Box>

          <Box sx={{
            bg: 'linear-gradient(135deg, rgba(188, 235, 0, 0.03) 15.57%, rgba(0, 234, 234, 0.03) 84.88%), rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            p: '40px',
            position: 'sticky',
            bottom: 0,
            _before: {
              position: 'absolute',
              height: '2px',
              bg: 'linear-gradient(90deg, #2AD0CA 0%, #E1F664 22.92%, #FEB0FE 46.88%, #ABB3FC 68.23%, #5DF7A4 87.5%, #58C4F6 100%)',
              content: '""',
              w: '100%',
              top: 0,
              left: 0,
            },
          }}>
            <Flex mb={'24px'} fontSize={'14px'}>
              <Image src={UserImage} sx={{
                mr: '16px',
                w: '50px',
                h: '50px',
                borderRadius: '50%',
              }} />
              <Box>
                <Text
                  sx={{
                    color: 'rgba(0, 0, 0, 0.4)',
                    mb: '6px',
                    strong: {
                      color: 'black',
                      fontWeight: 700,
                    }
                  }}
                >Highest bid by <strong>The Unveiling</strong></Text>
                <Flex sx={{
                  fontWeight: 500,
                  lineHeight: '20px',
                  padding: '',
                  p: {
                    mr: '6px',
                  }
                }}>
                  <Text sx={{
                    fontSize: '20px',
                    fontWeight: 700,
                  }}>
                    <Tooltip
                      hasArrow
                      variant={'black'}
                      placement={'top'}
                      label={'WETH'}
                      fontWeight={700}
                    >
                      <Image src={EthIcon} sx={{
                        mr: '6px',
                        display: 'inline',
                        h: '22px',
                        w: '14px',
                        mt: '-3px',
                      }} />
                    </Tooltip>
                    0.5
                  </Text>
                  <Text sx={{ color: 'rgba(0, 0, 0, 0.4)' }}>$142.39</Text>
                  <Text sx={{ color: '#E4B613' }}>(10% of sales will go to creator)</Text>
                </Flex>
              </Box>
            </Flex>
            <SimpleGrid columns={2} spacingX={'12px'}>
              <Button boxShadow={'lg'}>Place a bid</Button>
              <Button variant={'outline'}>Make offer</Button>
            </SimpleGrid>
            {/*<Button boxShadow={'lg'} w={'100%'}>Put on sale</Button>*/}
          </Box>
        </Box>
      </Box>
      <Box sx={{
        bg: 'linear-gradient(127.59deg, #F2F3FB -1.33%, #FCF9F4 91.03%)',
        py: '80px',
        px: '40px',
      }}>
        <Heading as={'h2'} sx={{ fontSize: '26px', textAlign: 'center', }}>More from this collection</Heading>
        <Container maxW={'1110px'} py={'40px !important'}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacingX={'20px'}
          >
            {moreNFTs.map((NFT) => (<NftItem key={NFT.id} nft={NFT} />))}
          </SimpleGrid>
        </Container>
        <Flex justifyContent={'center'}>
          <Button variant={'outline'} boxShadow={'inset 2px 1000px 1px #fbf8f6'}>View collection</Button>
        </Flex>
      </Box>
    </NFTPageContext.Provider>
  );
};
