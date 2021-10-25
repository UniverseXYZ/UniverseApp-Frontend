import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuctionCountdown = ({ endDate, setSelectedAuctionEnded }) => {
  const [countdown, setCountdown] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const d = (new Date(endDate) - Date.now()) / 1000;
      const days = Math.floor(d / 86400);
      const hours = Math.floor(d / 3600) % 24;
      const minutes = Math.floor(d / 60) % 60;
      const seconds = d % 60;
      if (days < 0) {
        clearInterval(interval);
        setSelectedAuctionEnded(true);
      } else {
        setSelectedAuctionEnded(false);
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

  return (
    <div className="auction__ends__in__label">
      <span>Auction ends in:&nbsp;</span>
      <div className="time">
        <div className="days">{`${countdown.days}d`}</div>
        <span>:</span>
        <div className="hours">{`${countdown.hours}h`}</div>
        <span>:</span>
        <div className="minutes">{`${countdown.minutes}m`}</div>
        <span>:</span>
        <div className="seconds">{`${countdown.seconds}s`}</div>
      </div>
    </div>
  );
};

AuctionCountdown.propTypes = {
  endDate: PropTypes.string.isRequired,
  setSelectedAuctionEnded: PropTypes.func.isRequired,
};

export default AuctionCountdown;
