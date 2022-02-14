import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './PastAuctionCard.scss';
import ethIcon from '../../../assets/images/bid_icon.svg';

const PastAuctionCard = ({ auction }) => {
  const history = useHistory();

  return (
    <div className="past__auction__item">
      <div
        className={`past__auction__image timeLeft ${auction.promoImageUrl ? '' : 'show__avatar'}`}
      >
        {auction.promoImageUrl ? (
          <img className="original" src={auction.promoImageUrl} alt={auction.name} />
        ) : (
          <img
            className="artist__image"
            src={
              typeof auction.artist.avatar === 'string'
                ? auction.artist.avatar
                : URL.createObjectURL(auction.artist.avatar)
            }
            alt={auction.name}
          />
        )}
        <div className="date">
          <div className="date__border__div" />
          <label>Ended on</label>
          <span>2d 5h 20m 30s</span>
        </div>
      </div>
      <div className="past__auction__details">
        <div className="title">
          <h2>{auction.name}</h2>
        </div>
        <div className="creator">
          <img
            src={
              typeof auction.artist.avatar === 'string'
                ? auction.artist.avatar
                : URL.createObjectURL(auction.artist.avatar)
            }
            alt={auction.artist.name}
          />
          <span>by</span>
          <a
            aria-hidden="true"
            onClick={() =>
              history.push(`/${auction.artist.name.split(' ')[0]}`, {
                id: auction.artist.id,
              })
            }
          >
            {auction.artist.name}
          </a>
        </div>
        <div className="statistics">
          <div>
            <label>Winners</label>
            <p>35</p>
          </div>
          <div>
            <label>Highest Winning Bid:</label>
            <p>
              <img src={ethIcon} alt="eth" />
              40 <span>~$120,594</span>
            </p>
          </div>
          <div>
            <label>NFTs Per Winner:</label>
            <p>10-7</p>
          </div>
          <div>
            <label>Lowest Winning Bid:</label>
            <p>
              <img src={ethIcon} alt="eth" />
              14 <span>~$41,594</span>
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
