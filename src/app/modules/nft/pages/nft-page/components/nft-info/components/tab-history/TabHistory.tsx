import { Box, Icon } from '@chakra-ui/react';

import { ReactComponent as InfoSVG } from '@assets/images/info.svg';
import { IOrder, IOrderAssetTypeERC20, IOrderAssetTypeSingleListing } from '@app/modules/nft/types';
import { INFTTransfer } from '@app/api';

import HistoryEvent from '../shared/history-listings-event/HistoryEvent';
import * as styles from './styles';

interface ITabHistoryProps {
  history?: Array<IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20> | INFTTransfer>;
}

export const TabHistory = (props: ITabHistoryProps) => {
  const { history = [] } = props;

  return (
    <Box>
      <Box {...styles.AlertStyle}>
        <Icon viewBox='0 0 25 25' color='#4D66EB' boxSize={'22px'} mr={'10px'} mt={0}>
          <InfoSVG />
        </Icon>
        Currently we show just the Universe history but we working on implementing the general NFT history.
      </Box>
      {history.map((event, i) => event && <HistoryEvent key={i} event={event} />)}
    </Box>
  );
};
