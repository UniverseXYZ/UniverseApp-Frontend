import { utils } from 'ethers';

const chunkSize = 5;
const maxSlotSize = 10;

const chunkifySlots = (nftsBySlots) => {
  const chunkedSlots = {};
  Object.keys(nftsBySlots).forEach((key) => {
    const slotsMap = Object.values(nftsBySlots[key]);
    Object.keys(slotsMap).forEach((slotKey) => {
      const slotsArray = slotsMap[slotKey];
      let q;
      let j;

      for (q = 0, j = slotsArray.length; q < j; q += chunkSize) {
        const chunked = slotsArray.slice(q, q + chunkSize);
        const group = chunkedSlots[slotKey] || [];
        group.push(chunked);
        chunkedSlots[slotKey] = group;
      }
    });
  });

  return chunkedSlots;
};

const splitSlots = (chunkedSlots, collections) => {
  // console.log(chunkedSlots);
  const finalNfts = [];
  let nfts = [];
  const finalSlotIndices = [];
  let slotIndices = [];
  const displayNfts = [];
  let tempDisplayNfts = [];
  const keys = Object.keys(chunkedSlots);

  // We make sure the indexes start from 0
  let nonZeroIndexKeys = keys;
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
        const collAddress = collections.find((coll) => coll.id === nft.collectionId)?.address;
        nftsChunke.push([nft.id, utils.getAddress(collAddress)]);
      });
      slotIndices.push(nonZeroIndexKeys[i]);
      nfts.push(nftsChunke);
      if (slotIndices.length === maxSlotSize) {
        finalSlotIndices.push(slotIndices);
        slotIndices = [];
        finalNfts.push(nfts);
        nfts = [];
        displayNfts.push(tempDisplayNfts);
        tempDisplayNfts = [];
      }
    });
  });

  // Append unfinished slot
  if (slotIndices.length) {
    finalSlotIndices.push(slotIndices);
    finalNfts.push(nfts);
    displayNfts.push(tempDisplayNfts);
  }

  return { finalSlotIndices, displayNfts, finalNfts };
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
  const flatNftsBySlots = [];
  nftsBySlots.forEach((array) => {
    flatNftsBySlots.push(array);
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
