import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { Step, Stepper } from '@app/components';

import { IAuctionManagedCardSkeletonState } from './types';
import * as s from './AuctionManagedCardSkeleton.styles';

interface IAuctionManagedCardSkeletonProps {
  state?: IAuctionManagedCardSkeletonState;
}

export const AuctionManagedCardSkeleton = (props: IAuctionManagedCardSkeletonProps) => {
  const {
    state = 'active',
  } = props;

  const [badges] = useState(new Array(3).fill(null));
  const [statistics] = useState(new Array(4).fill(null));
  const [steps] = useState(new Array(3).fill(null));

  const renderActiveContent = () => (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={'20px'} w={'100%'}>
      {statistics.map((_, i) => (
        <Box key={i} {...s.StatisticItem}>
          <Skeleton {...s.StatisticItemName} />
          <Skeleton {...s.StatisticItemValue} />
        </Box>
      ))}
    </SimpleGrid>
  );

  const renderDraftContent = () => (
    <Stepper
      activeStep={-1}
      direction={{ base: 'column', md: 'row' }}
      mt={'46px !important'}
      w={'100%'}
    >
      {steps.map((_, i) => (
        <Step
          key={i}
          renderAbove={() => (
            <>
              <Skeleton {...s.StepLabel} />
              <Skeleton {...s.StepTitle} />
            </>
          )}
          renderIcon={() => (<Skeleton {...s.StepIcon} />)}
        >
          <Box mb={{ base: i < steps.length - 1 ? '30px' : 0, md: '30px' }}>
            <Skeleton {...s.StepButton} />
          </Box>
        </Step>
      ))}
    </Stepper>
  );

  const contentRenders: Record<IAuctionManagedCardSkeletonState, () => React.ReactNode> = {
    active: renderActiveContent,
    draft: renderDraftContent,
  };

  return (
    <Box {...s.GradientWrapper}>
      <Box {...s.Wrapper}>
        <Flex {...s.FirstRowWrapper}>
          <Box {...s.TitleWrapper}>
            <Skeleton {...s.Title} />
          </Box>
          <Skeleton{...s.LandingPageButton} />
          <Skeleton {...s.ExpandButton} />
        </Flex>

        <VStack spacing={'30px'} alignItems={'flex-start'}>
          <Stack spacing={'12px'} direction={{ base: 'column', md: 'row' }}>
            {badges.map((_, i) => <Skeleton key={i} {...s.Badge} />)}
          </Stack>
          {contentRenders[state]()}
        </VStack>
      </Box>
    </Box>
  );
}
