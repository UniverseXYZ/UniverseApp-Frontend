import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './ActiveAuctionCard.scss';
import { getTimeLeft, getPromoImageProps } from '../utils';
import ethIcon from '../../../assets/images/bid_icon.svg';

const ActiveAuctionCard = ({ auction }) => {
  const history = useHistory();

  const promoImageProps = getPromoImageProps(auction.promoImageUrl);
  const timeLeft = getTimeLeft(auction.endDate);

  return (
    <div className="active__auction__item">
      <div
        className={`active__auction__image timeLeft ${auction.promoImageUrl ? '' : 'show__avatar'}`}
      >
        <img className={promoImageProps.class} src={promoImageProps.src} alt={auction.name} />
        <div className="date">
          <div className="date__border__div" />
          <label>Time left</label>
          <span>{timeLeft.length && timeLeft.join(' ')}</span>
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

ActiveAuctionCard.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ActiveAuctionCard;
