// TODO: Get this from smart contract nftSlotLimit
const maxNftsPerTx = 100;

export const createBatchCaptureRevenueTxs = (rewardTiers) => {
  const txs = [];
  let startSlot = 1;
  let endSlot = 0;
  // Iterate over all reward tiers
  let txObject = {
    startSlot,
    endSlot,
    totalNfts: 0,
    tiers: [],
  };

  rewardTiers.forEach((tier) => {
    // Keep track of nfts count
    if (txObject.totalNfts + tier.nfts.length > maxNftsPerTx) {
      // Append current transaction info to final transactions and create a new tx array
      txs.push(txObject);
      startSlot = endSlot;
      txObject = {
        startSlot,
        endSlot,
        totalNfts: 0,
        tiers: [],
      };
    }
    endSlot += tier.numberOfWinners;
    txObject.endSlot = endSlot;
    txObject.totalNfts += tier.nfts.length;
    txObject.tiers = [...txObject.tiers, tier];
  });

  // Push any remaining transactions
  if (txObject.tiers.length) {
    txs.push(txObject);
  }
  return txs;
};

export const createSingleCaptureRevenueTxs = (rewardTiersSlots, bidders) => {
  const txs = [];

  rewardTiersSlots.forEach((tier, index) => {
    const bidder = bidders[index];
    const txObj = {
      bidder,
      tier,
    };
    txs.push(txObj);
  });

  return txs;
};
