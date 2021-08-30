import { getBidTypeByValue } from '../../fixtures/BidOptions';
import { parseRoyalties } from '../contractInteraction';

export const createRequestObject = ({ auction, bidtype }) => {
  const requestObject = {
    name: auction.name,
    startingBid: auction.startingBid,
    startDate: auction.startDate,
    endDate: auction.endDate,
    tokenAddress: null,
    tokenSymbol: null,
    tokenDecimals: null,
    royaltySplits: null,
    rewardTiers: null,
  };

  return {
    auction,
    bidtype,
    requestObject,
  };
};

export const attachTokenData = ({ auction, bidtype, requestObject }) => {
  const bidtypeObject = getBidTypeByValue(bidtype);
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
  auction.tiers.forEach((t) => {
    const tierObject = {
      name: t.name,
      numberOfWinners: t.winners,
      nftsPerWinner: t.nftsPerWinner,
      minimumBid: t.minBidValue || 0.1,
      nftIds: [],
    };

    t.nfts.forEach((nft) => tierObject.nftIds.push(nft.id));

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
