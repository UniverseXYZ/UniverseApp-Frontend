import React, { useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsyncAbortable } from 'react-async-hook';

const buildSavedNftsUrl = (offset, limit) => {
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts?offset=${offset}&limit=${limit}`;
  return endpoint;
};

export const useSearchSavedNfts = (triggerRefetch, setTriggerRefetch) => {
  const debounceInterval = 500;
  // Must be > 32 because we need at least 2 pages in order for the continuous load to work
  const perPage = 33;
  const [apiPage, setApiPage] = useState(0);
  const [results, setResults] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadedPages, setLoadedPages] = useState([]);

  const searchSavedNfts = async (endpoint, abortSignal) => {
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

  const loadMoreNfts = async (endpoint, abortSignal) => {
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
    AwesomeDebouncePromise(searchSavedNfts, debounceInterval)
  );

  // Debounce the original search async function
  const debouncedLoadMoreNfts = useConstant(() =>
    AwesomeDebouncePromise(loadMoreNfts, debounceInterval)
  );
  const search = useAsyncAbortable(
    async (abortSignal, text) => {
      if (triggerRefetch) {
        setTriggerRefetch(false);
      }
      const endpoint = buildSavedNftsUrl(perPage * apiPage, perPage);
      if (apiPage === 0) {
        return debouncedSearchCollectionNfts(endpoint, abortSignal);
      }
      return debouncedLoadMoreNfts(endpoint, abortSignal);
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [perPage, apiPage, triggerRefetch]
  );

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
    setTriggerRefetch,
  };
};
