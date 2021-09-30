/* eslint-disable no-await-in-loop */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-expressions */
import { Contract } from 'ethers';
import { formatRoyaltiesForMinting } from '../utils/helpers/contractInteraction';
import { sendMintRequest, sendBatchMintRequest } from './api/ContractInteraction';
import { createMintingNFT, getMetaForSavedNft } from '../utils/api/mintNFT';

const FACTTORY_CONTRACT_ID = 2;
const getCurrentDay = () => parseInt(new Date().getTime() / (10000 * 60 * 60 * 24), 10);

export const getPlaceholdersLocalStorage = () =>
  JSON.parse(localStorage.getItem('nftsPlaceholders')) || [];

export const setPlaceholdersLocalStorage = (data) => {
  localStorage.setItem('nftsPlaceholders', JSON.stringify(data));
  localStorage.setItem('nftsPlaceholdersBuster', JSON.stringify(getCurrentDay()));
};

const createPlaceholders = (nfts) => {
  const currentList = getPlaceholdersLocalStorage();
  nfts?.forEach((nft) => {
    for (let i = 0; i < nft.numberOfEditions; i += 1) {
      currentList.push(
        `${nft.collectionId || FACTTORY_CONTRACT_ID}${nft?.name || ''}${nft?.description || ''}`
      );
    }
  });

  setPlaceholdersLocalStorage(currentList);
};

/**
 * @param {Object} data
 * @param {Array} data.nfts
 * @param {Object} data.helpers
 * @param data.helpers.collectionsIdAddressMapping
 * @param data.helpers.UniverseERC721Core
 * @param data.helpers.signer
 * @param data.helpers.universeERC721CoreContract
 * @param data.helpers.contracts
 * @param data.helpers.activeTxHashes
 * @param data.helpers.setActiveTxHashes
 */
export async function MintSavedNftsFlow({ nfts, helpers }) {
  const requiredContracts = {};

  nfts.forEach((nft) => {
    const contractAddress = helpers.collectionsIdAddressMapping[nft.collectionId];
    requiredContracts[nft.collectionId] = requiredContracts[nft.collectionId] || {};

    if (!contractAddress) {
      requiredContracts[nft.collectionId] = helpers.universeERC721CoreContract;
    } else {
      requiredContracts[nft.collectionId] = new Contract(
        contractAddress,
        helpers.contracts.UniverseERC721.abi,
        helpers.signer
      );
    }
  });

  const formatNfts = nfts.map((nft) => ({
    collectionId: nft.collectionId ? nft.collectionId : 0,
    royalties: nft.royalties ? formatRoyaltiesForMinting(nft.royalties) : [],
    id: nft.id,
    numberOfEditions: nft.numberOfEditions,
    name: nft.name,
    description: nft.description,
  }));

  const tokenURIsPromises = formatNfts.map(async (nft) => {
    const meta = await getMetaForSavedNft(nft.id);
    return { ...meta, nftId: nft.id };
  });
  const tokenURIs = await Promise.all(tokenURIsPromises);

  if (!tokenURIs.length) {
    console.error('server error. cannot get meta data');
    return {};
  }

  const nftsAttachedTokenUri = formatNfts.map((nft) => {
    const tokenData = tokenURIs.find((data) => data.nftId === nft.id);

    return {
      ...nft,
      tokenUri: tokenData.tokenUris,
      mintingId: tokenData.mintingNft.id,
    };
  });

  const tokenURIsAndRoyaltiesObject = {};

  nftsAttachedTokenUri.forEach((nft) => {
    if (!tokenURIsAndRoyaltiesObject[nft.collectionId])
      tokenURIsAndRoyaltiesObject[nft.collectionId] = [];

    nft.tokenUri.forEach((token) => {
      tokenURIsAndRoyaltiesObject[nft.collectionId].push({
        token,
        royalties: nft.royalties,
        mintingId: nft.mintingId,
      });
    });
  });

  const isSingle =
    nftsAttachedTokenUri.length === 1 && nftsAttachedTokenUri[0].tokenUri.length === 1;

  const txDataArray = isSingle
    ? await sendMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, helpers)
    : await sendBatchMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, helpers);

  const mintingNftsPromises = txDataArray.map(async (data) => {
    const txHash = data.transaction.hash;
    const uniqueMintingIds = data.mintingIds.filter(
      (c, index) => data.mintingIds.indexOf(c) === index
    );

    const mints = uniqueMintingIds.map((id) => createMintingNFT(txHash, id));
    await Promise.all(mints);
  });

  await Promise.all(mintingNftsPromises);

  return true;
}
