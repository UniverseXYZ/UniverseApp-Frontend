import { Contract } from 'ethers';
import { getBidTypeByValue } from '../../fixtures/BidOptions';
import { parseRoyalties } from '../contractInteraction';
import ERC20ABI from '../../../contracts/ERC20.json';

export const getERC20Contract = (erc20Address, signer) =>
  new Contract(erc20Address, ERC20ABI, signer);

export const createRequestObject = ({ auction, bidtype, options }) => {
  const requestObject = {
    name: auction.name,
    startingBid: auction.startingBid,
    startDate: auction.startDate.toISOString ? auction.startDate.toISOString() : auction.startDate,
    endDate: auction.endDate.toISOString ? auction.endDate.toISOString() : auction.endDate,
    id: auction.id || null,
    tokenAddress: null,
    tokenSymbol: null,
    tokenDecimals: null,
    royaltySplits: null,
    tiers: null,
    removed: auction.removed,
  };

  return {
    auction,
    bidtype,
    requestObject,
    options,
  };
};

export const attachTokenData = ({ auction, bidtype, requestObject, options }) => {
  const bidtypeObject = getBidTypeByValue(bidtype, options);
  const bidtypeData = {
    tokenAddress: bidtypeObject.address,
    tokenSymbol: bidtypeObject.name,
    tokenDecimals: bidtypeObject.decimals,
  };

  return {
    auction,
    requestObject: {
      ...requestObject,
      ...bidtypeData,
    },
  };
};

export const parseNumbers = ({ auction, requestObject }) => {
  const propertyNameForAmount = 'percentAmount';
  const royaltiesParsed = parseRoyalties(auction.properties, propertyNameForAmount);
  const numbersParsedObject = {
    royaltySplits: royaltiesParsed,
    startingBid: parseFloat(requestObject.startingBid),
    tokenDecimals: parseInt(requestObject.tokenDecimals, 10),
  };

  return {
    auction,
    requestObject: {
      ...requestObject,
      ...numbersParsedObject,
    },
  };
};

export const attachTierNftsIds = ({ auction, requestObject }) => {
  const tiersArray = [];

  // We should prepare all rewardTiers slots indexes for the BE in sequence 1,2,3,4,5 etc..
  let slotIndex = 1;
  auction.rewardTiers.forEach((t) => {
    const updatedSlotIndexes = t.nftSlots.map((slot) => {
      const slotCopy = { ...slot };
      slotCopy.slot = slotIndex;
      slotIndex += 1;
      return slotCopy;
    });
    const tierObject = {
      name: t.name,
      numberOfWinners: t.winners || t.numberOfWinners,
      nftsPerWinner: t.nftsPerWinner,
      minimumBid: t.minBidValue || 0.1,
      nftSlots: updatedSlotIndexes,
      id: t.id,
      removed: t.removed,
    };

    tiersArray.push(tierObject);
  });

  return {
    auction,
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
