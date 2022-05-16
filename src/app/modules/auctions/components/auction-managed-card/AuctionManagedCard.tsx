import { Box, Button, Flex, Heading, Icon, Stack, Tooltip, VStack } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';

import { ReactComponent as ArrowIcon } from '@assets/images/arrow-2.svg';

import { Badge, Tire } from './components';
import { IAuctionManagedCardState } from './types';
import * as s from './AuctionManagedCard.styles';

export interface IAuctionManagedCardProps {
  state?: IAuctionManagedCardState;
  children?: React.ReactChild;
}

export const AuctionManagedCard = (props: IAuctionManagedCardProps) => {
  const {
    state = 'active',
    children
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  const [badges] = useState([
    { label: 'Total NFTs', value: 136, },
    { label: 'Launch date', value: 'Mar 15, 00:00 EST', },
    { label: 'End date', value: 'Mar 18, 00:00 EST', error: 'Your launch and end date have already passed. Go to Edit Auction and adjust the launch and end dates.' },
  ]);

  const [tires] = useState([
    { name: 'Platinum tier', winners: 5 },
    { name: 'Gold tier', winners: 10 },
    { name: 'Silver tier', winners: 7 },
  ]);

  const showGoToLandingPage = useMemo(() => {
    return (['active', 'past'] as IAuctionManagedCardState[]).includes(state);
  }, [state]);

  return (
    <Box {...s.getGradientWrapperStyle(state)}>
      <Box {...s.Wrapper}>
        <Flex {...s.FirstRowWrapper}>
          <Box {...s.TitleWrapper}>
            <Heading fontSize={'20px'}>Auction name</Heading>
          </Box>
          {showGoToLandingPage && (
            <Button variant={'outline'} {...s.LandingPageButton}>Go to landing page</Button>
          )}
          <Tooltip variant={'black'} hasArrow placement={'top'} label={isExpanded ? 'Show less' :'Show more'}>
            <Button variant={'simpleOutline'} {...s.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
              <Icon
                viewBox={'0 0 14 14'}
                transform={isExpanded ? 'rotate(90deg)' : 'rotate(-90deg)'}
                transition={'200ms'}
              >
                <ArrowIcon />
              </Icon>
            </Button>
          </Tooltip>
        </Flex>

        <VStack spacing={'30px'} alignItems={'flex-start'}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={'12px'}>
            {badges.map((badge, i) => (
              <Badge key={i} label={badge.label} value={badge.value} error={badge.error} />
            ))}
          </Stack>

          {!!children && (children)}

          <VStack spacing={'20px'} {...s.getTiresWrapperStyles(isExpanded)}>
            {tires.map((tire, i) => (
              <Tire key={i} name={tire.name} winners={tire.winners} />
            ))}
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}
