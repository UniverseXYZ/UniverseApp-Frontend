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
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { NftItem, NFTLikesPopup, NFTMenu } from '../../components';
import { INft } from '../../types';
import { Nfts } from '../../../marketplace/mocks/nfts';
import { NFTLike } from '../../components/nft-item/components';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { Tabs as NFTTabs } from './constants';
import { Bindings } from './mocks';
import { LineTabList } from '../../../../components';
import { NFTPageContext } from './NFTPage.context';
import * as styles from './styles';

import DotsIcon from './../../../../../assets/images/marketplace/3-dots.svg';
import { NFTAssetAudio, NFTAssetImage, NFTBuySection } from './components';

// TODO: hide metadata tab for not Polymorph NFT type
export const NFTPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  const [NFT] = useState<INft>(Nfts[1] as INft);

  const [moreNFTs] = useState<INft[]>(Nfts.slice(0, 4) as INft[]);

  const [isPolymorph] = useState(true);

  const [isLikesPopupOpened, setIsLikesPopupOpened] = useState(false);
  const [isReportPopupOpened, setIsReportPopupOpened] = useState(false);

  useEffect(() => setDarkMode(false), []);

  return (
    <NFTPageContext.Provider value={{ NFT, isPolymorph }}>
      <Box>
        <Box {...styles.NFTAssetContainerStyle}>
          {/*TODO: ✅ image / ✅ audio / ☑️ video / ☑️ bundle / ☑️ storybook */}
          {/*<NFTAssetImage />*/}
          <NFTAssetAudio />
        </Box>
        <Box {...styles.NFTDetailsContainerStyle}>
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
                  onOpen={() => setIsLikesPopupOpened(true)}
                />

                <NFTMenu />
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

              a: {
                color: 'black',
                fontWeight: 'bold',
                ml: '6px',
              },
            }}>
              Cras vel eget vitae quis scelerisque arcu ut.
              Tristique velit nec sed sit massa. Odio molestie velit purus at blandit.
              Lacus, fusce quam dolor imperdiet velit augue neque tincidunt lorem et diam...
              <Link>Read more</Link>
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
          <NFTBuySection />
        </Box>
      </Box>
      <Box {...styles.MoreNFTsWrapperStyle}>
        <Heading {...styles.MoreNFTsTitleStyle}>More from this collection</Heading>
        <Container {...styles.MoreNFTsContainerStyle}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacingX={'20px'}>
            {moreNFTs.map((NFT) => (<NftItem key={NFT.id} nft={NFT} />))}
          </SimpleGrid>
        </Container>
        <Button {...styles.MoreNFTsButtonStyle}>View collection</Button>
      </Box>
      {/*TODO: move to nft-like component*/}
      <NFTLikesPopup isOpen={isLikesPopupOpened} onClose={() => setIsLikesPopupOpened(false)} />
    </NFTPageContext.Provider>
  );
};
