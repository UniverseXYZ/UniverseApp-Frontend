import React, { useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsyncAbortable } from 'react-async-hook';
import { Contract, providers } from 'ethers';
import Contracts from '../../contracts/contracts.json';
import { useAuthContext } from '../../contexts/AuthContext';

const GET_PROFILE_INFO_URL = `${process.env.REACT_APP_API_BASE_URL}/api/user/get-profile-info`;

const searchOwner = async (address, abortSignal) => {
  const result = await fetch(`${GET_PROFILE_INFO_URL}/${address.toLowerCase()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    signal: abortSignal,
  });
  if (result.status !== 200) {
    throw new Error(`bad status = ${result.status}`);
  }
  try {
    const json = await result.json();
    return json;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const useOwnerSearch = (collectionAddress, tokenId) => {
  // Debounce the original search async function
  const { signer } = useAuthContext();

  const debouncedOwnersSearch = useConstant(() => AwesomeDebouncePromise(searchOwner, 1000));

  const search = useAsyncAbortable(async (abortSignal) => {
    if (!signer || !collectionAddress || !tokenId) {
      return null;
    }

    const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

    const universeERC721FactoryContractResult = new Contract(
      collectionAddress,
      contractsData.UniverseERC721Core.abi,
      signer
    );

    let ownerAddress = null;
    if (collectionAddress === contractsData.UniverseERC721Core.address) {
      ownerAddress = await universeERC721CoreContractResult.creatorOf(tokenId);
    } else {
      ownerAddress = await universeERC721FactoryContractResult.ownerOf(tokenId);
    }
    return debouncedOwnersSearch(ownerAddress, abortSignal);
  }, []);

  return { search };
};
