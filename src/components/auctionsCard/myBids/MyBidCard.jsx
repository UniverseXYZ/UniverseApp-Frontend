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

  return (
    <div className={`my--bids--item${isBeforeNow(bid.auction.endDate) ? ' past' : ''}`}>
      <div
        className={`my--bids--image timeLeft ${bid.auction.promoImageUrl ? '' : 'show--avatar'}`}
      >
        {bid.auction.promoImageUrl ? (
          <img className="original" src={bid.auction.promoImageUrl} alt={bid.auction.name} />
        ) : (
          <img className="artist--image" src={loggedInArtist.avatar} alt={loggedInArtist.name} />
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
        <div className="creator">
          <img src={loggedInArtist.avatar} alt={loggedInArtist.name} />
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
        <div className="my--bid--section">
          <div className="caption">My bid</div>
          <p>
            <img src={ethIcon} alt="eth" />
            {bid.bid}
            <span>
              ~$
              {(Number(bid.bid) * ethPrice.market_data?.current_price.usd).toFixed(2)}
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
                {(bid.highestBid * ethPrice.market_data?.current_price.usd).toFixed(2)}
              </span>
            </p>
          </div>
          <div>
            <label>NFTs Per Winner:</label>
            <p>{`${bid.maxNfts}-${bid.minNfts}`}</p>
          </div>
          <div>
            <label>Lowest Winning Bid:</label>
            <p>
              <img src={ethIcon} alt="eth" />
              {bid.lowestBid}{' '}
              <span>
                ~$
                {(bid.lowestBid * ethPrice.market_data?.current_price.usd).toFixed(2)}
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
