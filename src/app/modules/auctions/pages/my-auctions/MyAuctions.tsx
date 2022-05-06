import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import PlusIcon from '@assets/images/plus.svg';
import { BadgedTab, LineTabList } from '@app/components';

import { TabMyBids } from './components';
import * as styles from './MyAuctions.styles';

export const MyAuctions = () => {

  const [auctions] = useState(new Array(5).fill(null));

  return (
    <Box layerStyle={'StoneBG'}>
      <Box {...styles.Wrapper}>
        <Flex {...styles.Header}>
          <Heading as={'h1'}>My auctions</Heading>
          <Button boxShadow={'lg'} padding={'11px 16px'}>
            Set up auction
            <Image src={PlusIcon} alt="icon" ml={'12px'} />
          </Button>
        </Flex>

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
              <p>two!</p>
            </TabPanel>
            <TabPanel {...styles.TabPanel}>
              <p>three!</p>
            </TabPanel>
            <TabPanel {...styles.TabPanel}>
              <p>four!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
