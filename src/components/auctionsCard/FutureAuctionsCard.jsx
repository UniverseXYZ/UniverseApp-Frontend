import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router-dom';
import './FutureAuctionsCard.scss';

const FutureAuctionsCard = ({ data }) => {
  const history = useHistory();

  return (
    <div className="future__auctions__list">
      {data.map((auction) => (
        <Animated animationIn="fadeIn" key={auction.id}>
          <div className="future__auction__item">
            <div className={`auction__img ${auction.promoImage ? '' : 'show__avatar'}`}>
              {auction.promoImage && (
                <img
                  className="original"
                  src={URL.createObjectURL(auction.promoImage)}
                  alt={auction.name}
                />
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
                  40 ETH <span>~$120,594</span>
                </p>
              </div>
            </div>
          </div>
        </Animated>
      ))}
    </div>
  );
};

FutureAuctionsCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default FutureAuctionsCard;
