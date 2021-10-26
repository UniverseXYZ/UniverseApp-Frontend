import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './MyBidCard.scss';
import { isBeforeNow } from '../../../utils/dates';
import ethIcon from '../../../assets/images/bid_icon.svg';

const MyBidCard = ({ auction }) => {
  const history = useHistory();

  return (
    <div className={`my--bids--item${isBeforeNow(auction.endDate) ? ' past' : ''}`}>
      <div className={`my--bids--image timeLeft ${auction.promoImageUrl ? '' : 'show--avatar'}`}>
        {auction.promoImageUrl ? (
          <img className="original" src={auction.promoImageUrl} alt={auction.name} />
        ) : (
          <img className="artist--image" src={auction.artist.avatar} alt={auction.artist.name} />
        )}
        <div className="date">
          <div className="date--border--div" />
          <label>{isBeforeNow(auction.endDate) ? 'Ended on' : 'Time left'}</label>
          <span>2d 5h 20m 30s</span>
        </div>
      </div>
      <div className="my--bids--details">
        <div className="title">
          <h2>{auction.name}</h2>
        </div>
        <div className="creator">
          <img src={auction.artist.avatar} alt={auction.artist.name} />
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
        <div className="my--bid--section">
          <div className="caption">My bid</div>
          <p>
            <img src={ethIcon} alt="eth" />
            14,24 <span>~$41,594</span>
          </p>
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

MyBidCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default MyBidCard;
