import { Contract } from 'ethers';
import { getBidTypeByValue } from '../../fixtures/BidOptions';
import ERC20ABI from '../../../contracts/ERC20.json';

export const getERC20Contract = (erc20Address, signer) =>
  new Contract(erc20Address, ERC20ABI, signer);

export const createRequestObject = ({ auctionCopy, bidtype, options }) => {
  const requestObject = {
    name: auctionCopy.name,
    startingBid: auctionCopy.startingBid,
    startDate: auctionCopy.startDate.toISOString
      ? auctionCopy.startDate.toISOString()
      : auctionCopy.startDate,
    endDate: auctionCopy.endDate.toISOString
      ? auctionCopy.endDate.toISOString()
      : auctionCopy.endDate,
    id: auctionCopy.id || null,
    tokenAddress: null,
    tokenSymbol: null,
    tokenDecimals: null,
    royaltySplits: null,
    tiers: null,
    removed: auctionCopy.removed,
  };

  return {
    auctionCopy,
    bidtype,
    requestObject,
    options,
  };
};

export const attachTokenData = ({ auctionCopy, bidtype, requestObject, options }) => {
  const bidtypeObject = getBidTypeByValue(bidtype, options);
  const bidtypeData = {
    tokenAddress: bidtypeObject.address,
    tokenSymbol: bidtypeObject.name,
    tokenDecimals: bidtypeObject.decimals,
  };

  return {
    auctionCopy,
    requestObject: {
      ...requestObject,
      ...bidtypeData,
    },
  };
};

export const parseNumbers = ({ auctionCopy, requestObject }) => {
  const royaltiesParsed = (auctionCopy.royaltySplits || []).map((r) => ({
    address: r.address,
    percentAmount: +r.percentAmount,
  }));

  const numbersParsedObject = {
    royaltySplits: royaltiesParsed,
    startingBid: parseFloat(requestObject.startingBid),
    tokenDecimals: parseInt(requestObject.tokenDecimals, 10),
  };

  return {
    auctionCopy,
    requestObject: {
      ...requestObject,
      ...numbersParsedObject,
    },
  };
};

export const attachTierNftsIds = ({ auctionCopy, requestObject }) => {
  const tiersArray = [];
  // We should prepare all rewardTiers slots indexes for the BE in sequence 1,2,3,4,5 etc..
  let slotIndex = 1;
  auctionCopy.rewardTiers.forEach((t) => {
    // Update the slot index only if the tier is not removed
    const updatedSlotIndexes = t.nftSlots.map((slot) => {
      const slotCopy = { ...slot };
      slotCopy.minimumBid = Number(slotCopy.minimumBid);

      if (!t.removed) {
        slotCopy.slot = slotIndex;
        slotIndex += 1;
      }

      return slotCopy;
    });

    const tierObject = {
      name: t.name,
      numberOfWinners: t.winners || t.numberOfWinners,
      nftsPerWinner: t.nftsPerWinner,
      nftSlots: updatedSlotIndexes,
      id: t.id,
      removed: t.removed,
    };

    tiersArray.push(tierObject);
  });

  return {
    auctionCopy,
    requestObject: {
      ...requestObject,
      rewardTiers: tiersArray,
    },
  };
};

/**
 *
 * @param {*} file (image)
 * @param {*} cb
 */
export const getImageDimensions = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function onload(e) {
    const image = new Image();
    image.src = e.target.result;
    image.onload = function imageOnload() {
      cb(this);
    };
  };
};
