import { Box, Flex, Text, Link, Image, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { default as dayjs } from 'dayjs';
import { utils } from 'ethers';
import { TOKENS_MAP } from '../../../../../../../../constants/tokens';

import { NFTTabItemWrapper } from '..';
import { actionIcon, nameLabels } from './constants';
import { ZERO_ADDRESS } from '../../../../../../../../constants';
import { HistoryType } from '../../../../../nft-page/enums';
import { getAddedAtLabel, getEtherScanTx } from './helpers';
import * as styles from './styles';

import EtherScanIcon from './../../../../../../../../../assets/images/etherscan.svg';
import { TokenTicker } from '../../../../../../../../enums';
import { useAuthContext } from '../../../../../../../../../contexts/AuthContext';

export const TabHistory = ({ historyData }: any) => {
  const { ethPrice } = useAuthContext() as any;

  return (
    <Box>
      {historyData.map((transfer: any, i: any): any => {
        let type: HistoryType = HistoryType.MINTED;
        let price: number = -1;

        if (transfer.from !== ZERO_ADDRESS) {
          const side = transfer.side;
          const status = transfer.status;
          type = (side === 1 && status === 2) ? HistoryType.BOUGHT : (side === 1 && status === 0) ? HistoryType.LISTED : HistoryType.OFFER;

          if (side === 0) {
            price = +utils.formatUnits(transfer.make.value, `${TOKENS_MAP[transfer.make.assetType.assetClass as TokenTicker] ? TOKENS_MAP[transfer.make.assetType.assetClass as TokenTicker]?.decimals : 18}`);
          } else {
            price = +utils.formatUnits(transfer.take.value, `${TOKENS_MAP[transfer.take.assetType.assetClass as TokenTicker] ? TOKENS_MAP[transfer.take.assetType.assetClass as TokenTicker]?.decimals : 18}`);
          }
        }

        const expired: boolean = type === HistoryType.OFFER ? dayjs().diff(new Date(transfer.end)) > 0 : false;

        return (
          <NFTTabItemWrapper key={i}>
            <Flex>
              <Box {...styles.ActionIconStyle} bg={actionIcon[type]} />
              <Box>
                <Text {...styles.NameStyle}>
                  <Box {...styles.ActionLabelStyle}>{nameLabels[type]} </Box>{ transfer.makerData?.displayName ? transfer.makerData?.displayName : transfer.makerData?.address }
                </Text>
                <Text {...styles.AddedLabelStyle}>
                  {getAddedAtLabel(transfer.createdAt)}
                  {expired && <Box as={'span'} {...styles.ExpiredStyle}> (expired)</Box>}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems={'center'}>
              {price > -1 && <Box textAlign={'right'}>
                <Text {...styles.PriceStyle}>{price} WETH</Text>
                <Text {...styles.PriceUSDStyle}>${(price * ethPrice?.market_data?.current_price?.usd).toFixed(2)}</Text>
              </Box>}
              <Link href={getEtherScanTx(transfer.hash)} target={'_blank'} ml={'16px'}>
                <Tooltip hasArrow variant={'black'} {...styles.EtherscanTooltipStyle}>
                  <Image src={EtherScanIcon} {...styles.EtherscanIconStyle} />
                </Tooltip>
              </Link>
            </Flex>
          </NFTTabItemWrapper>
        );
      })}
    </Box>
  );
};
