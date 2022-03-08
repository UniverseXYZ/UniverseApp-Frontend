import { FC, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { ICollection } from '../../types';
import { GetCollectionApi } from '../../api';

export interface ICollectionPageContext {
  collection: ICollection;
  collectionAddress: string;
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

  const value: ICollectionPageContext = {
    collection: collection as ICollection,
    collectionAddress,
  };

  return (
    <CollectionPageContext.Provider value={value}>
      {children}
    </CollectionPageContext.Provider>
  );
};

export default CollectionPageProvider;
