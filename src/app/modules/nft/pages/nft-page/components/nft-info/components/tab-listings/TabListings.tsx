import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NFTCancelListingPopup } from '../../..';
import { useAuthStore } from '../../../../../../../../../stores/authStore';
import { useNFTPageData } from '../../../../NFTPage.context';
import { EventsEmpty } from '../shared';
import HistoryEvent from '../shared/history-listings-event/HistoryEvent';

export const TabListings: React.FC = () => {

  const authUserAddress = useAuthStore(s => s.address);

  const { order, owners } = useNFTPageData();

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
        event={{ ...order, makerData: owners?.[0].owner ?? undefined }}
        onlyListings
        cancelListing={setIsCancelListingPopupOpened}
        isOwner={owners.length ? owners[0].address === authUserAddress : false}
      />
      <NFTCancelListingPopup
        order={order}
        isOpen={isCancelListingPopupOpened}
        onClose={() => setIsCancelListingPopupOpened(false)}
      />
    </Box>
  );
};
