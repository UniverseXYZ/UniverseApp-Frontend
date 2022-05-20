import { Box, Button, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as CheckSVG } from '@assets/images/checkmark.svg';

import { CircularProgress } from '@app/components';

import * as s from './CollectionApprove.styles';

export interface ICollectionApproveProps {
  address: string;
  name: string;
  coverUrl: string;
  disabled?: boolean;
  isApproved: boolean;
  onApproved: () => void;
}

export const CollectionApprove = (props: ICollectionApproveProps) => {
  const { name, coverUrl, disabled = false, isApproved, onApproved } = props;

  type IApproveState = 'notApproved' | 'pending' | 'approved';

  const [approveState, setApproveState] = useState<IApproveState>('notApproved');

  const handleApprove = useCallback(() => {
    setApproveState('pending');
    setTimeout(() => {
      setApproveState('approved');
      onApproved();
    }, 2 * 1000);
  }, [onApproved]);

  useEffect(() => {
    setApproveState(isApproved ? 'approved' : 'notApproved');
  }, [isApproved]);

  const renderNotApprovedState = () => (
    <Button
      variant={'primary'}
      disabled={disabled}
      onClick={handleApprove}
    >Approve</Button>
  );

  const renderPendingState = () => (<CircularProgress />);

  const renderApprovedState = () => (
    <Button
      variant={'ghostAlt'}
      disabled={true}
      rightIcon={<Icon viewBox={'0 0 16 15'}><CheckSVG /></Icon>}
    >
      Approved
    </Button>
  );

  const stateRenders: Record<IApproveState, () => React.ReactNode> = {
    notApproved: renderNotApprovedState,
    pending: renderPendingState,
    approved: renderApprovedState,
  };

  return (
    <Box {...s.Wrapper}>
      <Stack alignItems={'center'} spacing={{ base: '18px', md: '30px' }} direction={'row'}>
        <Image
          src={coverUrl}
          alt={'Collection image'}
          borderRadius={'full'}
          boxSize={{ base: '60px', md: '80px' }}
        />
        <Box>
          <Text {...s.Name}>{name}</Text>
          {stateRenders[approveState]()}
        </Box>
      </Stack>
    </Box>
  );
};
