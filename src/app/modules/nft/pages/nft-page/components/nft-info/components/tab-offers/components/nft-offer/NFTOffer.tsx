import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { utils } from 'ethers';
import BigNumber from 'bignumber.js';
import React from 'react'
import { getTokenByAddress } from '../../../../../../../../../../constants';
import {
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
} from '../../../../../../../../types';
import { IUser } from '../../../../../../../../../account/types';
import { NFTTabItemWrapper } from '../../..';
import Blockies from 'react-blockies';
import * as styles from '../../styles';
import { shortenEthereumAddress } from '../../../../../../../../../../../utils/helpers/format';
import { useTokenPrice } from '../../../../../../../../../../hooks';
import { useAuthStore } from '../../../../../../../../../../../stores/authStore';
import { getAddedAtLabel } from '@app/modules/nft/pages/nft-page/components/nft-info/components/tab-history/helpers';

interface INFTOfferProps<T> {
  offer: T;
  usersMap: Record<string, IUser>;
  owner: string;
  onAcceptOffer: (offer: T) => void;
  onCancelOffer: (offer: T) => void;
}

type IOfferSingleListing = IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>;
type IOfferBundleListing = IOrder<IOrderAssetTypeERC20, IOrderAssetTypeBundleListing>;

export const  NFTOffer = <T extends IOfferSingleListing | IOfferBundleListing>(props: INFTOfferProps<T>) => {
  const {
    offer,
    usersMap,
    owner,
    onAcceptOffer,
    onCancelOffer,
  } = props;

  const address = useAuthStore(s => s.address);
  const neverExpired = !offer.start && !offer.end;

  const expiredDate = new Date(offer.end * 1000);
  const expiredLabel = getAddedAtLabel(new Date(offer.end * 1000));
  const isExpired = expiredDate < new Date();

  const offerUser = usersMap?.hasOwnProperty(offer.maker) ? usersMap[offer.maker] : {} as IUser;
  const canAcceptsOffers = owner?.toLowerCase() === address && !isExpired;
  const canCancelOffers = offer.maker === address && !isExpired;

  const token = getTokenByAddress(offer.make.assetType.contract)
  const formattedPrice = parseFloat(new BigNumber(utils.formatUnits(offer.make.value, token.decimals ?? 18)).toFixed(4));
  const usdPrice = useTokenPrice(token.ticker);
  const usd = new BigNumber(usdPrice).multipliedBy(formattedPrice).toFixed(2);

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
                : (<Text {...styles.ExpiredStyle}>Expires in {expiredLabel}</Text>)
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
            onClick={() => onAcceptOffer(offer)}
          >Accept</Button>
        )}
        { canCancelOffers && (
          <Button
            {...styles.AcceptButtonStyle}
            onClick={() => onCancelOffer(offer)}
          >Cancel</Button>
        )}
      </Flex>
    </NFTTabItemWrapper>
  );

}

