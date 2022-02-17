import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container, Fade,
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
  TabList,
  TabListProps,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useScroll } from 'react-use';

import { NftItem } from '../../components';
import { INft } from '../../types';
import { Nfts } from '../../../marketplace/mocks/nfts';
import { NFTLike } from '../../components/nft-item/components';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { NFTMenu, Properties } from './constants';

import DotsIcon from './../../../../../assets/images/marketplace/3-dots.svg';
import ArrowRightIcon from './../../../../../assets/images/marketplace/v2/arrow-right.svg';

const menuItemStyles: MenuItemProps = {
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

const bindings = [
  {
    name: 'Creator',
    getImage: (nft: any) => `https://universeapp-assets-dev.s3.amazonaws.com/profiles/629b7a160d251169668d0ae03c6993bea63773e548c0998b.jpg`,
    getValue: (nft: any) => `Zelad`,
  },
  {
    name: 'Collection',
    getImage: (nft: any) => `https://universeapp-assets-dev.s3.amazonaws.com/26638d6c9b8f2ec06fc5ea11e6b037b989c4115add733b96.jpeg`,
    getValue: (nft: any) => `Ugnozo Art`,
  },
  {
    name: 'Owner',
    getImage: (nft: any) => `https://universeapp-assets-dev.s3.amazonaws.com/profiles/629b7a160d251169668d0ae03c6993bea63773e548c0998b.jpg`,
    getValue: (nft: any) => `Artificial Paintings`,
  },
];

const LineTabList = (props: TabListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { x } = useScroll(ref);

  const showRightArrow = useMemo(() => {
    const el = ref.current;
    if (!el) {
      return false;
    }
    return (x + el.clientWidth) < el.scrollWidth - 20;
  }, [ref.current, x]);

  const showLeftArrow = useMemo(() => {
    const el = ref.current;
    if (!el) {
      return false;
    }
    return x > 20;
  }, [ref.current, x]);

  const handleClickLeftArrow = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.scrollTo(0, 0);
    }
  }, []);
  const handleClickRightArrow = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.scrollTo(el.scrollWidth - el.clientWidth, 0);
    }
  }, []);

  return (
    <Box sx={{
      position: 'relative',
    }}>
      <Fade in={showLeftArrow}>
        <Box sx={{
          bg: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%)',
          position: 'absolute',
          top: `${(((ref.current?.offsetHeight ?? 0) / 2) - (24 / 2) - 2)}px`,
          left: 0,
          pr: '20px',
          _hover: {
            cursor: 'pointer',
            img: {
              opacity: 1,
            }
          },
          _after: {
            display: 'block',
            position: 'absolute',
          }
        }}
        onClick={handleClickLeftArrow}
        >
          <Image
            src={ArrowRightIcon}
            transform={'rotate(-180deg)'}
            sx={{
              opacity: 0.4,
            }}
          />
        </Box>
      </Fade>
      <Fade in={showRightArrow}>
        <Box sx={{
          bg: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,1) 100%)',
          position: 'absolute',
          top: `${(((ref.current?.offsetHeight ?? 0) / 2) - (24 / 2) - 2)}px`,
          right: 0,
          pl: '20px',
          _hover: {
            cursor: 'pointer',
            img: {
              opacity: 1,
            }
          },
          _after: {
            display: 'block',
            position: 'absolute',
          }
        }}
        onClick={handleClickRightArrow}
        >
          <Image
            src={ArrowRightIcon}
            sx={{
              opacity: 0.4,
            }}
          />
        </Box>
      </Fade>
      <TabList
        ref={ref}
        sx={{
          overflowX: 'scroll',
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
        }}
        {...props}
      />
    </Box>
  );
}

export const NFTPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  const [nfts, setNfts] = useState(Nfts.slice(0, 4));

  useEffect(() => setDarkMode(false), []);

  return (
    <Box>
      <Flex>
        <Flex sx={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          py: '60px',
        }}>
          {/*TODO: add video / audio / bundle / storybook */}
          <Image
            src={'https://storage.googleapis.com/lobster-images/05020905000503.jpg'}
            sx={{
              borderRadius: '12px',
              maxH: '600px',
              maxW: '600px',
            }}
          />
        </Flex>
        <Box sx={{
          borderLeft: '1px solid #E4E4E4',
          p: '60px 40px',
          w: '550px',
        }}>
          <Flex sx={{
            alignItems: 'center',
            mb: '12px',
            justifyContent: 'space-between'
          }}>
            <Heading as={'h2'} sx={{ fontSize: '26px', }}>NFT long name</Heading>
            <Box>
              <NFTLike
                likes={nfts[0].likes as []}
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
                      {...menuItemStyles}
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
            {bindings.map((binding, i) => (
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
              <Tab>Properties</Tab>
              <Tab>Metadata</Tab>
              <Tab>Owners</Tab>
              <Tab>Bids</Tab>
              <Tab>Offers</Tab>
              <Tab>History</Tab>
            </LineTabList>

            <TabPanels>
              <TabPanel px={0} pt={'30px'}>
                <SimpleGrid columns={2} spacing={'20px'}>
                  {Properties.map((prop, i) => (
                    <Box
                      key={i}
                      sx={{
                        bg: 'rgba(0, 0, 0, 0.02)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        padding: '13px',
                        textAlign: 'center',
                      }}
                    >
                      <Text
                        fontSize={'10px'}
                        fontWeight={500}
                        mb={'5px'}
                        textTransform={'uppercase'}
                      >{prop.name}</Text>
                      <Text fontWeight={700} mb={'3px'}>{prop.value}</Text>
                      {prop.description && (<Text fontWeight={400} color={'rgba(0, 0, 0, 0.4)'}>{prop.description}</Text>)}
                    </Box>
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel px={0} pt={'30px'}>
                <p>Metadata</p>
              </TabPanel>
              <TabPanel px={0} pt={'30px'}>
                <p>Owners</p>
              </TabPanel>
              <TabPanel px={0} pt={'30px'}>
                <p>Bids</p>
              </TabPanel>
              <TabPanel px={0} pt={'30px'}>
                <p>Offers</p>
              </TabPanel>
              <TabPanel px={0} pt={'30px'}>
                <p>History</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
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
            {nfts.map((nft, i) => (<NftItem key={nft.id} nft={nft as INft} />))}
          </SimpleGrid>
        </Container>
        <Flex justifyContent={'center'}>
          <Button variant={'outline'} boxShadow={'inset 2px 1000px 1px #fbf8f6'}>View collection</Button>
        </Flex>
      </Box>
    </Box>
  );
};
