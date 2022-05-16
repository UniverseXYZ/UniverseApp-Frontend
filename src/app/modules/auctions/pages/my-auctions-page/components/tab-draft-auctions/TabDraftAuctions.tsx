import {
  Box,
  Button,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import SearchIcon from '@assets/images/search-gray.svg';
import { ReactComponent as TrashSVG } from '@assets/images/remove2.svg';

import { Pagination, Select, Step, Stepper } from '@app/components';
import { SORT_BY_ACTIVE_AUCTIONS } from '@app/modules/auctions/constants';
import {
  AuctionManagedCard,
  AuctionManagedCardSkeleton, IAuctionManagedCardProps,
  IAuctionManagedCardState,
} from '@app/modules/auctions/components';

import * as s from './TabDraftAuctions.styles';

export const DraftAuctionCard = (props: IAuctionManagedCardProps) => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      title: 'Configure auction',
      onStart: () => void 0,
      onEdit: () => void 0,
    },
    {
      title: 'Customize landing',
      onStart: () => void 0,
      onEdit: () => void 0,
    },
    {
      title: 'Finalize auction',
      onStart: () => void 0,
      onEdit: () => void 0,
    },
  ];

  return (
    <AuctionManagedCard
      renderContentFooter={() => {
        if (props.state !== 'draftError' && props.state !== 'draftPending') {
          return null;
        }

        return (
          <Button
            variant={'simpleOutline'}
            leftIcon={<Icon viewBox={'0 0 16 16'}><TrashSVG /></Icon>}
            onClick={() => console.log('Remove auction card')}
            {...s.RemoveButton}
          >Remove</Button>
        )
      }}
      {...props}
    >
      <Box mt={'40px !important'} w={'100%'}>
        <Stepper
          activeStep={activeStep}
          direction={{ base: 'column', md: 'row' }}
        >
          {steps.map((step, i) => (
            <Step
              key={i}
              renderAbove={() => (
                <>
                  <Text {...s.StepLabel}>{`Step ${i + 1}`}</Text>
                  <Text {...s.StepTitle}>{step.title}</Text>
                </>
              )}
            >
              {(state) => (
                <Box pt={'8px'} mb={{ base: i < steps.length - 1 ? '30px' : 0, md: '30px' }}>
                  {state === 'done' && (
                    <Button variant={'outline'} {...s.StepButton} onClick={() => setActiveStep(i)}>Edit</Button>
                  )}

                  {(state === 'current' || state === 'future') && (
                    <Button
                      disabled={state === 'future'}
                      boxShadow={state !== 'future' ? 'lg' : 'none'}
                      {...s.StepButton}
                      onClick={() => setActiveStep(i + 1)}
                    >Start</Button>
                  )}
                </Box>
              )}
            </Step>
          ))}
        </Stepper>
      </Box>
    </AuctionManagedCard>
  );
};

interface ITabDraftAuctionsProps {}

export const TabDraftAuctions = (props: ITabDraftAuctionsProps) => {
  const auctions: IAuctionManagedCardState[] = ['draftError', 'draftPending', 'draftPending', 'draftComplete'];

  return (
    <VStack spacing={'40px'} w={'100%'}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={'14px'} w={'100%'}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Image src={SearchIcon} alt={'Search icon'} />
          </InputLeftElement>
          <Input pl={'50px'} placeholder={'Search by name'} />
        </InputGroup>
        <Select
          buttonProps={{ size: 'lg', minWidth: '200px', }}
          label={'Sort by'}
          items={SORT_BY_ACTIVE_AUCTIONS}
          value={SORT_BY_ACTIVE_AUCTIONS[0]}
        />
      </Stack>

      {auctions.map((auctionCardState, i) => (
        <DraftAuctionCard key={i} state={auctionCardState} />
      ))}
      <AuctionManagedCardSkeleton state={'draft'} />
      <Pagination
        pageCount={10}
        pageRangeDisplayed={5}
        onPageChange={() => void 0}
        w={'100%'}
      />
    </VStack>
  );
}
