import { Box, Flex, Text, Link, Image, Tooltip, Button } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { utils } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react'
import { NFTTabItemWrapper } from '../..';
import { useAuthStore } from '../../../../../../../../../../stores/authStore';
import { getEtherscanTxUrl } from '../../../../../../../../../../utils/helpers';
import { shortenEthereumAddress } from '../../../../../../../../../../utils/helpers/format';
import { getTokenByAddress, TOKENS_MAP, ZERO_ADDRESS } from '../../../../../../../../../constants';
import { TokenTicker } from '../../../../../../../../../enums';
import { useTokenPrice } from '../../../../../../../../../hooks';
import { IToken } from '../../../../../../../../../types';
import { OrderSide, OrderStatus } from '../../../../../../../../marketplace/enums';
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
  isOwner?: boolean;
}

const HistoryEvent: React.FC<IHistoryEventProps> = ({ event, onlyListings, cancelListing, isOwner }) => {
  const web3Provider = useAuthStore(s => s.web3Provider);
  const [blockDate, setBlockDate] = useState(new Date());

  let type: HistoryType = HistoryType.MINTED;
  let price = '';
  let token: IToken = null as any;

  if (event.from !== ZERO_ADDRESS) {
    const side = event.side;
    const status = event.status;

    if (status === OrderStatus.FILLED) {
      type = HistoryType.BOUGHT;
    } else if (side === OrderSide.SELL && (status === OrderStatus.CREATED || OrderStatus.CANCELLED || OrderStatus.STALE)) {
      type = HistoryType.LISTED;
    } else if (onlyListings) {
      type = HistoryType.LISTED;
    } else {
      type = HistoryType.OFFER;
    }

    if (side === OrderSide.BUY) {
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

  const endDate = event.end > 0 ? new Date(event.end * 1000) : 0;
  const canceled = (type === HistoryType.OFFER || type === HistoryType.LISTED) && (event.status === OrderStatus.CANCELLED || event.status === OrderStatus.STALE);
  const expired = !canceled && !event.modified && (type === HistoryType.OFFER || type === HistoryType.LISTED) && event.end > 0 ? dayjs().diff(endDate) > 0 || event.status === OrderStatus.STALE : false;

  const getBlockTimestamp = async () => {
    if (event.blockNum && web3Provider) {
      const blockTimestamp = await web3Provider?.getBlock(event?.blockNum);
      setBlockDate(new Date(blockTimestamp?.timestamp * 1000));
    }
  }

  useEffect(() => {
    getBlockTimestamp();
  }, [web3Provider, event])

  const addedAtLabel = useMemo(() => getAddedAtLabel(type === HistoryType.MINTED ? blockDate : event.createdAt), [blockDate, event.createdAt, type])

  return (
    <NFTTabItemWrapper>
      <Flex>
        <Box {...styles.ActionIconStyle} bg={actionIcon[type]} />
        <Box>
          <Text {...styles.NameStyle}>
            <Box {...styles.ActionLabelStyle}>{nameLabels[type]} </Box>
            {event.makerData &&
              (event.makerData.displayName
                ? event.makerData.displayName
                : shortenEthereumAddress(event.makerData.address))}
          </Text>
          <Text {...styles.AddedLabelStyle}>
            {addedAtLabel}
            {!onlyListings && canceled && (
              <Box as={'span'} {...styles.ExpiredStyle}>
                {' '}
                (canceled)
              </Box>
            )}
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
        {isOwner && onlyListings && cancelListing && (
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
