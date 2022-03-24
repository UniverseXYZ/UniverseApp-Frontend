import React, { useEffect, useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsyncAbortable } from 'react-async-hook';
import { getMyMintingNfts } from '../api/mintNFT';
import useStateIfMounted from './useStateIfMounted';

const buildMyNftsEndpointUrl = (offset, perPage, text, collections) => {
  let endpoint = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-nfts?offset=${offset}&limit=${perPage}`;

  if (text) {
    endpoint += `&name=${text}`;
  }
  if (collections.length) {
    const mapped = collections.map((c) => c.id).join(',');
    endpoint += `&collections=${mapped}`;
  }
  return endpoint;
};

export const useSearchMyNfts = () => {
  const debounceInterval = 500;
  // Must be > 32 because we need at least 2 pages in order for the continuous load to work
  const perPage = 33;
  const [inputText, setInputText] = useStateIfMounted('');
  const [apiPage, setApiPage] = useStateIfMounted(0);
  const [results, setResults] = useStateIfMounted([]);
  const [isLastPage, setIsLastPage] = useStateIfMounted(false);
  const [loadedPages, setLoadedPages] = useStateIfMounted([]);
  const [collections, setCollections] = useStateIfMounted([]);
  const [mintingNfts, setMintingNfts] = useStateIfMounted([]);
  const [mintingNftsCount, setMintingNftsCount] = useStateIfMounted(0);

  const serachMyNfts = async (endpoint, abortSignal) => {
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
      return json;
    });
    setIsLastPage(false);
    return json;
  };

  // Debounce the original search async function
  const debouncedSearchCollectionNfts = useConstant(() =>
    AwesomeDebouncePromise(serachMyNfts, debounceInterval, {})
  );

  // Debounce the original search async function
  const debouncedLoadMoreNfts = useConstant(() =>
    AwesomeDebouncePromise(loadMoreNfts, debounceInterval)
  );

  // const search = useAsyncAbortable(
  //   async (abortSignal) => {
  //     const endpoint = buildMyNftsEndpointUrl(perPage * apiPage, perPage, inputText, collections);
  //     if (apiPage === 0) {
  //       return debouncedSearchCollectionNfts(endpoint, abortSignal);
  //     }
  //     return debouncedLoadMoreNfts(endpoint, abortSignal);
  //   },
  //   // Ensure a new request is made everytime the text changes (even if it's debounced)
  //   [perPage, inputText, apiPage, collections, mintingNftsCount]
  // );

  useEffect(() => {
    (async () => {
      const minting = await getMyMintingNfts();
      setMintingNftsCount(minting.mintingNfts.length);
      setMintingNfts(minting.mintingNfts);
    })();
  }, []);

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    apiPage,
    setApiPage,
    // search,
    results,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
    collections,
    setCollections,
    mintingNfts,
    setMintingNfts,
    mintingNftsCount,
    setMintingNftsCount,
  };
};
