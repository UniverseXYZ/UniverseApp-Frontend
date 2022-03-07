import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { utils } from 'ethers';
import BigNumber from 'bignumber.js';
import React from 'react'
import { getTokenByAddress } from '../../../../../../../../../../constants';
import { IERC721AssetType, IOrder, IUser } from '../../../../../../../../types';
import { useAuthContext } from '../../../../../../../../../../../contexts/AuthContext';
import dayjs from 'dayjs';
import { NFTTabItemWrapper } from '../../..';
import Blockies from 'react-blockies';
import * as styles from '../../styles';
import { shortenEthereumAddress } from '../../../../../../../../../../../utils/helpers/format';
import { useTokenPrice } from '../../../../../../../../../../hooks';

interface INFTOfferProps {
  offer: IOrder;
  usersMap: Record<string, IUser>;
  order: IOrder;
  setOfferForAccept: React.Dispatch<React.SetStateAction<IOrder | null>>;
}

export const  NFTOffer: React.FC<INFTOfferProps> = ({offer, usersMap, order, setOfferForAccept}) => {
  const { address } = useAuthContext() as any;
  const neverExpired = !offer.start && !offer.end;

  const expiredIn = neverExpired ? null : dayjs(offer.end * 1000).diff(new Date(), 'hours');
  const isExpired = expiredIn && !(expiredIn > 0);
  const offerUser = usersMap?.hasOwnProperty(offer.maker) ? usersMap[offer.maker] : {} as IUser;
  const canAcceptsOffers = order && order.maker === address && !isExpired;

  const token = getTokenByAddress((offer.make.assetType as IERC721AssetType).contract)
  const formattedPrice = new BigNumber(utils.formatUnits(offer.make.value, token.decimals ?? 18)).toFixed(2);
  const usdPrice = useTokenPrice(token.ticker);
  const usd = new BigNumber(usdPrice).multipliedBy(formattedPrice).toFixed(2)
  return (
    <NFTTabItemWrapper key={offer.id}>
      <Flex>
        {offerUser && offerUser.profileImageUrl
        ? <Image src={offerUser.profileImageUrl} {...styles.ImageStyle} />
        : <Box style={{ borderRadius: '50%', overflow: 'hidden'}} {...styles.ImageStyle} >
            <Blockies seed={offer.maker} size={9} scale={5} />
          </Box>
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
          <Text {...styles.PriceStyle}>{formattedPrice} {token.ticker}</Text>
          <Text {...styles.PriceUSDStyle}>${usd}</Text>
        </Box>
        { canAcceptsOffers && (
          <Button
            {...styles.AcceptButtonStyle}
            onClick={() => {
              console.log('offer', offer);
              setOfferForAccept(offer);
            }}
          >Accept</Button>
        )}
      </Flex>
    </NFTTabItemWrapper>
  );

}