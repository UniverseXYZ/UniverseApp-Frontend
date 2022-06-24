import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { AlertPopup } from '@app/components';

interface ISuccessOwnerPopupProps {
  isOpened: boolean;
  auctionId: number;
  auctionName: string;
  onClose: () => void;
}

export const SuccessOwnerPopup: React.FC<ISuccessOwnerPopupProps> = (props) => {
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
          >Visit landing page</Button>
          <Button
            variant={'ghost'}
            onClick={onClose}
          >Close</Button>
        </>
      )}
    >
      <Text>
        The rewards for the auction <strong>{auctionName}</strong> were successfully released.
        Now the auctioneer is able to collect his winnings and the bidders are able to claim their NFTs.
      </Text>
    </AlertPopup>
  );
}
