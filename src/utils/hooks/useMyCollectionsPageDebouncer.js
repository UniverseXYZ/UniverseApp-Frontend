import React, { useEffect, useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsyncAbortable } from 'react-async-hook';
import { getMyMintingCollections } from '../api/mintNFT';
import useStateIfMounted from './useStateIfMounted';

const buildCollectionPageUrl = (offset, perPage) => {
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-nfts/collections?offset=${offset}&limit=${perPage}`;
  return endpoint;
};

export const useSearchMyCollections = () => {
  const debounceInterval = 500;
  // Must be > 32 because we need at least 2 pages in order for the continuous load to work
  const perPage = 33;
  const [apiPage, setApiPage] = useStateIfMounted(0);
  const [results, setResults] = useStateIfMounted([]);
  const [isLastPage, setIsLastPage] = useStateIfMounted(false);
  const [loadedPages, setLoadedPages] = useStateIfMounted([]);
  const [mintingCollectionsCount, setMintingCollectionsCount] = useStateIfMounted(0);
  const [mintingCollections, setMintingCollections] = useStateIfMounted([]);

  const searchCollections = async (endpoint, abortSignal) => {
    const result = await fetch(endpoint, {
      signal: abortSignal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
      },
    });
    if (result.status !== 200) {
      throw new Error(`bad status = ${result.status}`);
    }
    const json = await result.json();
    setResults(json);
    return json;
  };

  const loadMoreCollections = async (endpoint, abortSignal) => {
    const result = await fetch(endpoint, {
      signal: abortSignal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
      },
    });
    if (result.status !== 200) {
      throw new Error(`bad status = ${result.status}`);
    }
    const json = await result.json();
    setResults((old) => {
      const concatedNfts = [...old.nfts, ...json.nfts];
      json.nfts = concatedNfts;
      console.log(json);
      return json;
    });
    setIsLastPage(false);
    return json;
  };

  // Debounce the original search async function
  const debouncedSearchCollectionNfts = useConstant(() =>
    AwesomeDebouncePromise(searchCollections, debounceInterval)
  );

  // Debounce the original search async function
  const debouncedLoadMoreNfts = useConstant(() =>
    AwesomeDebouncePromise(loadMoreCollections, debounceInterval)
  );

  const search = useAsyncAbortable(
    async (abortSignal) => {
      const endpoint = buildCollectionPageUrl(perPage * apiPage, perPage);
      if (apiPage === 0) {
        return debouncedSearchCollectionNfts(endpoint, abortSignal);
      }
      return debouncedLoadMoreNfts(endpoint, abortSignal);
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [perPage, apiPage, mintingCollectionsCount]
  );

  useEffect(() => {
    (async () => {
      const minting = await getMyMintingCollections();
      setMintingCollectionsCount(minting.collections.length);
      setMintingCollections(minting.collections);
    })();
  }, []);

  // Return everything needed for the hook consumer
  return {
    apiPage,
    setApiPage,
    search,
    results,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
    mintingCollectionsCount,
    setMintingCollectionsCount,
    mintingCollections,
    setMintingCollections,
  };
};
