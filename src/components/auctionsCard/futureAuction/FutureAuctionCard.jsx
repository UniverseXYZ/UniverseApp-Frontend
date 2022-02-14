import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './FutureAuctionCard.scss';
import ethIcon from '../../../assets/images/bid_icon.svg';

const FutureAuctionCard = ({ auction }) => {
  const history = useHistory();

  return (
    <div className="future__auction__item">
      <div className={`auction__img ${auction.promoImageUrl ? '' : 'show__avatar'}`}>
        {auction.promoImageUrl && (
          <img className="original" src={auction.promoImageUrl} alt={auction.name} />
        )}
        <img
          className="artist__image"
          src={
            typeof auction.artist.avatar === 'string'
              ? auction.artist.avatar
              : URL.createObjectURL(auction.artist.avatar)
          }
          alt={auction.name}
        />
        <div className="start__date">
          <label>STARTS IN</label>
          <p>2d 5h 20m 30s</p>
        </div>
      </div>
      <div className="title">
        <h1>{auction.name}</h1>
        <div className="artist__details">
          <img
            src={
              typeof auction.artist.avatar === 'string'
                ? auction.artist.avatar
                : URL.createObjectURL(auction.artist.avatar)
            }
            alt={auction.artist.name}
          />
          <span>by</span>
          <button
            type="button"
            onClick={() =>
              history.push(`/${auction.artist.name.split(' ')[0]}`, {
                id: auction.artist.id,
              })
            }
          >
            {auction.artist.name}
          </button>
        </div>
      </div>
      <div className="auction__details">
        <div className="auction__details__box">
          <label>Winners</label>
          <p>35</p>
        </div>
        <div className="auction__details__box">
          <label>Highest Winning Bid:</label>
          <p>
            <img src={ethIcon} alt="eth" />
            40 <span>~$120,594</span>
          </p>
        </div>
      </div>
    </div>
  );
};

FutureAuctionCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default FutureAuctionCard;
