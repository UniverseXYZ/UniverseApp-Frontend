import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import PlusIcon from '@assets/images/plus.svg';
import { BadgedTab, LineTabList } from '@app/components';

import { TabActiveAuctions, TabDraftAuctions, TabMyBids, TabPastAuctions } from './components';
import * as styles from './MyAuctionsPage.styles';

export const MyAuctionsPage = () => {

  const [auctions] = useState(new Array(5).fill(null));

  return (
    <Box layerStyle={'StoneBG'}>
      <Box {...styles.Wrapper}>
        <Container maxW={'1110px'} p={0}>
          <Stack direction={{ base: 'column', md: 'row', }} spacing={'20px'} {...styles.Header}>
            <Heading as={'h1'}>My auctions</Heading>
            <Button boxShadow={'lg'} padding={'11px 16px'}>
              <Image src={PlusIcon} alt="icon" mr={'12px'} />
              Set up auction
            </Button>
          </Stack>

          <Tabs variant={'line'}>
            <LineTabList>
              <BadgedTab amount={auctions.length}>My bids</BadgedTab>
              <BadgedTab amount={3}>Active auctions</BadgedTab>
              <BadgedTab amount={1}>Draft auctions</BadgedTab>
              <BadgedTab amount={2}>Past auctions</BadgedTab>
            </LineTabList>

            <TabPanels>
              <TabPanel {...styles.TabPanel}>
                <TabMyBids auctions={auctions} />
              </TabPanel>
              <TabPanel {...styles.TabPanel}>
                <TabActiveAuctions auctions={auctions} />
              </TabPanel>
              <TabPanel {...styles.TabPanel}>
                <TabDraftAuctions />
              </TabPanel>
              <TabPanel {...styles.TabPanel}>
                <TabPastAuctions />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Box>
  );
}
