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
      if (bidder?.user.address && slot.winner === utils.getAddress(bidder.user.address)) {
        slotInfo = slot;
        slotIndex = slotKeys[i];
      }
    });

    if (slotIndex === 0) {
      slotIndex = tier.nfts[0].slot;
      slotInfo = slotValues[slotIndex - 1];
    }

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

export const createBatchCaptureRevenueTxsFinalised = (rewardTiersSlots, bidders, slotsInfo) => {
  const singleCaptureTxs = createSingleCaptureRevenueTxs(rewardTiersSlots, bidders, slotsInfo).sort(
    (a, b) => a.startSlot - b.startSlot
  );

  singleCaptureTxs.forEach((tx, txIndex) => {
    if (tx.slotInfo?.revenueCaptured) {
      singleCaptureTxs[txIndex] = [];
    }
  });

  const txs = [];

  let txObject = {
    startSlot: 0,
    endSlot: 0,
    totalNfts: 0,
    tiers: [],
    revenueCaptured: false,
  };

  singleCaptureTxs.forEach((tx, txIndex) => {
    // If we get to an already captured slot or exceed the maxNftsPerTxLimit
    // We push the current txs
    if (!tx.slotInfo) {
      if (txObject.totalNfts) {
        txs.push(txObject);
        txObject = {
          startSlot: 0,
          endSlot: 0,
          totalNfts: 0,
          tiers: [],
          revenueCaptured: false,
        };
      }
      return;
    }

    if (txObject.totalNfts + tx.tier.nfts.length > maxNftsPerTx) {
      txs.push(txObject);
      txObject = {
        startSlot: 0,
        endSlot: 0,
        totalNfts: 0,
        tiers: [],
        revenueCaptured: tx.revenueCaptured,
      };
    }

    if (txObject.startSlot === 0) {
      txObject.startSlot = tx.startSlot;
    }
    txObject.endSlot = tx.endSlot;
    txObject.totalNfts += tx.tier.nfts.length;
    // Avoid duplicate tiers
    if (tx.tier.id !== txObject.tiers[txObject.tiers.length - 1]?.id || 0) {
      txObject.tiers.push(tx.tier);
    }
  });

  // Push any remaining transactions
  if (txObject.tiers.length) {
    txs.push(txObject);
  }
  return txs;
};

export const createBatchCaptureRevenueTxsNotFinalised = (rewardTiersSlots) => {
  const txs = [];

  let txObject = {
    startSlot: 0,
    endSlot: 0,
    totalNfts: 0,
    tiers: [],
    revenueCaptured: false,
  };

  rewardTiersSlots.forEach((tier, index) => {
    if (txObject.totalNfts + tier.nfts.length > maxNftsPerTx) {
      txs.push(txObject);
      txObject = {
        totalNfts: 0,
        tiers: [],
        revenueCaptured: false,
      };
    }

    txObject.totalNfts += tier.nfts.length;
    // Avoid duplicate tiers
    if (tier.id !== txObject.tiers[txObject.tiers.length - 1]?.id || 0) {
      txObject.tiers.push(tier);
    }
  });

  // Push any remaining transactions
  if (txObject.tiers.length) {
    txs.push(txObject);
  }
  return txs;
};
