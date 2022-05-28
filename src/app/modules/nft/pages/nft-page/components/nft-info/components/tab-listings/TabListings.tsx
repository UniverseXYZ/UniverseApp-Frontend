import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NFTCancelListingPopup } from '../../..';
import { useAuthStore } from '../../../../../../../../../stores/authStore';
import { IUser } from '../../../../../../../account/types';
import { useNFTPageData } from '../../../../NFTPage.context';
import { EventsEmpty } from '../shared';
import HistoryEvent from '../shared/history-listings-event/HistoryEvent';

interface ITabListingsProps {
  owner: IUser;
  ownerAddress: string | undefined;
}

export const TabListings = (props: ITabListingsProps) => {
  const { owner, ownerAddress } = props;

  const address = useAuthStore(s => s.address)
  const { order } = useNFTPageData();

  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] = useState(false);
  const [isOrderExpired, setIsOrderExpired] = useState(false);

  useEffect(() => {
    const endTime = order && order.end
      ? (new Date(order.end * 1000).getTime() - new Date().getTime())
      : 10000;

    let timeoutId = setTimeout(() => setIsOrderExpired(true), endTime);

    return () => timeoutId && clearTimeout(timeoutId);
  }, [order]);

  if (!order || isOrderExpired) {
    return <EventsEmpty title="No active listings yet." />;
  }

  return (
    <Box>
      <HistoryEvent
        key={order.id}
        event={{ ...order, makerData: owner }}
        onlyListings
        cancelListing={setIsCancelListingPopupOpened}
        isOwner={(owner?.address || ownerAddress) === address}
      />
      <NFTCancelListingPopup
        order={order}
        isOpen={isCancelListingPopupOpened}
        onClose={() => setIsCancelListingPopupOpened(false)}
      />
    </Box>
  );
};
