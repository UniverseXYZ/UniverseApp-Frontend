import { Button, ButtonProps, Center, Icon } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as CheckSVG } from '@assets/images/checkmark.svg';

import { CircularProgress } from '@app/components';

import * as s from './SlotProceedButton.styles';

export interface ISlotProceedButtonProps extends ButtonProps {
  isProceed: boolean;
  onProceed: () => void;
}

export const SlotProceedButton: React.FC<ISlotProceedButtonProps> = (props) => {
  const { isProceed, onProceed } = props;

  type SlotProceedButtonState = 'notProceed' | 'pending' | 'proceed';

  const [buttonState, setButtonState] = useState<SlotProceedButtonState>('notProceed');

  const handleProceed = useCallback(() => {
    setButtonState('pending');
    setTimeout(() => {
      setButtonState('proceed');
      onProceed();
    }, 2 * 1000);
  }, [onProceed]);

  useEffect(() => {
    setButtonState(isProceed ? 'proceed' : 'notProceed');
  }, [isProceed]);

  const stateRenders: Record<SlotProceedButtonState, () => React.ReactNode> = {
    notProceed: () => <Button {...s.ProceedButton} {...props} onClick={handleProceed}>Proceed</Button>,
    pending: () => (
      <Center>
        <CircularProgress />
      </Center>
    ),
    proceed: () => (
      <Button
        variant={'ghostAlt'}
        disabled={true}
        {...s.ProceedButton}
        rightIcon={<Icon viewBox={'0 0 16 15'}><CheckSVG /></Icon>}
      >
        Completed
      </Button>
    ),
  };

  return (
    <>{stateRenders[buttonState]()}</>
  );
}
