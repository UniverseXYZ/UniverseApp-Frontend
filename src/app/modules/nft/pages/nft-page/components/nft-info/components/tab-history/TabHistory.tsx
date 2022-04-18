import { Box, Icon } from '@chakra-ui/react';

import { ReactComponent as InfoSVG } from '@assets/images/info.svg';
import { IOrder } from '@app/modules/nft/types';
import { INFTHistory } from '@app/modules/nft/api';

import HistoryEvent from '../shared/history-listings-event/HistoryEvent';
import * as styles from './styles';

interface ITabHistoryProps {
  historyData?: INFTHistory;
}

export const TabHistory = (props: ITabHistoryProps) => {
  const {
    historyData = {
      orderHistory: [],
      mintEvent: null as any
    }
  } = props;

  const events = [...historyData?.orderHistory, historyData?.mintEvent];
  return (
    <Box>
      <Box {...styles.AlertStyle}>
        <Icon viewBox='0 0 25 25' color='#4D66EB' boxSize={'22px'} mr={'10px'} mt={0}>
          <InfoSVG />
        </Icon>
        Currently we show just the Universe history but we working on implementing the general NFT history.
      </Box>
      {events.map(
        (event: IOrder | any, i: number) => event && <HistoryEvent key={i} event={event} />
      )}
    </Box>
  );
};
