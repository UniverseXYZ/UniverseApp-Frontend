import { utils } from 'ethers';
import { DEPOSIT_CHUNK_SIZE, MAX_DEPOSIT_SLOT_SIZE } from './auctionContants';

const chunkifySlots = (nftsBySlots) => {
  const chunkedSlots = {};
  Object.keys(nftsBySlots).forEach((slotKey) => {
    const slotsMap = Object.values(nftsBySlots[slotKey]);
    let q;
    let j;

    for (q = 0, j = slotsMap.length; q < j; q += DEPOSIT_CHUNK_SIZE) {
      const chunked = slotsMap.slice(q, q + DEPOSIT_CHUNK_SIZE);
      const group = chunkedSlots[slotKey] || [];
      group.push(chunked);
      chunkedSlots[slotKey] = group;
    }
  });

  return chunkedSlots;
};

const splitSlots = (chunkedSlots, collections) => {
  // Used for SC transactions
  const finalNfts = [];
  let nfts = [];
  // Used for SC transactions
  const finalSlotIndices = [];
  let slotIndices = [];
  // Used for displaying the NFTs
  const displayNfts = [];
  let tempDisplayNfts = [];

  // Used for tracking state changes to the nfts
  const stateNfts = [];
  let tempStateNfts = [];

  const keys = Object.keys(chunkedSlots);

  // We make sure the indexes start from 0
  let nonZeroIndexKeys = keys.map((key) => +key);
  if (keys[0] === '0') {
    nonZeroIndexKeys = keys.map((key) => +key + 1);
  }

  keys.forEach((key, i) => {
    chunkedSlots[key].forEach((nftsChunk) => {
      // console.log(nftsChunk);
      const nftsChunke = [];
      nftsChunk.forEach((nft) => {
        const pushedNftIndx = tempDisplayNfts.map((n) => n.editionUUID).indexOf(nft.editionUUID);
        if (pushedNftIndx < 0) {
          tempDisplayNfts.push({ ...nft, count: 1 });
        } else {
          tempDisplayNfts[pushedNftIndx] = {
            ...tempDisplayNfts[pushedNftIndx],
            count: tempDisplayNfts[pushedNftIndx].count + 1,
          };
        }
        tempStateNfts.push({ ...nft });
        const collAddress = collections.find((coll) => coll.id === nft.collectionId)?.address;
        nftsChunke.push([nft.tokenId, utils.getAddress(collAddress)]);
      });

      slotIndices.push(nonZeroIndexKeys[i]);
      nfts.push(nftsChunke);
      if (slotIndices.length === MAX_DEPOSIT_SLOT_SIZE) {
        finalSlotIndices.push(slotIndices);
        slotIndices = [];
        finalNfts.push(nfts);
        nfts = [];
        displayNfts.push(tempDisplayNfts);
        tempDisplayNfts = [];
        stateNfts.push(tempStateNfts);
        tempStateNfts = [];
      }
    });
  });

  // Append unfinished slot
  if (slotIndices.length) {
    finalSlotIndices.push(slotIndices);
    finalNfts.push(nfts);
    displayNfts.push(tempDisplayNfts);
    stateNfts.push(tempStateNfts);
  }

  return { finalSlotIndices, displayNfts, finalNfts, stateNfts };
};

export const getNftsForSlots = (chunkedSlots, slotArrays) => {
  slotArrays.forEach((slot) => {
    slot.forEach((slotKey) => {
      const nfts = chunkedSlots[slotKey.toString()];
      // console.log(nfts);
    });
  });
};

const groupTiersToSlots = (rewardTiers) => {
  const nftsBySlots = rewardTiers.map((tier) =>
    tier.nfts.reduce((groups, item) => {
      const group = groups[item.slot] || [];
      group.push(item);
      groups[item.slot] = group;
      return groups;
    }, {})
  );
  const flatNftsBySlots = {};
  nftsBySlots.forEach((slotMapping) => {
    Object.keys(slotMapping).forEach((key) => {
      flatNftsBySlots[key] = slotMapping[key];
    });
  });
  return flatNftsBySlots;
};

export const calculateTransactions = (auction) => {
  const nftsBySlots = groupTiersToSlots(auction.rewardTiers);
  // console.log(nftsBySlots);

  const chunkedSlots = chunkifySlots(nftsBySlots);
  // console.log(chunkedSlots);

  // Create slot arrays for function
  // We assume the slots start from
  const transactionConfig = splitSlots(chunkedSlots, auction.collections);
  // console.log(slotArrays);

  return transactionConfig;
};
