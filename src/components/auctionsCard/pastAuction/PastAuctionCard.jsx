import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './PastAuctionCard.scss';
import { getPromoImageProps, bidsInUsd, createNftsPerWinnerMarkup } from '../utils';
import { getBidTypeByName } from '../../../utils/fixtures/BidOptions';
import { useAuctionContext } from '../../../contexts/AuctionContext';

const PastAuctionCard = ({ auction }) => {
  const { options } = useAuctionContext();
  const history = useHistory();

  const bids = bidsInUsd(auction);
  const winnersCount = auction.rewardTiers.reduce(
    (winners, tier) => winners + tier.numberOfWinners,
    0
  );
  const nftsPerWinnerMarkup = createNftsPerWinnerMarkup(auction);

  const { tokenSymbol } = auction;
  const tokenLogo = getBidTypeByName(tokenSymbol, options);
  const promoImageProps = getPromoImageProps(auction.promoImageUrl, auction.user.profileImageUrl);

  return (
    <div
      aria-hidden
      className="past__auction__item"
      onClick={() => {
        history.push(`/${auction.user.universePageAddress}/${auction.name}`);
      }}
    >
      <div
        className={`past__auction__image timeLeft ${auction.promoImageUrl ? '' : 'show__avatar'}`}
      >
        <img className={promoImageProps.class} src={promoImageProps.src} alt={auction.name} />
      </div>
      <div className="past__auction__details">
        <div className="title">
          <h2>{auction.name}</h2>
        </div>
        <div className="creator">
          <img src={auction.user.profileImageUrl} alt={auction.user.displayName} />
          <span>by</span>
          <a
            aria-hidden="true"
            onClick={() => history.push(`/${auction.user.universePageAddress}`)}
          >
            {auction.user.displayName}
          </a>
        </div>
        <div className="statistics">
          <div>
            <label>Winners</label>
            <p>{winnersCount}</p>
          </div>
          <div>
            <label>Highest Winning Bid:</label>
            <p>
              <img src={tokenLogo.img} alt={tokenSymbol} />
              {bids.highestBid || 0} <span>{`~$${Math.round(bids.highestBidInUsd || 0)}`}</span>
            </p>
          </div>
          <div>
            <label>NFTs Per Winner:</label>
            {nftsPerWinnerMarkup}
          </div>
          <div>
            <label>Lowest Winning Bid:</label>
            <p>
              <img src={tokenLogo.img} alt={tokenSymbol} />
              {bids.lowestBid || 0} <span>{`~$${Math.round(bids.lowestBidInUsd || 0)}`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PastAuctionCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default PastAuctionCard;
