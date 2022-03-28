import { Box } from '@chakra-ui/react';
import { IOrder } from '../../../../../../types';
import { INFTHistory } from '../../../../../../api';
import HistoryEvent from '../shared/history-listings-event/HistoryEvent';

interface ITabHistoryProps {
  historyData?: INFTHistory;
}

export const TabHistory = ({ historyData = { orderHistory: [], mintEvent: null as any } }: ITabHistoryProps) => {
  const events = [...historyData?.orderHistory, historyData?.mintEvent];
  return (
    <Box>
      {events.map(
        (event: IOrder | any, i: number) => event && <HistoryEvent key={i} event={event} />
      )}
    </Box>
  );
};
