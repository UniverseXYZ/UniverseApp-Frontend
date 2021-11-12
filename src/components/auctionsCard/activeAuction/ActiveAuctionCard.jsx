import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './ActiveAuctionCard.scss';
import { getPromoImageProps, bidsInUsd, createNftsPerWinnerMarkup } from '../utils';
import { useAuctionContext } from '../../../contexts/AuctionContext';
import { getBidTypeByName } from '../../../utils/fixtures/BidOptions';
import AuctionsTabsCountdown from '../../auctions/AuctionsTabsCountdown';

const ActiveAuctionCard = ({ auction }) => {
  const history = useHistory();
  const { options } = useAuctionContext();

  const bids = bidsInUsd(auction);
  const winnersCount = auction.rewardTiers.reduce(
    (winners, tier) => winners + tier.numberOfWinners,
    0
  );
  const nftsPerWinnerMarkup = createNftsPerWinnerMarkup(auction);

  const { tokenSymbol } = auction;
  const tokenLogo = getBidTypeByName(tokenSymbol, options).img;
  const promoImageProps = getPromoImageProps(auction.promoImageUrl);

  return (
    <div className="active__auction__item">
      <div
        className={`active__auction__image timeLeft ${auction.promoImageUrl ? '' : 'show__avatar'}`}
      >
        <img className={promoImageProps.class} src={promoImageProps.src} alt={auction.name} />
        <div className="date">
          <div className="date__border__div" />
          <label>Time left</label>
          <AuctionsTabsCountdown activeAuction={auction} showLabel={false} />
        </div>
      </div>
      <div className="active__auction__details">
        <div className="title">
          <h2>{auction.name}</h2>
        </div>
        <div className="creator">
          <img src="" alt={auction.artist?.name} />
          <span>by</span>
          <a
            aria-hidden="true"
            onClick={() =>
              history.push(`/${auction.artist?.name.split(' ')[0]}`, {
                id: auction.artist.id,
              })
            }
          >
            {auction.artist?.name}
          </a>
        </div>
        <div className="statistics">
          <div>
            <label>Winners</label>
            <p>{winnersCount}</p>
          </div>
          <div>
            <label>Highest Winning Bid:</label>
            {bids.highestBidInUsd ? (
              <p>
                <img src={tokenLogo} alt={tokenSymbol} />
                {bids.highestBid} <span>{`~$${Math.round(bids.highestBidInUsd)}`}</span>
              </p>
            ) : null}
          </div>
          <div>
            <label>NFTs Per Winner:</label>
            {nftsPerWinnerMarkup}
          </div>
          <div>
            <label>Lowest Winning Bid:</label>
            {bids.lowestBidInUsd ? (
              <p>
                <img src={tokenLogo} alt={tokenSymbol} />
                {bids.lowestBid} <span>{`~$${Math.round(bids.lowestBidInUsd)}`}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

ActiveAuctionCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ActiveAuctionCard;
