import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { AlertPopup } from '@app/components';

interface ISuccessWinnerPopupProps {
  isOpened: boolean;
  auctionId: number;
  auctionName: string;
  onClose: () => void;
}

export const SuccessWinnerPopup: React.FC<ISuccessWinnerPopupProps> = (props) => {
  const { isOpened, auctionId, auctionName, onClose } = props;

  const router = useRouter();

  return (
    <AlertPopup
      isOpen={isOpened}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      showCloseButton={false}
      icon={'success'}
      title={'Success!'}
      renderFooter={() => (
        <>
          <Button
            variant={'primary'}
            onClick={() => router.push((`/account/auctions/${auctionId}/preview`))}
          >Claim NFTs</Button>
          <Button
            variant={'ghost'}
            onClick={() => router.push((`/account/auctions/${auctionId}/preview`))}
          >Go to auction</Button>
        </>
      )}
    >
      <Text>
        The rewards for the auction <strong>{auctionName}</strong> were successfully released.
        Now you are able to claim your NFTs.
      </Text>
    </AlertPopup>
  );
}
