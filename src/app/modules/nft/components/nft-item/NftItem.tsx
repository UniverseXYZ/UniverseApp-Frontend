import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { ICollection, IERC721AssetType, INFT, IUser, IOrder } from '../../types';
import { NFTItemAsset, NFTItemFooter, NFTItemRelation } from './components';
import { ItemWrapper } from '../../../../components';
import * as styles from './styles';
import { NFTRelationType } from '../../enums';
import { GetBestAndLastOffer, GetCollectionApi, GetNFT2Api, GetUserApi } from '../../api';
import { TokenTicker } from '../../../../enums';
import { utils } from 'ethers';
import { getTokenByAddress } from '../../../../constants';
import { NFTCheckoutPopup } from '../../../nft/pages/nft-page/components/nft-checkout-popup';

type IRenderFuncProps = {
  NFT: INFT;
  collection: ICollection;
  creator?: IUser | null;
  owner?: IUser | null;
  isLoadingNFT: boolean;
  isLoadingCollection: boolean;
  isLoadingCreator: boolean;
  isLoadingOwner: boolean;
  bestOfferPrice?: number | string;
  bestOfferPriceToken?: TokenTicker;
  lastOfferPrice?: number | string;
  lastOfferPriceToken?: TokenTicker;
};

type IRenderFunc = ((props: IRenderFuncProps) => React.ReactNode) | null;

export interface INftItemProps {
  collection: ICollection | string;
  NFT: INFT | string;
  orderEnd?: number;
  order?: IOrder;
  isSelected?: boolean;
  selectedLabel?: string;

  renderHeader?: IRenderFunc;
  renderAsset?: IRenderFunc;
  renderContent?: IRenderFunc;
  renderFooter?: IRenderFunc;

  onClick?: (e: React.MouseEvent<HTMLElement>, NFT: INFT) => void;
}

