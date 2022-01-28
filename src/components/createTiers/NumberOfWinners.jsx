import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import { ReactComponent as IncreaseIcon } from '../../assets/images/plus.svg';
import { ReactComponent as DecreaseIcon } from '../../assets/images/minus.svg';
import { ReactComponent as InfoIcon } from '../../assets/images/icon.svg';
import { TIER_SETTINGS_LIMITATION } from '../../utils/config';

const NumberOfWinners = ({ values, setValues }) => {
  const [showNumberOfWinnersInfoBox, setShowNumberOfWinnersInfoBox] = useState(false);

  return (
    <div className="number--of--winners">
      <span className="inp-label">
        <span>
          Number of winners{' '}
          <InfoIcon
            onMouseOver={() => setShowNumberOfWinnersInfoBox(true)}
            onFocus={() => setShowNumberOfWinnersInfoBox(true)}
            onMouseLeave={() => setShowNumberOfWinnersInfoBox(false)}
            onBlur={() => setShowNumberOfWinnersInfoBox(false)}
          />
        </span>
        {showNumberOfWinnersInfoBox && (
          <div className="info-text">
            <p>Amount of people who will get NFTs from the current reward tier.</p>
          </div>
        )}
      </span>
      <div className="counter">
        <Button
          className="light-button"
          style={{
            opacity:
              values.numberOfWinners === TIER_SETTINGS_LIMITATION.MIN_WINNERS_COUNT ? '0.3' : 1,
          }}
          onClick={() =>
            values.numberOfWinners > 1 &&
            setValues((prevValues) => ({
              ...prevValues,
              numberOfWinners: values.numberOfWinners - 1,
            }))
          }
        >
          <DecreaseIcon />
        </Button>
        <span>{values.numberOfWinners}</span>
        <Button
          className="light-button"
          style={{
            opacity:
              values.numberOfWinners === TIER_SETTINGS_LIMITATION.MAX_WINNERS_COUNT ? '0.3' : 1,
          }}
          onClick={() =>
            values.numberOfWinners < TIER_SETTINGS_LIMITATION.MAX_WINNERS_COUNT &&
            setValues((prevValues) => ({
              ...prevValues,
              numberOfWinners: values.numberOfWinners + 1,
            }))
          }
        >
          <IncreaseIcon />
        </Button>
      </div>
    </div>
  );
};

NumberOfWinners.propTypes = {
  values: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setValues: PropTypes.func.isRequired,
};

export default NumberOfWinners;
