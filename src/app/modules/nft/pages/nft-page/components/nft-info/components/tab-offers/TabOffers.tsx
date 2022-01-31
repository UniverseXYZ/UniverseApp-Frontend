import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { default as dayjs } from 'dayjs';

import { ETH_USD_RATE } from '../../../../../../../../mocks';
import { NFTTabItemWrapper } from '..';
import { Offers } from '../../../../mocks';
import * as styles from './styles';
import { OffersEmpty } from './components';

export const TabOffers = () => {
  const [offers] = useState<typeof Offers>([...Offers]);

  return !offers.length ? <OffersEmpty /> : (
    <Box>
      {offers.map((offer, i) => {
        const neverExpired = !offer.expiredAt;
        const expiredIn = neverExpired ? null : dayjs(offer.expiredAt).diff(new Date(), 'hours');
        const isExpired = expiredIn && !(expiredIn > 0);

        return (
          <NFTTabItemWrapper key={i}>
            <Flex>
              <Image src={offer.user.photo} {...styles.ImageStyle} />
              <Box>
                <Text {...styles.NameStyle}><Box {...styles.NameLabelStyle}>from </Box>{offer.user.name}</Text>
                {neverExpired
                  ? (<Text {...styles.ExpiredStyle}>Never expires</Text>)
                  : (
                    isExpired
                      ? (<Text {...styles.ExpiredStyle} color={'#FF4949'}>Expired</Text>)
                      : (<Text {...styles.ExpiredStyle}>Expires in {expiredIn} hours</Text>)
                  )
                }
              </Box>
            </Flex>
            <Flex>
              <Box textAlign={'right'}>
                <Text {...styles.PriceStyle}>{offer.price} WETH</Text>
                <Text {...styles.PriceUSDStyle}>${(offer.price * ETH_USD_RATE).toFixed(2)}</Text>
              </Box>
              {i == 1 && (<Button {...styles.AcceptButtonStyle}>Accept</Button>)}
            </Flex>
          </NFTTabItemWrapper>
        );
      })}
    </Box>
  );
}
