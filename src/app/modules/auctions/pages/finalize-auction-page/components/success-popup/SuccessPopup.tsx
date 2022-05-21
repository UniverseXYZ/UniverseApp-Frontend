import { Button,Stack, Text, } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { AlertPopup } from '@app/components';

import * as s from './SuccessPopup.styles';

interface ISuccessPopupProps {
  isOpened: boolean;
  auctionId: number;
  auctionName: string;
  auctionStartDate: Date;
  onClose: () => void;
}

export const SuccessPopup = (props: ISuccessPopupProps) => {
  const { isOpened, auctionId, auctionName, auctionStartDate, onClose } = props;

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
        <Stack {...s.FooterWrapper}>
          <Button
            variant={'primary'}
            {...s.Button}
            onClick={() => router.push((`/account/auctions/`))}
          >Go to my auctions</Button>
          <Button
            variant={'ghost'}
            {...s.Button}
            onClick={() => router.push((`/account/auctions/${auctionId}/preview`))}
          >Visit landing page</Button>
        </Stack>
      )}
    >
      <Text {...s.Message}>
        Your auction <strong>{auctionName}</strong> was successfully created
        and scheduled for launch on <strong>{dayjs(auctionStartDate).format('MMM Do YYYY')}</strong>
      </Text>
    </AlertPopup>
  );
}
