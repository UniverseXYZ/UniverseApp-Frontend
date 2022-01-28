import { utils } from 'ethers';

// TODO: Get this from smart contract nftSlotLimit
const maxNftsPerTx = 100;

export const createSingleCaptureRevenueTxs = (rewardTiersSlots, bidders, slotsInfo) => {
  const txs = [];

  rewardTiersSlots.forEach((tier, index) => {
    const bidder = bidders[index];
    const slotKeys = Object.keys(slotsInfo);
    const slotValues = Object.values(slotsInfo);

    let slotInfo = null;
    let slotIndex = 0;

    slotValues.forEach((slot, i) => {
      if (slot.winner === utils.getAddress(tier.winner)) {
        slotInfo = slot;
        slotIndex = slotKeys[i];
      }
    });

    const txObj = {
      bidder,
      tier,
      slotInfo,
      startSlot: slotIndex,
      endSlot: slotIndex,
    };
    txs.push(txObj);
  });

  return txs;
};

export const createBatchCaptureRevenueTxs = (rewardTiersSlots, bidders, slotsInfo) => {
  const singleCaptureTxs = createSingleCaptureRevenueTxs(rewardTiersSlots, bidders, slotsInfo).sort(
    (a, b) => a.startSlot - b.startSlot
  );

  singleCaptureTxs.forEach((tx, txIndex) => {
    if (tx.slotInfo.revenueCaptured) {
      singleCaptureTxs[txIndex] = [];
    }
  });

  const txs = [];

  let txObject = {
    startSlot: 0,
    endSlot: 0,
    totalNfts: 0,
    tiers: [],
    slotIndices: [],
    revenueCaptured: false,
  };

  singleCaptureTxs.forEach((tx, txIndex) => {
    // If we get to an already captured slot or exceed the maxNftsPerTxLimit
    // We push the current txs
    if (!tx.slotInfo) {
      txs.push(txObject);
      txObject = {
        startSlot: 0,
        endSlot: 0,
        totalNfts: 0,
        tiers: [],
        slotIndices: [],
        revenueCaptured: false,
      };
      return;
    }

    if (txObject.totalNfts + tx.tier.nfts.length > maxNftsPerTx) {
      txs.push(txObject);
      txObject = {
        startSlot: 0,
        endSlot: 0,
        totalNfts: 0,
        tiers: [],
        slotIndices: [],
        revenueCaptured: false,
      };
    }

    if (txObject.startSlot === 0) {
      txObject.startSlot = tx.startSlot;
    }
    txObject.endSlot = tx.endSlot;
    txObject.totalNfts += tx.tier.nfts.length;
    txObject.tiers.push(tx.tier);
    txObject.slotIndices.push(txIndex);
  });

  // Push any remaining transactions
  if (txObject.tiers.length) {
    txs.push(txObject);
  }
  return txs;
};
