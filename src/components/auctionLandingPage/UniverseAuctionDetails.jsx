import React, { useState, useEffect } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import PropTypes from 'prop-types';
import auctionLengthIcon from '../../assets/images/auction-length.svg';
import biddingCurrencyIcon from '../../assets/images/bidding-currency.svg';
import placingBidsIcon from '../../assets/images/placing-bids.svg';
import multipleNFTsIcon from '../../assets/images/multiple-nfts.svg';

const UniverseAuctionDetails = ({ auction }) => {
  const { endDate, startDate } = auction.auction;

  const [durationText, setDurationText] = useState('');

  useEffect(() => {
    if (endDate && startDate) {
      // We don't need to calculate minutes as the auction duration will be at least 1 hour
      const dateDifference = (new Date(endDate) - new Date(startDate)) / 1000;
      const daysDuration = Math.floor(dateDifference / 86400);
      const hoursDuration = Math.floor(dateDifference / 3600) % 24;

      // Calculate days and hours
      let days = '';
      if (daysDuration > 0) {
        days = `${daysDuration} day${daysDuration > 1 ? 's' : ''}`;
      }

      let hours = '';
      if (daysDuration > 0) {
        hours = `${hoursDuration} hour${hoursDuration > 1 ? 's' : ''}`;
      }

      // If we have both days and hours add 'and' between them
      const duration = days && hours ? `${days} and ${hours}` : days || hours;

      // Make sure if in some case the text will be empty (hours < 0)
      let finalText = '';
      if (duration) {
        finalText = `will last ${duration} and`;
      } else {
        finalText = 'will last less than 1 hour and';
      }

      setDurationText(finalText);
    }
  }, [endDate, startDate]);

  return (
    <div className="universe__auction__details__section">
      <div className="universe__auction__details__section__container">
        <AnimatedOnScroll animationIn="zoomIn">
          <h1 className="title">
            Universe <span>auction details</span>
          </h1>
          <p className="desc">Here are some tips about the Universe</p>
        </AnimatedOnScroll>
        <div className="boxes">
          <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={200}>
            <div className="box">
              <div className="nowrap__mobile">
                <img src={auctionLengthIcon} alt="Auction Length" />
                <h2 className="sub__title">Auction length</h2>
              </div>
              <p className="sub__desc">
                {`This auction ${durationText} will be extended 5 minutes after every bid with 5 minutes left on the auction.
                This gives everyone ample time to place a bid and have a fair chance at the auction.`}
              </p>
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={400}>
            <div className="box">
              <div className="nowrap__mobile">
                <img src={biddingCurrencyIcon} alt="Bidding Currency" />
                <h2 className="sub__title">Bidding currency</h2>
              </div>
              <p className="sub__desc">
                We have allowed you to pay with almost any ERC-20 by the contract address. This
                means you will be able to Bid with any currency in your wallet which means no more
                wasting gas on failed swaps to get a bid placed in time.
              </p>
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={600}>
            <div className="box">
              <div className="nowrap__mobile">
                <img src={placingBidsIcon} alt="Placing Bids" />
                <h2 className="sub__title">Placing bids</h2>
              </div>
              <p className="sub__desc">
                Placing a bid is easy and seamless. Just connect your wallet and follow the on
                screen instructions to place a bid. You may have to place a few bids to win and this
                may require a multiple gas fees.
              </p>
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={800}>
            <div className="box">
              <div className="nowrap__mobile">
                <img src={multipleNFTsIcon} alt="Multiple NFTs & Winners" />
                <h2 className="sub__title">Multiple NFTs & winners</h2>
              </div>
              <p className="sub__desc">
                This auction styler allows multiple winners to win multiple NFTs. Each Tier is
                strategically set up so that a specific slot has specific NFTs, usually the best
                tier will be slot 1 which has the best NFTs and lowest edition numbers.
              </p>
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
    </div>
  );
};

UniverseAuctionDetails.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default UniverseAuctionDetails;
