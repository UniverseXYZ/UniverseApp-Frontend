import { formatDuration, intervalToDuration } from 'date-fns';
import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

// export const getTimeLeft = (date) => {
//   const now = new Date();
//   const endDate = new Date(date);
//   const duration = intervalToDuration({
//     start: now,
//     end: endDate,
//   });
//   formatDuration(duration, {
//     delimiter: ', ',
//   });

//   const timeLeft = [];
//   Object.keys(duration).forEach((key, index) => {
//     const currentValue = Object.values(duration)[index];
//     if (currentValue) {
//       let currentValueText = currentValue.toString();
//       timeLeft.push((currentValueText += key.charAt(0)));
//     }
//   });
//   return timeLeft;
// };

export const getPromoImageProps = (imageUrl) => {
  const promoImageProps = {
    class: 'artist__image',
    src: '',
  };
  if (imageUrl) {
    promoImageProps.class = 'original';
    promoImageProps.src = imageUrl;
  }

  return promoImageProps;
};

export const bidsInUsd = (auction) => {
  const { ethPrice } = useAuthContext();
  const ethInUsd = ethPrice.market_data?.current_price?.usd || null;
  const highestBid = auction.bids?.highestBid || null;
  const lowestBid = auction.bids?.lowestBid || null;

  const canDisplayHighestWinningBid = ethInUsd && highestBid;
  const canDisplayLowestWinningBid = ethInUsd && lowestBid;

  const bids = {
    highestBidInUsd: null,
    lowestBidInUsd: null,
    highestBid,
    lowestBid,
  };

  if (canDisplayHighestWinningBid) {
    bids.highestBidInUsd = highestBid * ethInUsd;
  }
  if (canDisplayLowestWinningBid) {
    bids.lowestBidInUsd = lowestBid * ethInUsd;
  }
  return bids;
};

export const createNftsPerWinnerMarkup = (auction) => {
  const nftsPerWinnerCount = auction.rewardTiers.map((tier) => tier.nftsPerWinner);
  const minNftsPerWinner = Math.min(...nftsPerWinnerCount);
  const maxNftsPerWinner = Math.max(...nftsPerWinnerCount);
  let showBothValues = false;
  let nftsPerWinnerMarkup = null;

  if (minNftsPerWinner !== maxNftsPerWinner) {
    showBothValues = true;
  }
  if (showBothValues) {
    nftsPerWinnerMarkup = <p>{`${minNftsPerWinner}-${maxNftsPerWinner}`}</p>;
  } else {
    nftsPerWinnerMarkup = <p>{minNftsPerWinner}</p>;
  }
  if (minNftsPerWinner) {
    return nftsPerWinnerMarkup;
  }
  return null;
};
