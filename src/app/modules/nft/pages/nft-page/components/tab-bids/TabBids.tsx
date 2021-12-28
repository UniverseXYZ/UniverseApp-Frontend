import { Box, Button, Flex, FormControl, FormLabel, Image, Switch, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { default as dayjs } from 'dayjs';

import { ETH_USD_RATE } from '../../../../../../mocks';
import { NFTTabItemWrapper } from '../nft-tab-item-wrapper';
import { Bids } from '../../mocks';
import * as styles from './styles';
import { sortBids } from './helpers';

export const TabBids = () => {
  const [bids, setBids] = useState(sortBids([...Bids]));
  const [onlyActive, setOnlyActive] = useState<boolean>(false);

  useEffect(() => {
    setBids(sortBids(
      !onlyActive
        ? [...Bids]
        : Bids.filter((bid) => dayjs(bid.expiredAt).diff(new Date()) > 0)
    ));
  }, [onlyActive]);

  return (
    <Box>
      <FormControl display={'flex'} alignItems={'center'} mb={'30px'}>
        <Switch
          id={'onlyActive'}
          size={'md'}
          mr={'10px'}
          isChecked={onlyActive}
          onChange={(e) => setOnlyActive(e.target.checked)}
        />
        <FormLabel htmlFor={'onlyActive'} mb={0} fontWeight={700}>Display active only</FormLabel>
      </FormControl>
      {bids.map((bid, i) => {
        const isExpired = !(dayjs(bid.expiredAt).diff(new Date(), 'hours') > 0);
        const addedDiff = dayjs().diff(bid.addedAt, 'hours');

        return (
          <NFTTabItemWrapper key={i} label={i === 0 ? 'Highest bid' :  undefined}>
            <Flex>
              <Image src={bid.user.photo} {...styles.ImageStyle} />
              <Box>
                <Text {...styles.NameStyle}><Box {...styles.NameLabelStyle}>by </Box>{bid.user.name}</Text>
                {isExpired
                  ? (<Text {...styles.ExpiredStyle} color={'#FF4949'}>Expired</Text>)
                  : (<Text {...styles.ExpiredStyle}>{addedDiff} hours ago</Text>)
                }
              </Box>
            </Flex>

            <Flex>
              <Box textAlign={'right'}>
                <Text {...styles.PriceStyle}>{bid.price} WETH</Text>
                <Text {...styles.PriceUSDStyle}>${(bid.price * ETH_USD_RATE).toFixed(2)}</Text>
              </Box>
              {i == 1 && (<Button variant={'simpleOutline'} {...styles.CancelButtonStyle}>Cancel</Button>)}
            </Flex>
          </NFTTabItemWrapper>
        );
      })}
    </Box>
  );
}
