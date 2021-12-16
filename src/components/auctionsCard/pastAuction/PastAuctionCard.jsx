import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
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

  const tokenLogo = useMemo(() => getBidTypeByName(tokenSymbol, options), [tokenSymbol, options]);

  const promoImageProps = useMemo(
    () => getPromoImageProps(auction.promoImageUrl, auction.user.profileImageUrl),
    [auction.promoImageUrl, auction.user.profileImageUrl]
  );

  return (
    <div className="past__auction__item">
      <Link
        className={`past__auction__image timeLeft ${auction.promoImageUrl ? '' : 'show__avatar'}`}
        to={`/${auction.user.universePageUrl}/${auction.link}`}
      >
        <img className={promoImageProps.class} src={promoImageProps.src} alt={auction.name} />
      </Link>
      <div className="past__auction__details">
        <div className="title">
          <h2>{auction.name}</h2>
        </div>
        <Link to={`/${auction.user.universePageUrl}`} className="creator">
          <img src={auction.user.profileImageUrl} alt={auction.user.displayName} />
          <span>by {auction.user.displayName}</span>
        </Link>
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
