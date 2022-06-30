import { Button, Text } from '@chakra-ui/react';
import React from 'react';

import { AlertPopup } from '@app/components';

interface IConfirmWithdrawBidPopupProps {
  isOpened: boolean;
  onClose: () => void;
}

export const ConfirmWithdrawBidPopup = (props: IConfirmWithdrawBidPopupProps) => {
  const { isOpened, onClose } = props;

  return (
    <AlertPopup
      isOpen={isOpened}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      showCloseButton
      title={'Are you sure you want to cancel your bid?'}
      renderFooter={() => (
        <>
          <Button
            variant={'primary'}
            onClick={() => {}}
          >Yes, cancel</Button>
          <Button
            variant={'ghost'}
            onClick={onClose}
          >No, keep it</Button>
        </>
      )}
    >
      <Text>
        Your bid will be cancelled and the funds returned to your wallet. If you change your mind, you will be able to bid on the auction again as long as it is still open.
      </Text>
    </AlertPopup>
  );
}
