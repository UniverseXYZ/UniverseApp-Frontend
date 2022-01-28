import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './FutureAuctionCard.scss';
import ethIcon from '../../../assets/images/bid_icon.svg';
import { getTimeLeft } from '../utils';

const FutureAuctionCard = ({ auction }) => {
  const history = useHistory();

  const timeLeft = getTimeLeft(auction.endDate);

  return (
    <div className="future__auction__item">
      <div className={`auction__img ${auction.promoImageUrl ? '' : 'show__avatar'}`}>
        {auction.promoImageUrl && (
          <img className="original" src={auction.promoImageUrl} alt={auction.name} />
        )}
        <img className="artist__image" src="" alt={auction.name} />
        <div className="start__date">
          <label>STARTS IN</label>
          <p>{timeLeft.length && timeLeft.join(' ')}</p>
        </div>
      </div>
      <div className="title">
        <h1>{auction.name}</h1>
        <div className="artist__details">
          <img src="" alt="" />
          <span>by</span>
          <button type="button" onClick={() => console.info('redirect')}>
            artist name
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
