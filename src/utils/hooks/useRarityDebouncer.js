import React, { useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsyncAbortable } from 'react-async-hook';

const RARITY_BACKEND_BASE_URI = 'http://localhost:8000/morphs';

const buildRarityUrl = (
  page = 1,
  perPagee = 12,
  text = '',
  sortField = '',
  sortDir = '',
  filter = ''
) => {
  let endpoint = `${RARITY_BACKEND_BASE_URI}?page=${page}&take=${perPagee}`;
  if (text) {
    endpoint = `${endpoint}&search=${text}`;
  }
  if (sortField) {
    endpoint = `${endpoint}&sortField=${sortField}`;
  }
  if (sortDir) {
    endpoint = `${endpoint}&sortDir=${sortDir}`;
  }
  if (filter) {
    endpoint = `${endpoint}&filter=${filter}`;
  }

  return endpoint;
};

export const useSearchPolymorphs = () => {
  const perPage = 500;
  const [inputText, setInputText] = useState('');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('rarityscore');
  const [sortDir, setSortDir] = useState('desc');
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const searchPolymorphsRarity = async (endpoint, abortSignal) => {
    const result = await fetch(endpoint, {
      signal: abortSignal,
    });
    if (result.status !== 200) {
      throw new Error(`bad status = ${result.status}`);
    }
    const json = await result.json();
    console.log(json);
    setResults([...json]);
    return json;
  };

  const loadMorePolymorphs = async (endpoint, abortSignal) => {
    const result = await fetch(endpoint, {
      signal: abortSignal,
    });
    if (result.status !== 200) {
      throw new Error(`bad status = ${result.status}`);
    }
    const json = await result.json();
    setResults((old) => [...old, ...json]);
    setIsLastPage(false);
    return json;
  };

  // Debounce the original search async function
  const debouncedSearchPolymorphsRarity = useConstant(() =>
    AwesomeDebouncePromise(searchPolymorphsRarity, 1000)
  );

  // Debounce the original search async function
  const debouncedLoadMorePolymorphs = useConstant(() =>
    AwesomeDebouncePromise(loadMorePolymorphs, 1000)
  );

  const search = useAsyncAbortable(
    async (abortSignal, text) => {
      // If the input is empty, return nothing immediately (without the debouncing delay!)
      // if (text.length === 0) {
      //   return [];
      // }
      // Else we use the debounced api
      const endpoint = buildRarityUrl(page, perPage, text, sortField, sortDir, filter);
      if (page === 1) {
        return debouncedSearchPolymorphsRarity(endpoint, abortSignal);
      }
      return debouncedLoadMorePolymorphs(endpoint, abortSignal);
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [inputText, page, sortField, sortDir]
  );

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    page,
    setPage,
    sortField,
    setSortField,
    sortDir,
    setSortDir,
    filter,
    setFilter,
    search,
    results,
    isLastPage,
    setIsLastPage,
  };
};
