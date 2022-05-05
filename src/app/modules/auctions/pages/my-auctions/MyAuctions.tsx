import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image, SimpleGrid,
  Tab,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs, useMultiStyleConfig, useTab,
} from '@chakra-ui/react';

import AuctionsBGImage from '@assets/images/auctions-bg.png';
import PlusIcon from '@assets/images/plus.svg';
import { LineTabList } from '@app/components';
import React, { useState } from 'react';
import { AuctionCard } from '@app/modules/auctions/components';
import { useMeasure } from 'react-use';
import { useFluidGrid } from '@app/hooks';

interface IBadgedTabProps extends TabProps {
  amount: number;
}

const BadgedTab = React.forwardRef<HTMLDivElement, IBadgedTabProps>((props, ref) => {
  const { amount } = props;

  // 1. Reuse the `useTab` hook
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig('Tabs', tabProps)

  return (
    <Button __css={styles.tab} {...tabProps}>
      {tabProps.children}
      <Box as={'span'} sx={{
        bg: 'rgba(0 0 0 / 10%)',
        borderRadius: '4px',
        color: 'rgba(0 0 0 / 20%)',
        fontSize: '10px',
        fontWeight: 700,
        ml: '8px',
        padding: '2px 4px',

        _selected: {
          bg: '#000000',
          color: '#FFFFFF',
        }
      }} data-selected={isSelected || undefined}>{amount}</Box>
    </Button>
  )
})

export const MyAuctions = () => {

  const [ref, { width: containerWidth }] = useMeasure<HTMLDivElement>();

  const { columns, spacingX } = useFluidGrid(containerWidth, 280, 24);

  const [auctions] = useState(new Array(5).fill(null));

  return (
    <Box layerStyle={'StoneBG'}>
      <Box sx={{
        bg: `url(${AuctionsBGImage}) center top / contain no-repeat`,
        pb: '100px',
        px: '30px',
      }}>
        <Container maxW={'1110px'} p={0}>
          <Flex sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            py: '60px',
          }}>
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
              <TabPanel>
                <SimpleGrid ref={ref} columns={columns} spacing={`${spacingX}px`}>
                  {auctions.map((_, i) => <AuctionCard />)}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
              <TabPanel>
                <p>four!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Box>
  );
}
