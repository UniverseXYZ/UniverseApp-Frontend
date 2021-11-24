import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

const ActiveAuctionCard = ({ mainAuction, auction }) => {
  const history = useHistory();
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const d = (new Date(auction.endDate) - Date.now()) / 1000;
      const days = Math.floor(d / 86400);
      const hours = Math.floor(d / 3600) % 24;
      const minutes = Math.floor(d / 60) % 60;
      const seconds = d % 60;
      if (days < 0) {
        clearInterval(interval);
        setAuctionEnded(true);
      } else {
        setAuctionEnded(false);
        setCountdown({
          days: parseInt(days, 10),
          hours: parseInt(hours, 10),
          minutes: parseInt(minutes, 10),
          seconds: parseInt(seconds, 10),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const parseCountdown = () =>
    countdown.days >= 0
      ? `Ends in ${parseInt(countdown.days, 10)}d : ${parseInt(countdown.hours, 10)}h : ${parseInt(
          countdown.minutes,
          10
        )}m : ${parseInt(countdown.seconds, 10)}s`
      : false;

  return (
    <div
      className={`carousel__auction__container ${
        mainAuction.auction.id === auction.id ? 'selected' : ''
      }`}
      onClick={() => {
        history.push(`/${mainAuction.artist.universePageUrl}/${auction.link}`);
      }}
      aria-hidden="true"
      style={{ width: 278 }}
    >
      <div className="carousel__auction">
        <div className={`carousel__auction__image ${auction.promoImageUrl ? '' : 'show__avatar'}`}>
          {auction.promoImageUrl ? (
            <img className="original" src={auction.promoImageUrl} alt={auction.headline} />
          ) : (
            <img
              className="artist__image"
              src={mainAuction.artist.profileImageUrl}
              alt={auction.headline}
            />
          )}
        </div>
        <div className="carousel__auction__info">
          <h4 title={auction.headline}>
            {auction.headline?.length > 20
              ? `${auction.headline?.substring(0, 20)}...`
              : auction.headline}
          </h4>
          <p>{auctionEnded ? <span>Auction has ended</span> : parseCountdown()}</p>
        </div>
      </div>
    </div>
  );
};

ActiveAuctionCard.propTypes = {
  mainAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default ActiveAuctionCard;
