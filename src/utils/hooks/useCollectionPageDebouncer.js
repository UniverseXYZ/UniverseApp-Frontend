import React, { useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsyncAbortable } from 'react-async-hook';

const buildCollectionPageUrl = (address, offset, perPage, text) => {
  let endpoint = `${process.env.REACT_APP_API_BASE_URL}/api/pages/collection/${address}?offset=${offset}&limit=${perPage}`;
  if (text) {
    endpoint = `${endpoint}&name=${text}`;
  }
  return endpoint;
};

export const useSearchCollection = (address) => {
  const debounceInterval = 500;
  // Must be > 32 because we need at least 2 pages in order for the continuous load to work
  const perPage = 33;
  const [inputText, setInputText] = useStateIfMounted('');
  const [apiPage, setApiPage] = useStateIfMounted(0);
  const [results, setResults] = useStateIfMounted([]);
  const [isLastPage, setIsLastPage] = useStateIfMounted(false);
  const [loadedPages, setLoadedPages] = useStateIfMounted([]);
  const [notFound, setNotFound] = useStateIfMounted(false);

  const searchCollectionNfts = async (endpoint, abortSignal) => {
    const result = await fetch(endpoint, {
      signal: abortSignal,
    });
    if (result.status !== 200) {
      setNotFound(true);
      throw new Error(`bad status = ${result.status}`);
    }
    const json = await result.json();
    setResults(json);
    return json;
  };

  const loadMoreNfts = async (endpoint, abortSignal) => {
    const result = await fetch(endpoint, {
      signal: abortSignal,
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
    AwesomeDebouncePromise(searchCollectionNfts, debounceInterval)
  );

  // Debounce the original search async function
  const debouncedLoadMoreNfts = useConstant(() =>
    AwesomeDebouncePromise(loadMoreNfts, debounceInterval)
  );

  const search = useAsyncAbortable(
    async (abortSignal, text) => {
      const endpoint = buildCollectionPageUrl(address, perPage * apiPage, perPage, inputText);
      if (apiPage === 0) {
        return debouncedSearchCollectionNfts(endpoint, abortSignal);
      }
      return debouncedLoadMoreNfts(endpoint, abortSignal);
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [perPage, inputText, apiPage]
  );

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    apiPage,
    setApiPage,
    search,
    results,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
    notFound,
  };
};
