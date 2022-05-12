import { Box, Button, Flex, Heading, HStack, Icon, Tooltip, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { ReactComponent as ArrowIcon } from '@assets/images/arrow-2.svg';

import { Badge, Tire } from './components';
import * as styles from './AuctionManagedCard.styles';

interface IAuctionManagedCardProps {
  children?: React.ReactChild;
}

export const AuctionManagedCard = (props: IAuctionManagedCardProps) => {
  const { children } = props;

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

  return (
    <Box {...styles.GradientWrapper}>
      <Box {...styles.Wrapper}>
        <Flex alignItems={'center'} justifyContent={'space-between'} mb={'20px'}>
          <Heading fontSize={'20px'}>Auction name</Heading>
          <HStack spacing={'14px'}>
            <Button variant={'outline'} padding={'11px 16px'}>Go to landing page</Button>
            <Tooltip variant={'black'} hasArrow placement={'top'} label={isExpanded ? 'Show less' :'Show more'}>
              <Button
                variant={'simpleOutline'}
                {...styles.ExpandButton}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Icon
                  viewBox={'0 0 14 14'}
                  transform={isExpanded ? 'rotate(90deg)' : 'rotate(-90deg)'}
                  transition={'200ms'}
                >
                  <ArrowIcon />
                </Icon>
              </Button>
            </Tooltip>
          </HStack>
        </Flex>

        <VStack spacing={'30px'} alignItems={'flex-start'}>
          <HStack spacing={'12px'}>
            {badges.map((badge, i) => (
              <Badge key={i} label={badge.label} value={badge.value} error={badge.error} />
            ))}
          </HStack>

          {!!children && (children)}

          {isExpanded && (
            <VStack spacing={'20px'} alignItems={'flex-start'} w={'100%'}>
              {tires.map((tire, i) => (
                <Tire key={i} name={tire.name} winners={tire.winners} />
              ))}
            </VStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
