import { Box, Flex, Text, Link, Image, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { default as dayjs } from 'dayjs';

import { History } from '../../mocks';
import { NFTTabItemWrapper } from '../nft-tab-item-wrapper';
import { ETH_USD_RATE } from '../../../../../../mocks';
import { actionIcon, nameLabels } from './constants';
import { getAddedAtLabel, getEtherScanAddress } from './helpers';
import * as styles from './styles';

import EtherScanIcon from './../../../../../../../assets/images/etherscan.svg';

export const TabHistory = () => {
  const [history] = useState([...History]);

  return (
    <Box>
      {history.map((history, i) => {
        const expired = history.expiredAt ? dayjs().diff(history.expiredAt) > 0 : false;
        return (
          <NFTTabItemWrapper key={i}>
            <Flex>
              <Box {...styles.ActionIconStyle} bg={actionIcon[history.type]} />
              <Box>
                <Text {...styles.NameStyle}>
                  <Box {...styles.ActionLabelStyle}>{nameLabels[history.type]} </Box>{history.user.name}
                </Text>
                <Text {...styles.AddedLabelStyle}>
                  {getAddedAtLabel(history.addedAt)}
                  {expired && <Box as={'span'} {...styles.ExpiredStyle}> (expired)</Box>}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems={'center'}>
              <Box textAlign={'right'}>
                <Text {...styles.PriceStyle}>{history.price} WETH</Text>
                <Text {...styles.PriceUSDStyle}>${(history.price * ETH_USD_RATE).toFixed(2)}</Text>
              </Box>
              <Link href={getEtherScanAddress(history.transactionId)} target={'_blank'} ml={'16px'}>
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
