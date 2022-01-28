/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './ActiveAuctionCard.scss';
import { getPromoImageProps, bidsInUsd, createNftsPerWinnerMarkup } from '../utils';
import { useAuctionContext } from '../../../contexts/AuctionContext';
import { getBidTypeByName } from '../../../utils/fixtures/BidOptions';
import { useAuthContext } from '../../../contexts/AuthContext';
import AuctionsTabsCountdown from '../../auctions/AuctionsTabsCountdown';

const ActiveAuctionCard = ({ auction }) => {
  const history = useHistory();
  const { loggedInArtist } = useAuthContext();
  const { options } = useAuctionContext();

  const bids = bidsInUsd(auction);
  const winnersCount = auction.rewardTiers.reduce(
    (winners, tier) => winners + tier.numberOfWinners,
    0
  );
  const nftsPerWinnerMarkup = createNftsPerWinnerMarkup(auction);

  const { tokenSymbol } = auction;
  const tokenLogo = getBidTypeByName(tokenSymbol, options).img;
  const promoImageProps = getPromoImageProps(auction.promoImageUrl, loggedInArtist.avatar);

  return (
    <div
      className="active__auction__item"
      onClick={() => {
        history.push(`/${loggedInArtist.universePageAddress}/${auction.name}`);
      }}
    >
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
          <img
            src={
              typeof loggedInArtist.avatar === 'string'
                ? loggedInArtist.avatar
                : URL.createObjectURL(loggedInArtist.avatar)
            }
            alt={loggedInArtist.name}
          />
          <span>by</span>
          <a
            aria-hidden="true"
            onClick={() =>
              history.push(`/${loggedInArtist.name.split(' ')[0]}`, {
                id: loggedInArtist.id,
              })
            }
          >
            {loggedInArtist.name}
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
