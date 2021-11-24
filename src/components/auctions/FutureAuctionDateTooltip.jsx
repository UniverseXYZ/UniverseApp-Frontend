import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import { format } from 'date-fns';
import infoIconRed from '../../assets/images/Vector.svg';
import { isBeforeNow } from '../../utils/dates';

const FutureAuctionDateTooltip = ({ date, dateType }) => {
  const [showIcon, setShowIcon] = useState(false);
  const formattedDate = format(new Date(date), 'MMMM dd, HH:mm');

  return (
    <div className={`total-dates ${isBeforeNow(date) ? 'dateError' : ''}`}>
      <span
        onMouseOver={() => setShowIcon(true)}
        onFocus={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        onBlur={() => setShowIcon(false)}
      >
        {dateType}
        <b>
          <time>{formattedDate}</time>
        </b>
        {isBeforeNow(date) && (
          <div className="launch__date__info">
            {showIcon && (
              <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                <div className="launch-info">
                  Your launch date has already passed. Go to “Edit Auction” and adjust the launch
                  and end dates.
                </div>
              </Animated>
            )}
            <img src={infoIconRed} alt="Info" />
          </div>
        )}
      </span>
    </div>
  );
};
FutureAuctionDateTooltip.propTypes = {
  dateType: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default FutureAuctionDateTooltip;
