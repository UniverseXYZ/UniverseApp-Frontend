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
  console.log(chunkedSlots);
  const finalNfts = [];
  const nfts = [];
  const finalSlotIndices = [];
  const slotIndices = [];
  const keys = Object.keys(chunkedSlots);

  keys.forEach((key) => {
    chunkedSlots[key].forEach((nftsChunk) => {
      console.log(nftsChunk);
      const nftsChunke = [];
      nftsChunk.forEach((nft) => {
        nftsChunke.push([nft.id, collections.find((coll) => coll.id === nft.collectionId)]);
      });
      slotIndices.push(+key);
      nfts.push(nftsChunke);
      if (slotIndices.length === maxSlotSize) {
        finalSlotIndices.push(slotIndices);
        finalNfts.push(nfts);
      }
    });
  });

  // Append unfinished slot
  if (slotIndices.length) {
    finalSlotIndices.push(slotIndices);
    finalNfts.push(nfts);
  }

  return [finalSlotIndices, finalNfts];
};

export const getNftsForSlots = (chunkedSlots, slotArrays) => {
  slotArrays.forEach((slot) => {
    slot.forEach((slotKey) => {
      const nfts = chunkedSlots[slotKey.toString()];
      console.log(nfts);
    });
  });
};

export const calculateTransactions = (auction) => {
  let nftsBySlots = auction.rewardTiers.map((tier) =>
    tier.nfts.reduce((groups, item) => {
      const group = groups[item.slot] || [];
      group.push(item);
      groups[item.slot] = group;
      return groups;
    }, {})
  );

  console.log(nftsBySlots);
  // Sort by slot id( I don't think it's necessary)
  nftsBySlots = nftsBySlots.sort((x, y) => x[1].length - y[1].length);

  console.log(nftsBySlots);
  // Split into chunks
  const chunkedSlots = chunkifySlots(nftsBySlots);
  console.log(chunkedSlots);
  // Create slot arrays for function
  // We assume the slots start from
  const slotArrays = splitSlots(JSON.parse(JSON.stringify(chunkedSlots)), auction.collections);
  console.log(slotArrays);

  const nftArrays = getNftsForSlots(chunkedSlots, slotArrays);
};
