import { FC, createContext, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { IERC721AssetType, INFT, IOrder } from '../../types';
import { getNftData } from '../../../../../utils/api/mintNFT';
import { GetNFTApi, GetOrdersApi } from '../../api';
import { OrderAssetClass } from '../../enums';

export interface INFTPageContext {
  NFT: INFT;
  isLoading: boolean;
  isPolymorph: boolean;
  order?: IOrder;
}

export const NFTPageContext = createContext<INFTPageContext>({} as INFTPageContext);

export function useNFTPageData(): INFTPageContext {
  return useContext(NFTPageContext);
}

const NFTPageProvider: FC = ({ children }) => {
  const { collectionAddress, tokenId } = useParams() as any;

  const { data: NFT, isLoading: isLoadingNFT, error } = useQuery(
    ['NFT', collectionAddress, tokenId],
    () => GetNFTApi(collectionAddress, tokenId)
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
      return assetType.contract === collectionAddress && assetType.tokenId === tokenId;
    });
  }, { enabled: !!NFT?.id });

  const value: INFTPageContext = {
    order,
    NFT: NFT as INFT,
    isLoading: isLoadingNFT || isLoadingOrder,
    isPolymorph: false,
  };

  return (
    <NFTPageContext.Provider value={value}>
      {children}
    </NFTPageContext.Provider>
  );
};

export default NFTPageProvider;
