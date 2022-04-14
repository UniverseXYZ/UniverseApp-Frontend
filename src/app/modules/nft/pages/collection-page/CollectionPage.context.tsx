import { FC, createContext, useContext } from 'react';
import { useQuery } from 'react-query';

import { ICollection, ICollectionOrderBookData, ICollectionInfoResponse } from '../../types';
import { GetCollectionOrderBookData, GetCollectionApi, GetCollectionGeneralInfo } from '../../api';
import { collectionKeys } from '../../../../utils/query-keys';
import { useRouter } from 'next/router';

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

const CollectionPageProvider: FC<ICollectionPageProviderProps> = ({ children }) => { 
  // const { collectionAddress } = useParams<{ collectionAddress: string }>();
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

export default CollectionPageProvider;
