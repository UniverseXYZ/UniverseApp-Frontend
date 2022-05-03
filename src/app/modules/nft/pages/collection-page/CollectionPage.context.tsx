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
}

export const CollectionPageContext = createContext<ICollectionPageContext>({} as ICollectionPageContext);

export function useCollectionPageData(): ICollectionPageContext {
  return useContext(CollectionPageContext);
}
interface ICollectionPageProviderProps {
  collection: ICollection;
  children: React.ReactNode;
}

const CollectionPageProvider: FC<ICollectionPageProviderProps> = (props) => {
  const { collection, children } = props;
 
  // const { collectionAddress } = useParams<{ collectionAddress: string }>();
  const router = useRouter();
  const { collectionAddress } = router.query as { collectionAddress: string };

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
