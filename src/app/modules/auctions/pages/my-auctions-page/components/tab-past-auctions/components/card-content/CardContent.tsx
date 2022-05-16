import { Button, Image, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import BubbleImage from '@assets/images/text-bubble-2x.png';

import { Alert } from '@app/components';

import { MESSAGES } from './constants';
import { ICardContentState } from './types';
import * as s from './CardContent.styles';

interface ICardContentProps extends StackProps {
  state: ICardContentState;
  onWithdraw?: () => void;
}

export const CardContent = (props: ICardContentProps) => {
  const {
    state,
    children,
    onWithdraw,
    ...rest
  } = props;

  return (
    <VStack spacing={'30px'} py={'30px'} w={'100%'} {...rest}>
      <Image src={BubbleImage} alt={'Bubble image'} w={'100px'} />
      <VStack spacing={'6px'}>
        <Text {...s.Title}>{MESSAGES[state].title}</Text>
        <Text {...s.Description}>{MESSAGES[state].description}</Text>
      </VStack>

      {state === 'didntGetBids' && (
        <Alert status={'warning'} w={'fit-content'}>
          You’ll be able to withdraw your NFTs right after all the rewards are released.
        </Alert>
      )}

      {state !== 'alreadyWithdrawn' && (
        <Button
          disabled={state === 'didntGetBids'}
          {...s.ContentButton}
          onClick={onWithdraw}
        >Withdraw NFTs</Button>
      )}
    </VStack>
  );
};
