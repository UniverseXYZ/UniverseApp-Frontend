import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ActiveAuctionCard.scss';
import { getPromoImageProps, bidsInUsd, createNftsPerWinnerMarkup } from '../utils';
import { useAuctionContext } from '../../../contexts/AuctionContext';
import { getBidTypeByName } from '../../../utils/fixtures/BidOptions';
import AuctionsTabsCountdown from '../../auctions/AuctionsTabsCountdown';
import { useSocketContext } from '../../../contexts/SocketContext';

const ActiveAuctionCard = ({ auction, removeAuction }) => {
  const { options } = useAuctionContext();
  const { auctionEvents, subscribeTo, unsubscribeFrom } = useSocketContext();
  const [auctionUpdated, setAuctionUpdated] = useState(auction);

  const updateBidValues = (bids) => {
    const updatedAuction = {
      ...auction,
    };
    if (bids) {
      updatedAuction.bids = bids;
    }
    return updatedAuction;
  };

  const handleUpdateAuction = (err, msg) => {
    if (err) {
      console.error(err);
      return;
    }
    setAuctionUpdated(updateBidValues(msg.bids));
  };

  useEffect(() => {
    if (auction) {
      subscribeTo({
        auctionId: auction.id,
        eventName: auctionEvents.BID_SUBMITTED,
        cb: (err, msg) => handleUpdateAuction(err, msg),
      });

      subscribeTo({
        auctionId: auction.id,
        eventName: auctionEvents.BID_WITHDRAWN,
        cb: (err, msg) => handleUpdateAuction(err, msg),
      });
    }
    return () => {
      unsubscribeFrom({
        auctionId: auction.id,
        eventNames: [auctionEvents.BID_SUBMITTED, auctionEvents.BID_WITHDRAWN],
      });
    };
  }, []);

  const bids = bidsInUsd(auctionUpdated);
  const winnersCount = auction.rewardTiers.reduce(
    (winners, tier) => winners + tier.numberOfWinners,
    0
  );
  const nftsPerWinnerMarkup = createNftsPerWinnerMarkup(auction);

  const { tokenSymbol } = auction;
  const tokenLogo = getBidTypeByName(tokenSymbol, options).img;
  const promoImageProps = getPromoImageProps(auction.promoImageUrl, auction.user?.profileImageUrl);

  let auctionLink = '';
  if (auction.link && auction.user?.universePageUrl) {
    auctionLink = `/${auction.user.universePageUrl}/${auction.link}`;
  }

  return (
    <div className="active__auction__item">
      <Link
        to={auctionLink}
        className={`active__auction__image timeLeft ${auction.promoImageUrl ? '' : 'show__avatar'}`}
      >
        <img className={promoImageProps.class} src={promoImageProps.src} alt={auction.name} />
        <div className="date">
          <div className="date__border__div" />
          <label>Time left</label>
          <AuctionsTabsCountdown
            activeAuction={auction}
            showLabel={false}
            removeAuction={removeAuction}
          />
        </div>
      </Link>
      <div className="active__auction__details">
        <div className="title">
          <h2>{auction.headline}</h2>
        </div>
        <Link to={`/${auction.user?.universePageUrl}`} className="creator">
          <img src={auction.user?.profileImageUrl} alt={auction.user?.displayName} />
          <span>by</span>
          {auction.user?.displayName}
        </Link>
        <div className="statistics">
          <div>
            <label>Winners</label>
            <p>{winnersCount}</p>
          </div>
          <div>
            <label>NFTs Per Winner:</label>
            {nftsPerWinnerMarkup}
          </div>
          <div>
            <label>Highest Winning Bid:</label>
            <p>
              <img src={tokenLogo} alt={tokenSymbol} />
              {bids.highestBid} <span>{`~$${Math.round(bids.highestBidInUsd)}`}</span>
            </p>
          </div>
          <div>
            <label>Lowest Winning Bid:</label>
            <p>
              <img src={tokenLogo} alt={tokenSymbol} />
              {bids.lowestBid} <span>{`~$${Math.round(bids.lowestBidInUsd)}`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ActiveAuctionCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  removeAuction: PropTypes.func,
};

ActiveAuctionCard.defaultProps = {
  removeAuction: () => {},
};

export default ActiveAuctionCard;
