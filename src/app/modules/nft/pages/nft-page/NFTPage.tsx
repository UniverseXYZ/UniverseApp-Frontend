import React, { useEffect, useState } from 'react';

import { useThemeContext } from '../../../../../contexts/ThemeContext';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton, MenuItem, MenuItemProps, MenuList,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { NftItem } from '../../components';
import { INft } from '../../types';
import { Nfts } from '../../../marketplace/mocks/nfts';
import { NFTLike } from '../../components/nft-item/components';

import dotsIcon from './../../../../../assets/images/marketplace/3-dots.svg';

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
              ></NFTLike>

              <Menu>
                <MenuButton as={Button} variant={'simpleOutline'} sx={{
                  borderRadius: '12px',
                }}>
                  <Image src={dotsIcon} />
                </MenuButton>
                <MenuList
                  borderRadius={'12px'}
                  boxShadow={'0px 10px 36px rgba(136, 120, 172, 0.14)'}
                  padding={'8px'}
                >
                  <MenuItem {...menuItemStyles}>Transfer</MenuItem>
                  <MenuItem {...menuItemStyles} color={'#FF4949'}>Report</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>

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
            fontWeight: 500,
            mb: '30px',
          }}>Edition 1/20</Text>

          <Text sx={{
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '14px',
          }}>
            Cras vel eget vitae quis scelerisque arcu ut.
            Tristique velit nec sed sit massa. Odio molestie velit purus at blandit.
            Lacus, fusce quam dolor imperdiet velit augue neque tincidunt lorem et diam...
            <Link sx={{ color: 'black', fontWeight: 'bold', ml: '6px' }}>Read more</Link>
          </Text>
        </Box>
      </Flex>
      <Box sx={{
        bg: 'linear-gradient(127.59deg, #F2F3FB -1.33%, #FCF9F4 91.03%)',
        py: '80px',
        px: '40px',
      }}>
        <Heading as={'h2'} sx={{ fontSize: '26px', textAlign: 'center', }}>More from this collection</Heading>
        <Container maxW={'1360px'} py={'40px !important'}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacingX={'20px'}
          >
            {nfts.map((nft, i) => (<NftItem key={nft.id} nft={nft as INft} />))}
          </SimpleGrid>
        </Container>
        <Flex justifyContent={'center'}>
          <Button boxShadow={'lg'}>View Collection</Button>
        </Flex>
      </Box>
    </Box>
  );
};
