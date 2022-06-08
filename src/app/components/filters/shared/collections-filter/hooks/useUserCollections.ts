import { useQuery } from 'react-query';

import { GetCollectionApi, GetUserCollectionsFromScraperApi } from '@app/api';
import { collectionKeys } from '@app/utils/query-keys';

import { ICollectionsFilterCollection } from '../types';

type IUseCollectionsFilterUserCollections = (params: {
  userAddress: string | null;
  onSuccess?: (response: ICollectionsFilterCollection[] | undefined) => void;
  onError?: (error: unknown) => void;
}) => ICollectionsFilterCollection[] | undefined;

export const useCollectionsFilterUserCollections: IUseCollectionsFilterUserCollections = (params) => {
  const {
    userAddress,
    onSuccess,
    onError,
  } = params;

  const { data: collections } = useQuery(
    collectionKeys.userCollections(userAddress ?? ''),
    async () => {
      const userCollections = await GetUserCollectionsFromScraperApi(userAddress ?? '');

      // The scraper doesn't return off chain info like (images, etc.) so we need to call the Universe Backend App for more info.

      // Fetch collection (off chain) data from the Universe API
      const getOffChainCollectionDataPromises = userCollections.map(async ({ contractAddress }) => {
        const { id, name, address, coverUrl: image } = await GetCollectionApi(contractAddress);

        const result: ICollectionsFilterCollection = {
          id,
          name,
          address,
          image,
        };

        return result;
      })

      return await Promise.all(getOffChainCollectionDataPromises);
    },
    {
      enabled: !!userAddress,
      keepPreviousData: true,
      retry: false,
      onSuccess: (response) => onSuccess?.(response),
      onError: (error) => onError?.(error),
    },
  );

  return collections;
}
