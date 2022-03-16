import { Box, Flex, Text, Link, Image, Tooltip, Button } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { utils } from 'ethers';
import React from 'react';
import { NFTTabItemWrapper } from '../..';
import { getEtherscanTxUrl } from '../../../../../../../../../../utils/helpers';
import { shortenEthereumAddress } from '../../../../../../../../../../utils/helpers/format';
import { getTokenByAddress, TOKENS_MAP, ZERO_ADDRESS } from '../../../../../../../../../constants';
import { TokenTicker } from '../../../../../../../../../enums';
import { useTokenPrice } from '../../../../../../../../../hooks';
import { IToken } from '../../../../../../../../../types';
import { IERC20AssetType, IERC721AssetType, IOrder } from '../../../../../../../types';
import { HistoryType } from '../../../../../enums';
import { actionIcon, nameLabels } from '../../tab-history/constants';
import { getAddedAtLabel } from '../../tab-history/helpers';
import * as styles from '../../tab-history/styles';
import EtherScanIcon from './../../../../../../../../../../assets/images/etherscan.svg';

interface IHistoryEventProps {
  event: IOrder;
  onlyListings?: boolean;
  cancelListing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryEvent: React.FC<IHistoryEventProps> = ({ event, onlyListings, cancelListing }) => {
  let type: HistoryType = HistoryType.MINTED;
  let price = '';
  let token: IToken = null as any;

  if (event.from !== ZERO_ADDRESS) {
    const side = event.side;
    const status = event.status;

    if (side === 1 && status === 2) {
      type = HistoryType.BOUGHT;
    } else if (side === 1 && status === 0) {
      type = HistoryType.LISTED;
    } else if (onlyListings) {
      type = HistoryType.LISTED;
    } else {
      type = HistoryType.OFFER;
    }

    if (side === 0) {
      token = getTokenByAddress((event.make.assetType as IERC721AssetType).contract);
      const tokenDecimals = TOKENS_MAP[token.ticker]?.decimals ?? 18;

      price = new BigNumber(utils.formatUnits(event.make.value, tokenDecimals)).toFixed(2);
    } else {
      token = getTokenByAddress((event.take.assetType as IERC20AssetType).contract);
      const tokenDecimals = token?.decimals ?? 18;

      price = new BigNumber(utils.formatUnits(event.take.value, tokenDecimals)).toFixed(2);
    }
  }

  const usdPrice = useTokenPrice(token?.ticker);

  const usd = new BigNumber(price).multipliedBy(usdPrice).toFixed(2);

  const endDate = new Date(event.end * 1000);
  const expired = type === HistoryType.OFFER ? dayjs().diff(endDate) > 0 : false;

  return (
    <NFTTabItemWrapper>
      <Flex>
        {!onlyListings && <Box {...styles.ActionIconStyle} bg={actionIcon[type]} />}
        <Box>
          <Text {...styles.NameStyle}>
            <Box {...styles.ActionLabelStyle}>{nameLabels[type]} </Box>
            {event.makerData &&
              (event.makerData.displayName
                ? event.makerData.displayName
                : shortenEthereumAddress(event.makerData.address))}
          </Text>
          <Text {...styles.AddedLabelStyle}>
            {getAddedAtLabel(event.createdAt)}
            {!onlyListings && expired && (
              <Box as={'span'} {...styles.ExpiredStyle}>
                {' '}
                (expired)
              </Box>
            )}
          </Text>
        </Box>
      </Flex>
      <Flex alignItems={'center'}>
        {!!price && (
          <Box textAlign={'right'}>
            <Text {...styles.PriceStyle}>
              {price} {token?.ticker ?? ''}
            </Text>
            <Text {...styles.PriceUSDStyle}>${usd}</Text>
          </Box>
        )}
        {onlyListings && cancelListing && (
          <Button
            ml={'18px'}
            fontSize={'14px'}
            onClick={() => {
              cancelListing(true);
            }}
          >
            Cancel
          </Button>
        )}
        {(type === HistoryType.BOUGHT || type === HistoryType.MINTED) && event.matchedTxHash && (
          <Link href={getEtherscanTxUrl(event.matchedTxHash)} target={'_blank'} ml={'16px'}>
            <Tooltip hasArrow variant={'black'} {...styles.EtherscanTooltipStyle}>
              <Image src={EtherScanIcon} {...styles.EtherscanIconStyle} />
            </Tooltip>
          </Link>
        )}
      </Flex>
    </NFTTabItemWrapper>
  );
};

export default HistoryEvent;
