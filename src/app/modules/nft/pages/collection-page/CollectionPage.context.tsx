import { FC, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { ICollection, ICollectionAdditionalData, ICollectionOwnersCountResponse } from '../../types';
import { GetCollectionAdditionalData, GetCollectionApi, GetCollectionOwners } from '../../api';

export interface ICollectionPageContext {
  collection: ICollection;
  collectionAddress: string;
  owners: ICollectionOwnersCountResponse;
  collectionAdditionalData: ICollectionAdditionalData;
}

export const CollectionPageContext = createContext<ICollectionPageContext>({} as ICollectionPageContext);

export function useCollectionPageData(): ICollectionPageContext {
  return useContext(CollectionPageContext);
}

const CollectionPageProvider: FC = ({ children }) => {
  const { collectionAddress } = useParams<{ collectionAddress: string }>();
  
  const { data: collection } = useQuery(
    ['collection', collectionAddress],
    () => GetCollectionApi(`${collectionAddress}`),
    { onSuccess: (collection) => console.log('collection', collection) },
  );

  const { data: owners } = useQuery(
    ['owners', collectionAddress],
    () => GetCollectionOwners(`${collectionAddress}`),
    { onSuccess: (owners) => console.log('owners', owners) },
  );

  const { data: collectionAdditionalData } = useQuery(
    ['collectionAdditionalData', collectionAddress],
    () => GetCollectionAdditionalData(`${collectionAddress}`),
    { onSuccess: (collectionAdditionalData) => console.log('collectionAdditionalData', collectionAdditionalData) },
  );

  const value: ICollectionPageContext = {
    collection: collection as ICollection,
    collectionAddress,
    owners: owners as ICollectionOwnersCountResponse,
    collectionAdditionalData: collectionAdditionalData as ICollectionAdditionalData,
  };

  return (
    <CollectionPageContext.Provider value={value}>
      {children}
    </CollectionPageContext.Provider>
  );
};

export default CollectionPageProvider;
