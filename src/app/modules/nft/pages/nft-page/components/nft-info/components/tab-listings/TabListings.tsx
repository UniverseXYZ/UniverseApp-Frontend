import { Box } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import { NFTCancelListingPopup } from '../../..';
import { useAuthContext } from '../../../../../../../../../contexts/AuthContext';
import { OrderSide, OrderStatus } from '../../../../../../../marketplace/enums';
import { IOrder, IUser } from '../../../../../../types';
import { EventsEmpty } from '../shared';
import HistoryEvent from '../shared/history-listings-event/HistoryEvent';

interface ITabListingsProps {
  orderHistory: IOrder[];
  owner: IUser;
}

export const TabListings = (props: ITabListingsProps) => {
  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] = useState(false);
  const { orderHistory, owner } = props;
  const { address } = useAuthContext();

  const listings = useMemo(() => !owner ? [] 
    : orderHistory
      ?.filter((order: IOrder) => {
        if (
          owner.address === order?.makerData?.address &&
          order.side === OrderSide.SELL && order.status === OrderStatus.CREATED
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
    }), [orderHistory, owner]);

  if (!listings?.length) {
    return <EventsEmpty title="No active listings yet." />;
  }

  return (
    <Box>
      {listings.map((listing: IOrder | any) => {
        return (
          <React.Fragment key={listing.id}>
            <HistoryEvent
              key={listing.id ?? listing._id}
              event={listing}
              onlyListings
              cancelListing={setIsCancelListingPopupOpened}
              isOwner={owner?.address === address}
            />
            <NFTCancelListingPopup
              order={listing}
              isOpen={isCancelListingPopupOpened}
              onClose={() => setIsCancelListingPopupOpened(false)}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};
