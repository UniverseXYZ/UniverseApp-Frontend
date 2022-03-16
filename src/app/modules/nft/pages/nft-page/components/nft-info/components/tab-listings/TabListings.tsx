import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { NFTCancelListingPopup } from '../../..';
import { IOrder, IUser } from '../../../../../../types';
import { EventsEmpty } from '../shared';
import HistoryEvent from '../shared/history-listings-event/HistoryEvent';

// TODO: refresh state after a listing is made
// TODO: refresh state after a listing is canceled

interface ITabListingsProps {
  orderHistory: IOrder[];
  owner: IUser;
}

export const TabListings = (props: ITabListingsProps) => {
  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] = useState(false);
  const { orderHistory, owner } = props;
  const listings = orderHistory
    ?.filter((order: IOrder) => {
      if (
        owner.address === order?.makerData?.address &&
        order.side === 1 &&
        (order.status === 0 || order.status === 4)
      ) {
        return order;
      }
    })
    .map((order) => {
      return {
        ...order,
        start: Number(order.start),
        end: Number(order.end),
        salt: Number(order.salt),
      };
    });

  if (!listings?.length) {
    return <EventsEmpty title="No active listings yet." />;
  }

  return (
    <Box>
      {listings.map((listing: IOrder | any) => {
        return (
          <>
            <HistoryEvent
              key={listing.id ?? listing._id}
              event={listing}
              onlyListings
              cancelListing={setIsCancelListingPopupOpened}
            />
            <NFTCancelListingPopup
              order={listing}
              isOpen={isCancelListingPopupOpened}
              onClose={() => setIsCancelListingPopupOpened(false)}
              handleCancel={() => setIsCancelListingPopupOpened(false)}
            />
          </>
        );
      })}
    </Box>
  );
};
