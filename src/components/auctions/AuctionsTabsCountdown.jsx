import React, { useState, useEffect } from 'react';
import { intervalToDuration } from 'date-fns';
import PropTypes from 'prop-types';
import { isAfterNow } from '../../utils/dates';

const AuctionsTabsCountdown = ({ activeAuction }) => {
  const [countdown, setCountdown] = useState(
    intervalToDuration({
      start: new Date(activeAuction.endDate),
      end: new Date(),
    })
  );

  useEffect(() => {
    setInterval(() => {
      const { days, hours, minutes, seconds } = intervalToDuration({
        start: new Date(activeAuction.endDate),
        end: new Date(),
      });

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);
  });

  return (
    <>
      {isAfterNow(activeAuction.startDate) ? (
        <p>
          Auction starts in{' '}
          <b>{`${countdown.days}d : ${countdown.hours}h : ${countdown.minutes}m : ${countdown.seconds}s`}</b>
        </p>
      ) : (
        <p>
          Auction ends in{' '}
          <b>{`${countdown.days}d : ${countdown.hours}h : ${countdown.minutes}m : ${countdown.seconds}s`}</b>
        </p>
      )}
    </>
  );
};

AuctionsTabsCountdown.propTypes = {
  activeAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default AuctionsTabsCountdown;
