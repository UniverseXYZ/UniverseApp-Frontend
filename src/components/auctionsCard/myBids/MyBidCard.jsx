import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './MyBidCard.scss';
import { isBeforeNow } from '../../../utils/dates';
import ethIcon from '../../../assets/images/bid_icon.svg';
import { useAuthContext } from '../../../contexts/AuthContext';
import AuctionsTabsCountdown from '../../auctions/AuctionsTabsCountdown';

const MyBidCard = ({ bid }) => {
  const { ethPrice, loggedInArtist } = useAuthContext();
  const history = useHistory();

  const ethPriceUsd = ethPrice?.market_data?.current_price?.usd;
  return (
    <div className={`my--bids--item${isBeforeNow(bid.auction.endDate) ? ' past' : ''}`}>
      <div
        aria-hidden
        onClick={() => history.push(`./${bid.auction.creator.universePageUrl}/${bid.auction.link}`)}
        className={`my--bids--image timeLeft ${bid.auction.promoImageUrl ? '' : 'show--avatar'}`}
      >
        {bid.auction.promoImageUrl ? (
          <img className="original" src={bid.auction.promoImageUrl} alt={bid.auction.name} />
        ) : (
          <img
            className="artist--image"
            src={bid.auction.creator.profileImageUrl}
            alt={bid.auction.creator.displayName}
          />
        )}
        <div className="date">
          <div className="date--border--div" />
          <label>{isBeforeNow(bid.auction.endDate) ? 'Ended on' : 'Time left'}</label>
          <span>
            <AuctionsTabsCountdown activeAuction={bid.auction} showLabel={false} />
          </span>
        </div>
      </div>
      <div className="my--bids--details">
        <div className="title">
          <h2>{bid.auction.name}</h2>
        </div>
        <div
          className="creator"
          aria-hidden="true"
          onClick={() => history.push(`./${bid.auction.creator.universePageUrl}`)}
        >
          <img src={bid.auction.creator.profileImageUrl} alt={bid.auction.creator.displayName} />
          <span>by {bid.auction.creator.displayName}</span>
        </div>
        <div className="my--bid--section">
          <div className="caption">My bid</div>
          <p>
            <img src={ethIcon} alt="eth" />
            {bid.bid.amount}
            <span>
              ~$
              {ethPriceUsd
                ? (Number(bid.bid.amount) * ethPriceUsd).toFixed(2)
                : Number(bid.bid.amount)}
            </span>
          </p>
        </div>
        <div className="statistics">
          <div>
            <label>Winners</label>
            <p>{bid.numberOfWinners}</p>
          </div>
          <div>
            <label>Highest Winning Bid:</label>
            <p>
              <img src={ethIcon} alt="eth" />
              {bid.highestBid}{' '}
              <span>
                ~$
                {ethPriceUsd ? (bid.highestBid * ethPriceUsd).toFixed(2) : bid.highestBid}
              </span>
            </p>
          </div>
          <div>
            <label>NFTs Per Winner:</label>
            {bid.maxNfts !== bid.minNfts ? (
              <p>{`${bid.maxNfts}-${bid.minNfts}`}</p>
            ) : (
              <p>{bid.maxNfts}</p>
            )}
          </div>
          <div>
            <label>Lowest Winning Bid:</label>
            <p>
              <img src={ethIcon} alt="eth" />
              {bid.lowestBid}{' '}
              <span>
                ~$
                {ethPriceUsd ? (bid.lowestBid * ethPriceUsd).toFixed(2) : bid.lowestBid}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MyBidCard.propTypes = {
  bid: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default MyBidCard;