export const NftItem = (
  {
    collection: _collection,
    NFT: _tokenIdOrNFT,
    order,
    isSelected,
    selectedLabel,

    renderHeader,
    renderAsset,
    renderContent,
    renderFooter,
    orderEnd,
    onClick,
  }: INftItemProps
) => {
  const [isCheckoutPopupOpened, setIsCheckoutPopupOpened] = useState(false);


  const { data: collection, isLoading: isLoadingCollection } = useQuery(
    ['collection', typeof _collection === 'string' ? _collection : _collection.address],
    () => GetCollectionApi(_collection as string),
    {
      retry: false,
      staleTime: typeof _collection === 'string' ? 0 : Infinity,
      initialData: typeof _collection === 'string' ? undefined : _collection,
    },
  );

  const { data: NFT, isLoading: isLoadingNFT } = useQuery(
    ['NFT', collection?.address, typeof _tokenIdOrNFT === 'string' ? _tokenIdOrNFT : _tokenIdOrNFT.tokenId],
    () => GetNFT2Api(`${collection?.address}`, _tokenIdOrNFT as string),
    {
      enabled: !!collection,
      retry: false,
      staleTime: typeof _tokenIdOrNFT === 'string' ? 0 : Infinity,
      initialData: typeof _tokenIdOrNFT === 'string' ? undefined : _tokenIdOrNFT,
    },
  );

  const { data: creator, isLoading: isLoadingCreator } = useQuery(
    ['user', `${NFT?._creatorAddress}`],
    () => GetUserApi(NFT?._creatorAddress as string),
    {
      enabled: !!NFT?._creatorAddress,
      retry: false,
    },
  );

  const { data: owner, isLoading: isLoadingOwner } = useQuery(
    ['user', `${NFT?._ownerAddress}`],
    () => GetUserApi(NFT?._ownerAddress as string),
    {
      enabled: !!NFT?._ownerAddress,
      retry: false,
    },
  );

  const { data, isLoading: isLoadingOffers } = useQuery(
    ['offer', NFT?._collectionAddress, NFT?.tokenId],
    () => GetBestAndLastOffer(NFT?._collectionAddress || '', NFT?.tokenId || ''),
    {
      enabled: !!NFT?._collectionAddress && !!NFT?.tokenId,
      retry: false,
    },
  );

  const bestOfferPriceToken = !data?.bestOffer ? null : getTokenByAddress((data?.bestOffer.make.assetType as IERC721AssetType).contract)
  const bestOfferPrice = !bestOfferPriceToken ? null : utils.formatUnits(data?.bestOffer.make.value || 0, bestOfferPriceToken.decimals ?? 18)

  const lastOfferPriceToken = !data?.lastOffer ? null : getTokenByAddress((data?.lastOffer.make.assetType as IERC721AssetType).contract)
  const lastOfferPrice = !lastOfferPriceToken ? null : utils.formatUnits(data?.lastOffer.make.value || 0, lastOfferPriceToken.decimals ?? 18)

  return (
    <>
    <ItemWrapper
      isBundle={NFT && NFT.numberOfEditions > 1}
      isSelected={isSelected}
      selectedLabel={selectedLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (onClick) {
          onClick(e, NFT as INFT);
        }
      }}
    >
      <LinkBox>
        <LinkOverlay
          href={!onClick ? `/nft/${collection?.address}/${NFT?.tokenId}`: 'javascript: void(0);'}
          display={'contents'}
        >
          {!NFT || renderHeader === null ? null :
            renderHeader ? renderHeader({
              NFT: NFT as INFT,
              collection: collection as ICollection,
              creator,
              owner,
              isLoadingNFT,
              isLoadingCollection,
              isLoadingCreator,
              isLoadingOwner,
            }) : null}

          <Box {...styles.AssetContainerStyle} borderRadius={renderHeader ? '' : '12px 12px 0 0'}>
            {!NFT || renderAsset === null ? null :
              renderAsset ? renderAsset({
                NFT: NFT as INFT,
                collection: collection as ICollection,
                creator,
                owner,
                isLoadingNFT,
                isLoadingCollection,
                isLoadingCreator,
                isLoadingOwner,
              }) : (
                <NFTItemAsset NFT={NFT as INFT} orderEnd={orderEnd || 0} />
              )
            }
          </Box>
          <Box {...styles.NFTContentStyle}>
            {!NFT || renderContent === null ? null :
              renderContent ? renderContent({
                NFT: NFT as INFT,
                collection: collection as ICollection,
                creator,
                owner,
                isLoadingNFT,
                isLoadingCollection,
                isLoadingCreator,
                isLoadingOwner,
                bestOfferPrice: bestOfferPrice || "0",
                bestOfferPriceToken: bestOfferPriceToken?.ticker, 
                lastOfferPrice: lastOfferPrice || "0",
                lastOfferPriceToken: lastOfferPriceToken?.ticker,   
                
              }) : (
                <>
                  <Text fontSize={'14px'} fontWeight={700} mb={'12px'}>{NFT?.name}</Text>

                  <Box mb={'14px'}>
                    <Box>
                      <NFTItemRelation
                        type={NFTRelationType.CREATOR}
                        image={creator?.profileImageUrl ?? ''}
                        value={creator?.displayName ?? ''}
                        linkParam={creator?.universePageUrl ?? ''}
                      />
                      <NFTItemRelation
                        type={NFTRelationType.COLLECTION}
                        image={collection?.coverUrl ?? ''}
                        value={collection?.name ?? ''}
                        linkParam={collection?.address ?? ''}
                      />
                      <NFTItemRelation
                        type={NFTRelationType.OWNER}
                        image={owner?.profileImageUrl ?? ''}
                        value={owner?.displayName ?? ''}
                        linkParam={owner?.universePageUrl ?? ''}
                      />
                    </Box>
                  </Box>
                </>
              )
            }

            {!NFT || renderFooter === null ? null :
              renderFooter ? renderFooter({
                NFT: NFT as INFT,
                collection: collection as ICollection,
                creator,
                owner,
                isLoadingNFT,
                isLoadingCollection,
                isLoadingCreator,
                isLoadingOwner,
              }) : (
                <NFTItemFooter isCheckoutPopupOpened={isCheckoutPopupOpened} setIsCheckoutPopupOpened={setIsCheckoutPopupOpened} NFT={NFT as INFT} />
              )
            }
          </Box>
        </LinkOverlay>
      </LinkBox>
    </ItemWrapper>
     <NFTCheckoutPopup
        NFT={NFT}
        order={order as IOrder}
        isOpen={isCheckoutPopupOpened}
        onClose={() => setIsCheckoutPopupOpened(false)}
      />
    </>
  );
};
