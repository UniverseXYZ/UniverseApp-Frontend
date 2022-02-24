import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { default as dayjs } from 'dayjs';

import { ETH_USD_RATE } from '../../../../../../../../mocks';
import { NFTTabItemWrapper } from '..';
import { Offers } from '../../../../mocks';
import * as styles from './styles';
import { OffersEmpty } from './components';
import { GetOrdersApi, GetUserApi } from '../../../../../../api';
import { INFT, IOrder, IUser } from '../../../../../../types';
import { BigNumber, ethers } from 'ethers';
import Blockies from 'react-blockies';
import { shortenEthereumAddress } from '../../../../../../../../../utils/helpers/format';
import { useAuthContext } from '../../../../../../../../../contexts/AuthContext';

interface ITabOffersProps {
  nft?: INFT;
  order?: IOrder;
}
export const TabOffers:React.FC<ITabOffersProps> = ({nft, order}) => {
  const [offers, setOffers] = useState<IOrder[]>([]);
  const [offerUsersMap, setUsersMap] = useState<Record<string, IUser>>({});
  const {address, usdPrice} = useAuthContext();

  const fetchOrderOffers = async () => {
    if(nft && nft.tokenId && nft._collectionAddress) {
      try {
        const { orders, total } = await GetOrdersApi({
          side: 0,
          tokenId: Number(nft.tokenId),
          collection: nft._collectionAddress.toLowerCase()
        })

        const userRequests: Array<any> = [];
        for (const order of orders) {
          userRequests.push(GetUserApi(order.maker))
        }
      
        const usersMap = (await (Promise.allSettled(userRequests))).reduce<Record<string, IUser>>((acc, response) => {
          if(response.status !== 'fulfilled') {
            return acc;
          }

          const user: IUser = response.value;
          acc[user.address] = user;
          return acc;
        }, {});
        setUsersMap(usersMap)
        setOffers(orders);
      }catch(err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
      fetchOrderOffers();
  }, [nft?.tokenId, nft?._collectionAddress])
  
  return !offers.length ? <OffersEmpty /> : (
    <Box>
      {offers.map((offer, i) => {
        const neverExpired = !offer.start && !offer.end;
        const expiredIn = neverExpired ? null : dayjs(offer.end).diff(new Date(), 'hours');
        const isExpired = expiredIn && !(expiredIn > 0);
        const formattedPrice = Number(ethers.utils.formatUnits(offer.make.value, 18));
        const offerUser = offerUsersMap[offer.maker];
        const canAcceptsOffers = order && order.maker === address && !isExpired;
        return (
          <NFTTabItemWrapper key={i}>
            <Flex>
              {offerUser && offerUser.profileImageUrl
              ? <Image src={offerUser.profileImageUrl} {...styles.ImageStyle} />
              : <Blockies className="blockie-details" seed={offer.maker} style={{"border-radius": "50%"}} />
              }
              <Box>
                <Text {...styles.NameStyle}>
                  <Box {...styles.NameLabelStyle}>from </Box>
                  {offerUser && offerUser.displayName ? offerUser.displayName : shortenEthereumAddress(offer.maker)}
                </Text>
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
                <Text {...styles.PriceStyle}>{formattedPrice} {offer.make.assetType.assetClass}</Text>
                <Text {...styles.PriceUSDStyle}>${(formattedPrice * usdPrice).toFixed(2)}</Text>
              </Box>
              { canAcceptsOffers && (<Button {...styles.AcceptButtonStyle}>Accept</Button>)}
            </Flex>
          </NFTTabItemWrapper>
        );
      })}
    </Box>
  );
}
