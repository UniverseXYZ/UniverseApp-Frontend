import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { default as dayjs } from 'dayjs';

import { ETH_USD_RATE } from '../../../../../../mocks';
import { NFTTabItemWrapper } from '../nft-tab-item-wrapper';
import { Offers } from '../../mocks';
import * as styles from './styles';

export const TabOffers = () => {
  const [offers] = useState([...Offers]);

  return (
    <Box>
      {offers.map((offer, i) => {
        const neverExpired = !offer.expiredAt;
        const expiredIn = neverExpired ? null : dayjs(offer.expiredAt).diff(new Date(), 'hours');
        const isExpired = expiredIn && !(expiredIn > 0);
        return (
          <NFTTabItemWrapper key={i}>
            <Flex>
              <Image src={offer.user.photo} {...styles.ImageStyles} />
              <Box>
                <Text {...styles.NameStyles}><Box as={'span'} color={'rgba(0, 0, 0, 0.4)'}>from </Box>{offer.user.name}</Text>
                {neverExpired
                  ? (<Text {...styles.ExpiredInStyles}>Never expires</Text>)
                  : (
                    isExpired
                      ? (<Text {...styles.ExpiredStyles}>Expired</Text>)
                      : (<Text {...styles.ExpiredInStyles}>Expires in {expiredIn} hours</Text>)
                  )
                }
              </Box>
            </Flex>
            <Flex>
              <Box textAlign={'right'}>
                <Text {...styles.NameStyles}>{offer.price} WETH</Text>
                <Text {...styles.ExpiredInStyles}>${(offer.price * ETH_USD_RATE).toFixed(2)}</Text>
              </Box>
              {i == 1 && (<Button {...styles.AcceptButtonStyles}>Accept</Button>)}
            </Flex>
          </NFTTabItemWrapper>
        );
      })}
    </Box>
  );
}
