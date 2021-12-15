import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './FutureAuctionCard.scss';
import AuctionsTabsCountdown from '../../auctions/AuctionsTabsCountdown';
import { createNftsPerWinnerMarkup } from '../utils';

const FutureAuctionCard = ({ auction, removeAuction }) => {
  const winnersCount = auction.rewardTiers.reduce(
    (winners, tier) => winners + tier.numberOfWinners,
    0
  );
  const nftsPerWinnerMarkup = createNftsPerWinnerMarkup(auction);
  let auctionLink = '';
  if (auction.link && auction.user?.universePageUrl) {
    auctionLink = `/${auction.user.universePageUrl}/${auction.link}`;
  }

  return (
    <div className="future__auction__item">
      <Link
        to={auctionLink}
        className={`auction__img ${auction.promoImageUrl ? '' : 'show__avatar'}`}
      >
        {auction.promoImageUrl ? (
          <img className="original" src={auction.promoImageUrl} alt={auction.name} />
        ) : (
          <img
            className="artist__image"
            src={auction.user?.profileImageUrl}
            alt={auction.user?.displayName}
          />
        )}
        <div className="start__date">
          <label>STARTS IN</label>
          <AuctionsTabsCountdown
            activeAuction={auction}
            showLabel={false}
            removeAuction={removeAuction}
          />
        </div>
      </Link>
      <Link to={`/${auction.user.universePageUrl}`} className="title">
        <h1>{auction.user?.displayName}</h1>
        <div className="artist__details">
          <img src={auction.user?.profileImageUrl} alt={auction.user?.displayName} />
          <span>by</span>
          {auction.user?.displayName}
        </div>
      </Link>
      <div className="auction__details">
        <div className="auction__details__box">
          <label>Winners</label>
          <p>{winnersCount}</p>
        </div>
        <div className="auction__details__box">
          <label>Nfts per winner:</label>
          {nftsPerWinnerMarkup}
        </div>
      </div>
    </div>
  );
};

FutureAuctionCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.array]).isRequired,
  removeAuction: PropTypes.func,
};

FutureAuctionCard.defaultProps = {
  removeAuction: () => {},
};

export default FutureAuctionCard;
