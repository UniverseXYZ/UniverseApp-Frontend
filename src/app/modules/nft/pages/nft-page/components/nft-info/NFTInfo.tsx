import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { Tabs as NFTTabs } from './constants';
import { Bindings } from '../../mocks';
import { LineTabList } from '../../../../../../components';
import * as styles from '../../styles';

import { NFTAssetImage, NFTAssetAudio, NFTBuySection } from '../';
import {
  CollectionPageLoader
} from "../../../../../../../containers/collection/CollectionPageLoader";
import {useNFTPageData} from "../../NFTPage.context";


// TODO: hide metadata tab for not Polymorph NFT type
export const NFTInfo = () => {
  const { NFT, isLoading } = useNFTPageData();

  console.log('NFT', NFT)

  return (
    <>
      {isLoading
      ? (
          <div className="loader-wrapper">
            <CollectionPageLoader />
          </div>
        )
      : (
          <Box>
            <Box {...styles.NFTAssetContainerStyle}>
              {NFT.nft.artworkType.endsWith('png') && (
                <NFTAssetImage src={NFT.nft.original_url} />
              )}
              {/*TODO: Find out the audio format  */}
              {NFT.nft.artworkType.endsWith('audio/mpeg') && (
                <NFTAssetAudio />
              )}
              {/*TODO: ✅ image / ✅ audio / ☑️ video / ☑️ bundle / ☑️ storybook */}
            </Box>
            <Box {...styles.NFTDetailsContainerStyle}>
              <Box sx={{ p: '60px 40px', }}>
                <Flex sx={{
                  alignItems: 'center',
                  mb: '12px',
                  justifyContent: 'space-between'
                }}>
                  <Heading as={'h2'} sx={{ fontSize: '26px', }}>{NFT.nft.name}</Heading>
                  {/*<Box>*/}
                  {/*  <NFTLike*/}
                  {/*    likes={NFT.likes}*/}
                  {/*    isLiked={false}*/}
                  {/*    sx={{*/}
                  {/*      padding: '15px 17px',*/}
                  {/*      height: '42px',*/}
                  {/*      borderRadius: '12px',*/}
                  {/*      mr: '7px',*/}
                  {/*    }}*/}
                  {/*    onOpen={() => setIsLikesPopupOpened(true)}*/}
                  {/*  />*/}

                  {/*  <NFTMenu />*/}
                  {/*</Box>*/}
                </Flex>

                <Text
                  sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: '30px',
                  }}
                >
                  Edition&nbsp;
                  {`${NFT.tokenIds ? NFT.tokenIds.length : 1}/${
                    NFT.numberOfEditions
                      ? NFT.numberOfEditions
                      : NFT.tokenIds
                        ? NFT.tokenIds.length
                        : 1
                  }`}
                </Text>

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
                    {NFTTabs.map(({ component: TabContentComponent }, i) => {
                      return (
                        <TabPanel key={i} px={0} pt={'30px'} pb={0}>
                          <TabContentComponent />
                        </TabPanel>
                      )
                    })}
                  </TabPanels>
                </Tabs>
              </Box>
              <NFTBuySection />
            </Box>
          </Box>
        )}
    </>
  )
};
