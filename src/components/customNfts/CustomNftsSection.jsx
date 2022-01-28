import React, { useState, useEffect } from 'react';
import './CustomNftsSection.scss';
import PropTypes from 'prop-types';
import infoIcon from '../../assets/images/icon.svg';

const CustomNftsSection = ({ custom, setCustom, setValues, values }) => {
  const [hideIcon, setHideIcon] = useState(false);

  const handeClickCustom = (e) => {
    if (e.target.checked) {
      setValues((prevValue) => ({ ...prevValue, nftsPerWinner: '' }));
    }

    setCustom(e.target.checked);
  };

  return (
    <div className="custom-info">
      <span>
        Custom
        <img
          src={infoIcon}
          alt="Info Icon"
          onMouseOver={() => setHideIcon(true)}
          onFocus={() => setHideIcon(true)}
          onMouseLeave={() => setHideIcon(false)}
          onBlur={() => setHideIcon(false)}
        />
      </span>
      <label className="switch">
        <input
          type="checkbox"
          value={custom}
          checked={custom}
          onChange={handeClickCustom}
          disabled={!values.numberOfWinners}
        />
        <span className="slider round" />
      </label>
      {hideIcon && (
        <div className="info-text custom-info-text">
          <p>
            Use this parameter in case you want to deposit NFTs from incompatible collections, and
            it’s impossible to distinguish which one is more rare looking at the token ID. The other
            use case is when NFTs from different collections could not be distributed evenly. You
            must predefine the number of winners in order ot unlock this feature.
          </p>
        </div>
      )}
    </div>
  );
};

CustomNftsSection.propTypes = {
  custom: PropTypes.bool,
  setCustom: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

CustomNftsSection.defaultProps = {
  custom: false,
};
export default CustomNftsSection;
