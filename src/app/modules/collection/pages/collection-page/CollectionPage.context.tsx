import React, { FC, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { GetCollectionApi, GetCollectionGeneralInfo, GetCollectionOrderBookData } from '@app/api';
import { collectionKeys } from '@app/utils/query-keys';

import { ICollection, ICollectionOrderBookData, ICollectionInfoResponse } from '../../types/collection';

export interface ICollectionPageContext {
  collection: ICollection;
  collectionAddress: string;
  collectionGeneralInfo: ICollectionInfoResponse | undefined;
  collectionOrderBookData: ICollectionOrderBookData | undefined;
  isLoadingCollectionGeneralInfo: boolean;
  isFetchingCollectionGeneralInfo: boolean;
  isIdleCollectionGeneralInfo: boolean;
  isLoadingCollectionApi: boolean;
  isFetchingCollectionApi: boolean;
  isIdleCollectionApi: boolean;
}

export const CollectionPageContext = createContext<ICollectionPageContext>({} as ICollectionPageContext);

export function useCollectionPageData(): ICollectionPageContext {
  return useContext(CollectionPageContext);
}
interface ICollectionPageProviderProps {
  children: React.ReactNode;
}

export const CollectionPageProvider: FC<ICollectionPageProviderProps> = ({ children }) => {
  const router = useRouter();

  const { collectionAddress } = router.query as { collectionAddress: string };

  const {
    data: collection,
    isLoading: isLoadingCollectionApi,
    isFetching: isFetchingCollectionApi,
    isIdle: isIdleCollectionApi,
   } = useQuery(
    collectionKeys.centralizedInfo(collectionAddress),
    () => GetCollectionApi(collectionAddress),
    { onSuccess: (collection) => console.log('collection', collection) },
  );

  const {
    data: collectionGeneralInfo,
    isLoading: isLoadingCollectionGeneralInfo,
    isFetching: isFetchingCollectionGeneralInfo,
    isIdle: isIdleCollectionGeneralInfo
   } = useQuery(
    collectionKeys.datascraperGeneralInfo(collectionAddress),
    () => GetCollectionGeneralInfo(`${collectionAddress}`),
    { onSuccess: (owners) => console.log('collectionGeneralInfo', owners) },
  );

  const { data: collectionOrderBookData } = useQuery(
    collectionKeys.datascraperAdditionalInfo(collectionAddress),
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
