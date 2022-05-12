import { Box, Button, ButtonProps, Image, Input, InputGroup, InputLeftElement, Stack, VStack } from '@chakra-ui/react';
import React from 'react';

import SearchIcon from '@assets/images/search-gray.svg';

import { IStepProps, Pagination, Select, Step, Stepper } from '@app/components';
import { SORT_BY_ACTIVE_AUCTIONS } from '@app/modules/auctions/constants';
import {
  AuctionManagedCard,
  AuctionManagedCardSkeleton,
  IAuctionManagedCardState,
} from '@app/modules/auctions/components';

interface IDraftAuctionStepProps extends Omit<IStepProps, 'label' | 'title'> {
  stepNum: number;
  title: string;
  onStart: () => void;
  onEdit: () => void;
}

export const DraftAuctionStep = (props: IDraftAuctionStepProps) => {
  const { stepNum, title, onStart, onEdit, ...rest } = props;

  const ButtonStyle: ButtonProps = {
    margin: 'auto',
    padding: '11px 16px',
    width: 'fit-content',
  };

  return (
    <Step
      label={`Step ${stepNum}`}
      title={title}
      {...rest}
    >
      {rest.state === 'done' && (
        <Button variant={'outline'} {...ButtonStyle} onClick={onEdit}>Edit</Button>
      )}

      {(rest.state === 'current' || rest.state === 'future') && (
        <Button
          disabled={rest.state === 'future'}
          boxShadow={rest.state !== 'future' ? 'lg' : 'none'}
          {...ButtonStyle}
          onClick={onStart}
        >Start</Button>
      )}
    </Step>
  );
}

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
        <AuctionManagedCard key={i} state={auctionCardState}>
          <Box mt={'40px !important'} mb={'30px !important'} w={'100%'}>
            <Stepper>
              <DraftAuctionStep
                state={'done'}
                stepNum={1}
                title={'Configure auction'}
                onStart={() => console.log('onStart')}
                onEdit={() => console.log('onEdit')}
              />
              <DraftAuctionStep
                state={'current'}
                stepNum={2}
                title={'Customize landing page'}
                onStart={() => console.log('onStart')}
                onEdit={() => console.log('onEdit')}
              />
              <DraftAuctionStep
                state={'future'}
                stepNum={3}
                title={'Finalize auction'}
                onStart={() => console.log('onStart')}
                onEdit={() => console.log('onEdit')}
              />
            </Stepper>
          </Box>
        </AuctionManagedCard>
      ))}
      <AuctionManagedCardSkeleton />
      <Pagination
        pageCount={10}
        pageRangeDisplayed={5}
        onPageChange={() => void 0}
        w={'100%'}
      />
    </VStack>
  );
}
