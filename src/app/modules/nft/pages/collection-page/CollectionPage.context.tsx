import { FC, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { ICollection, ICollectionOrderBookData, ICollectionInfoResponse } from '../../types';
import { GetCollectionOrderBookData, GetCollectionApi, GetCollectionGeneralInfo } from '../../api';

export interface ICollectionPageContext {
  collection: ICollection;
  collectionAddress: string;
  collectionGeneralInfo: ICollectionInfoResponse | undefined;
  collectionOrderBookData: ICollectionOrderBookData | undefined;
  isLoadingCollectionApi: boolean;
  isFetchingCollectionApi: boolean;
  isIdleCollectionApi: boolean;
  isLoadingCollectionGeneralInfo: boolean;
  isFetchingCollectionGeneralInfo: boolean;
  isIdleCollectionGeneralInfo: boolean;
}

export const CollectionPageContext = createContext<ICollectionPageContext>({} as ICollectionPageContext);

export function useCollectionPageData(): ICollectionPageContext {
  return useContext(CollectionPageContext);
}

const CollectionPageProvider: FC = ({ children }) => {
  const { collectionAddress } = useParams<{ collectionAddress: string }>();

  const {
    data: collection,
    isLoading: isLoadingCollectionApi,
    isFetching: isFetchingCollectionApi,
    isIdle: isIdleCollectionApi,
   } = useQuery(
    ['collection', collectionAddress],
    () => GetCollectionApi(`${collectionAddress}`),
    { onSuccess: (collection) => console.log('collection', collection) },
  );

  const {
    data: collectionGeneralInfo,
    isLoading: isLoadingCollectionGeneralInfo,
    isFetching: isFetchingCollectionGeneralInfo,
    isIdle: isIdleCollectionGeneralInfo
   } = useQuery(
    ['owners', collectionAddress],
    () => GetCollectionGeneralInfo(`${collectionAddress}`),
    { onSuccess: (owners) => console.log('collectionGeneralInfo', owners) },
  );

  const { data: collectionOrderBookData } = useQuery(
    ['collectionAdditionalData', collectionAddress],
    () => GetCollectionOrderBookData(`${collectionAddress}`),
    { onSuccess: (collectionAdditionalData) => console.log('collectionOrderBookData', collectionAdditionalData) },
  );

  const value: ICollectionPageContext = {
    collection: collection as ICollection,
    collectionAddress,
    collectionGeneralInfo: collectionGeneralInfo,
    collectionOrderBookData: collectionOrderBookData,
    isLoadingCollectionApi,
    isFetchingCollectionApi,
    isIdleCollectionApi,
    isLoadingCollectionGeneralInfo,
    isFetchingCollectionGeneralInfo,
    isIdleCollectionGeneralInfo,
  };

  return (
    <CollectionPageContext.Provider value={value}>
      {children}
    </CollectionPageContext.Provider>
  );
};

export default CollectionPageProvider;
