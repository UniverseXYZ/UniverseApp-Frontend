import { Box, Flex, Text, Link, Image, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { default as dayjs } from 'dayjs';
import { utils } from 'ethers';
import { getTokenByAddress, TOKENS_MAP } from '../../../../../../../../constants/tokens';

import { NFTTabItemWrapper } from '..';
import { actionIcon, nameLabels } from './constants';
import { ZERO_ADDRESS } from '../../../../../../../../constants';
import { HistoryType } from '../../../../../nft-page/enums';
import { getAddedAtLabel, getEtherScanTx } from './helpers';
import * as styles from './styles';

import EtherScanIcon from './../../../../../../../../../assets/images/etherscan.svg';
import { TokenTicker } from '../../../../../../../../enums';
import { useAuthContext } from '../../../../../../../../../contexts/AuthContext';
import { shortenEthereumAddress } from '../../../../../../../../../utils/helpers/format';
import { IERC721AssetType, IOrder } from '../../../../../../types';
import { INFTHistory, INFTTransfer } from '../../../../../../api';
import { getEtherscanTxUrl } from '../../../../../../../../../utils/helpers';
import { IToken } from '../../../../../../../../types';

interface ITabHistoryProps {
  historyData?: INFTHistory;
}

export const TabHistory = ({ historyData = {orderHistory: [], mintEvent: null as any} }: ITabHistoryProps) => {
  const { ethPrice } = useAuthContext() as any;

  const events = [...historyData?.orderHistory, historyData?.mintEvent];

  return (
    <Box>
      {events.map((event: IOrder | any, i: number) => {
        if (!event) {
          return null;
        }

        let type: HistoryType = HistoryType.MINTED;
        let price = "";
        let token: IToken = null as any;
        
        if (event.from !== ZERO_ADDRESS) {
          const side = event.side;
          const status = event.status;
          type = (side === 1 && status === 2) ? HistoryType.BOUGHT : (side === 1 && status === 0) ? HistoryType.LISTED : HistoryType.OFFER;
          
          if (side === 0) {
            token = getTokenByAddress((event.make.assetType as IERC721AssetType).contract);
            const tokenDecimals = TOKENS_MAP[token.ticker]?.decimals ?? 18;
            
            price = utils.formatUnits(event.make.value, tokenDecimals);
          } else {
            token = getTokenByAddress((event.take.assetType as IERC721AssetType).contract);
            const tokenDecimals = TOKENS_MAP[token.ticker]?.decimals ?? 18;
            
            price = utils.formatUnits(event.take.value, tokenDecimals);
          }
        }

        const usdPrice = (Number(price) * ethPrice?.market_data?.current_price?.usd).toFixed(2);
        
        const expired: boolean = type === HistoryType.OFFER ? dayjs().diff(new Date(event.end)) > 0 : false;

        return (
          <NFTTabItemWrapper key={event._id}>
            <Flex>
              <Box {...styles.ActionIconStyle} bg={actionIcon[type]} />
              <Box>
                <Text {...styles.NameStyle}>
                  <Box {...styles.ActionLabelStyle}>{nameLabels[type]} </Box>{ event.makerData && (event.makerData.displayName ? event.makerData.displayName : shortenEthereumAddress(event.makerData.address)) }
                </Text>
                <Text {...styles.AddedLabelStyle}>
                  {getAddedAtLabel(event.createdAt)}
                  {expired && <Box as={'span'} {...styles.ExpiredStyle}> (expired)</Box>}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems={'center'}>
              {!!price && <Box textAlign={'right'}>
                <Text {...styles.PriceStyle}>{price} {token.ticker}</Text>
                <Text {...styles.PriceUSDStyle}>${usdPrice}</Text>
              </Box>}
              {(type === HistoryType.BOUGHT || type === HistoryType.MINTED) && event.matchedTxHash &&
                <Link href={getEtherscanTxUrl(event.matchedTxHash)} target={'_blank'} ml={'16px'}>
                  <Tooltip hasArrow variant={'black'} {...styles.EtherscanTooltipStyle}>
                    <Image src={EtherScanIcon} {...styles.EtherscanIconStyle} />
                  </Tooltip>
                </Link>
              }
            </Flex>
          </NFTTabItemWrapper>
        );
      })}
    </Box>
  );
};
