import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router-dom';
import './ActiveAuctionsCard.scss';
import Button from '../button/Button';

const ActiveAuctionsCard = ({ data }) => {
  const history = useHistory();
  return (
    <div className="active__auctions__list">
      {data.map((auction) => (
        <Animated animationIn="fadeIn" key={auction.id}>
          <div className="active__auction__item">
            <div
              className={`active__auction__image timeLeft ${
                auction.promoImage ? '' : 'show__avatar'
              }`}
            >
              {auction.promoImage ? (
                <img
                  className="original"
                  src={URL.createObjectURL(auction.promoImage)}
                  alt={auction.name}
                />
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
                <label>Time left</label>
                <span>2d 5h 20m 30s</span>
              </div>
            </div>
            <div className="active__auction__details">
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
                    $40 ETH <span>~$120,594</span>
                  </p>
                </div>
                <div>
                  <label>NFTs Per Winner:</label>
                  <p>10-7</p>
                </div>
                <div>
                  <label>Lowest Winning Bid:</label>
                  <p>
                    14 ETH <span>~$41,594</span>
                  </p>
                </div>
              </div>
              <Button
                className="light-button w-100 view--auction--btn"
                onClick={() =>
                  history.push(`/${auction.artist.name.split(' ')[0]}/${auction.name}`, {
                    id: auction.id,
                  })
                }
              >
                View Auction
              </Button>
            </div>
          </div>
        </Animated>
      ))}
    </div>
  );
};

ActiveAuctionsCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default ActiveAuctionsCard;
