import React, { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useEffectOnce } from 'react-use';

import { collectionKeys } from '@app/utils/query-keys';
import { GetCollectionApi, GetCollectionsFromScraperApi } from '@app/api';

import { ISearchBarProps, } from './types';
import { DEFAULT_COLLECTIONS } from './constants';
import { ISearchBarDropdownCollection } from '../../../nft/types';
import { SearchSelect } from './SelectSearch';

export const SearchBar = (props: ISearchBarProps) => {
  const {
    value,
    onChange,
    onClear,
  } = props;

  const [search, setSearch] = useState('');
  const [collections, setCollections] = useState<ISearchBarDropdownCollection[]>(DEFAULT_COLLECTIONS);

  const queryClient = useQueryClient();

  const { isLoading, mutate, mutateAsync } = useMutation(
    async (search: string) => {
      const cache = queryClient.getQueryCache().get(JSON.stringify(['collections', search]));
      if (cache) {
        return cache.state.data as ISearchBarDropdownCollection[];
      }

      if (!search) {
        queryClient.setQueryData(['collections', search], DEFAULT_COLLECTIONS);

        return DEFAULT_COLLECTIONS;
      }

      // Get the collections data
      const scraperData = await GetCollectionsFromScraperApi(search);
      // The scraper doesn't return off chain info like (images, etc.) so we need to call the Universe Backend App for more info.

      // Fetch collection (off chain) data from the Universe API
      const getOffChainCollectionDataPromises = scraperData.map(async (c: ISearchBarDropdownCollection) => {
        const copy: ISearchBarDropdownCollection  = { ...c };
        const offChainData = await GetCollectionApi(copy.address);
        queryClient.setQueryData(collectionKeys.centralizedInfo(copy.address), offChainData)
        // Mutate the copy
        if (offChainData) {
          copy.image = offChainData.coverUrl ?? null;
          copy.name = copy.name || offChainData.name;
        }

        return copy;
      })

      const fullCollectionData = await Promise.all(getOffChainCollectionDataPromises);

      queryClient.setQueryData(['collections', search], fullCollectionData);

      // TODO:: Fetch the items count from the Scrapper API (ако има време !)
      return fullCollectionData;
    },
    {
      retry: false,
      onSuccess: (collections: ISearchBarDropdownCollection[]) => setCollections(collections || []),
    }
  );

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    mutate(value);
  }, []);

  const handleChange = useCallback((item: ISearchBarDropdownCollection) => {
    setSearch(item.name);
    onChange(item.address);
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange('');
    onClear();

    setSearch('');

    setCollections(DEFAULT_COLLECTIONS);
  }, [onChange, onClear]);

  useEffectOnce(() => {
    (async () => {
      if (value && !search) {
        const collection = DEFAULT_COLLECTIONS.find((collection) => collection.address === value);
        if (collection) {
          setSearch(collection.name);
        } else {
          const collections = await mutateAsync(value);
          setSearch((collections || []).find(collection => collection.address === value)?.name ?? '');
        }
      }
    })();
  });

  return (
    <SearchSelect
      items={collections}
      isFetchingCollections={isLoading}
      search={search}
      searchPlaceholder={'Search collections'}

      onChange={handleChange}
      onSearch={handleSearch}
      onClear={handleClear}
    />
  );
}
