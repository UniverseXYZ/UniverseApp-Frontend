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

export const getPromoImageProps = (imageUrl, userImage) => {
  const promoImageProps = {
    class: 'artist__image',
    src: userImage,
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
  const highestBid = auction?.bids?.highestBid;
  const lowestBid = auction?.bids?.lowestBid;

  const bids = {
    highestBidInUsd: null,
    lowestBidInUsd: null,
    highestBid,
    lowestBid,
  };

  if (highestBid || (highestBid === 0 && ethInUsd)) {
    bids.highestBidInUsd = highestBid * ethInUsd;
  }
  if (lowestBid || (lowestBid === 0 && ethInUsd)) {
    bids.lowestBidInUsd = lowestBid * ethInUsd;
  }

  return bids;
};

export const createNftsPerWinnerMarkup = (auction) => {
  const nftsPerWinnerCount = auction.rewardTiers
    .map((tier) => tier.nftsPerWinner.split(' - '))
    .flat();
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
