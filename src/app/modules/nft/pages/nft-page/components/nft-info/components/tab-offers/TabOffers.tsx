import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { default as dayjs } from 'dayjs';

import { ETH_USD_RATE } from '../../../../../../../../mocks';
import { NFTTabItemWrapper } from '..';
import { Offers } from '../../../../mocks';
import * as styles from './styles';
import { NFTAcceptOfferPopup, OffersEmpty } from './components';
import { GetOrdersApi, GetUserApi } from '../../../../../../api';
import { IERC721AssetType, INFT, IOrder, IUser } from '../../../../../../types';
import { BigNumber, ethers } from 'ethers';
import Blockies from 'react-blockies';
import { shortenEthereumAddress } from '../../../../../../../../../utils/helpers/format';
import { useAuthContext } from '../../../../../../../../../contexts/AuthContext';
import { useNFTPageData } from '../../../../NFTPage.context';
import { getTokenByAddress } from '../../../../../../../../constants';

interface ITabOffersProps {
  nft?: INFT;
  order?: IOrder;
  offers?: IOrder[];
  usersMap?: Record<string, IUser>;
}
export const TabOffers:React.FC<ITabOffersProps> = ({nft, order, offers, usersMap}) => {
  const { address, usdPrice } = useAuthContext();
  const [offerForAccept, setOfferForAccept] = useState<IOrder | null>(null);
  
  return !offers?.length ? <OffersEmpty /> : (
    <Box>
      {offers?.map((offer, i) => {
        const neverExpired = !offer.start && !offer.end;
        const expiredIn = neverExpired ? null : dayjs(offer.end).diff(new Date(), 'hours');
        const isExpired = expiredIn && !(expiredIn > 0);
        const formattedPrice = Number(ethers.utils.formatUnits(offer.make.value, 18));
        const offerUser = usersMap?.hasOwnProperty(offer.maker) ? usersMap[offer.maker] : {} as IUser;
        const canAcceptsOffers = order && order.maker === address && !isExpired;
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
                <Text {...styles.PriceStyle}>{formattedPrice} {getTokenByAddress((offer.make.assetType as IERC721AssetType).contract).ticker}</Text>
                <Text {...styles.PriceUSDStyle}>${(formattedPrice * usdPrice).toFixed(2)}</Text>
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
      })}
      {/*TODO: add support of bundle*/}
      {offerForAccept && (
        <NFTAcceptOfferPopup
          NFT={nft as INFT}
          order={offerForAccept}
          isOpen={!!offerForAccept}
          onClose={() => setOfferForAccept(null)}
        />
      )}
    </Box>
  );
}
