import { FC, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { ICollection, IERC721AssetType, INFT, IOrder, IUser } from '../../types';
import { GetCollectionApi, GetNFT2Api, GetNFTApi, GetOrdersApi, GetUserApi } from '../../api';
import { OrderAssetClass } from '../../enums';

export interface INFTPageContext {
  NFT: INFT;
  isLoading: boolean;
  isPolymorph: boolean;
  order?: IOrder;
  creator: IUser;
  owner: IUser;
  collection: ICollection;
}

export const NFTPageContext = createContext<INFTPageContext>({} as INFTPageContext);

export function useNFTPageData(): INFTPageContext {
  return useContext(NFTPageContext);
}

const NFTPageProvider: FC = ({ children }) => {
  const { collectionAddress, tokenId } = useParams<{ collectionAddress: string; tokenId: string; }>();

  const { data: NFT, isLoading: isLoadingNFT } = useQuery(
    ['NFT', collectionAddress, tokenId],
    () => GetNFT2Api(collectionAddress, tokenId),
    { onSuccess: (NFT) => console.log('NFT', NFT) },
  );

  const { data: creator } = useQuery(
    ['user', NFT?._creatorAddress],
    () => GetUserApi(`${NFT?._creatorAddress}`),
    { enabled: !!NFT?.id, retry: false, },
  );

  const { data: owner } = useQuery(
    ['user', NFT?._ownerAddress],
    () => GetUserApi(`${NFT?._ownerAddress}`),
    { enabled: !!NFT?.id, retry: false, },
  );

  const { data: collection } = useQuery(
    ['user', NFT?._collectionAddress],
    () => GetCollectionApi(`${NFT?._collectionAddress}`),
    { enabled: !!NFT?.id, retry: false, onSuccess: (collection) => console.log('collection', collection) },
  );

  const { data: order, isLoading: isLoadingOrder } = useQuery<IOrder | undefined>(['NFT', collectionAddress, tokenId, 'order'], async () => {
    const { orders } = await GetOrdersApi({
      assetClass: OrderAssetClass.ERC721,
      collection: collectionAddress,
      // tokenId,
      side: 1,
    });

    // TODO: remove in favor to passing param tokenId to request
    return orders.find((order) => {
      const assetType = order.make.assetType as IERC721AssetType;
      return assetType.contract === collectionAddress && +assetType.tokenId === +tokenId && !order.cancelledTxHash;
    });
  }, { enabled: !!NFT?.id });

  const value: INFTPageContext = {
    order,
    creator: creator as IUser,
    owner: owner as IUser,
    collection: collection as ICollection,
    NFT: NFT as INFT,
    isLoading: isLoadingNFT || isLoadingOrder,
    isPolymorph: NFT?._collectionAddress?.toUpperCase() === process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS?.toUpperCase(),
  };

  return (
    <NFTPageContext.Provider value={value}>
      {children}
    </NFTPageContext.Provider>
  );
};

export default NFTPageProvider;
