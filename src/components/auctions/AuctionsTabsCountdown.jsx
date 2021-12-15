import React, { useState, useEffect } from 'react';
import { intervalToDuration } from 'date-fns';
import PropTypes from 'prop-types';
import { isAfterNow } from '../../utils/dates';

const AuctionsTabsCountdown = ({ activeAuction, showLabel, removeAuction }) => {
  const [isStartDatePassed, setIsStartDatePassed] = useState(
    new Date(activeAuction.startDate) < new Date()
  );
  const [countdown, setCountdown] = useState(
    intervalToDuration({
      start: isStartDatePassed ? new Date(activeAuction.endDate) : new Date(),
      end: isStartDatePassed ? new Date() : new Date(activeAuction.startDate),
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const { days, hours, minutes, seconds } = intervalToDuration({
        start: isStartDatePassed ? new Date(activeAuction.endDate) : new Date(),
        end: isStartDatePassed ? new Date() : new Date(activeAuction.startDate),
      });

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const canRemoveAuction =
    countdown && !countdown.days && !countdown.hours && !countdown.minutes && !countdown.seconds;
  if (canRemoveAuction) {
    removeAuction(activeAuction.id);
  }

  return (
    <>
      <p>
        {showLabel &&
          (isAfterNow(activeAuction.startDate) ? 'Auction starts in' : 'Auction ends in')}{' '}
        <b>
          {`${countdown.days}d : ${countdown.hours}h : ${countdown.minutes}m : ${countdown.seconds}s`}
        </b>
      </p>
    </>
  );
};

AuctionsTabsCountdown.propTypes = {
  activeAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  showLabel: PropTypes.bool.isRequired,
  removeAuction: PropTypes.func,
};

AuctionsTabsCountdown.defaultProps = {
  removeAuction: () => {},
};

export default AuctionsTabsCountdown;
