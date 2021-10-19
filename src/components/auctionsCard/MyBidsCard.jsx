import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router-dom';
import './MyBidsCard.scss';
import Button from '../button/Button';

const MyBidsCard = ({ data }) => {
  const history = useHistory();
  return (
    <div className="my--bids--list">
      {data.map((auction) => (
        <Animated animationIn="fadeIn" key={auction.id}>
          <div
            className={`my--bids--item${
              moment(auction.endDate).isBefore(moment.now()) ? ' past' : ''
            }`}
          >
            <div
              className={`my--bids--image timeLeft ${auction.promoImageUrl ? '' : 'show--avatar'}`}
            >
              {auction.promoImageUrl ? (
                <img className="original" src={auction.promoImageUrl} alt={auction.name} />
              ) : (
                <img
                  className="artist--image"
                  src={auction.artist.avatar}
                  alt={auction.artist.name}
                />
              )}
              <div className="date">
                <div className="date--border--div" />
                <label>
                  {moment(auction.endDate).isBefore(moment.now()) ? 'Ended on' : 'Time left'}
                </label>
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
                // onClick={() =>
                //   history.push(`/${auction.artist.name.split(' ')[0]}/${auction.name}`, {
                //     id: auction.id,
                //   })
                // }
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

MyBidsCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default MyBidsCard;
