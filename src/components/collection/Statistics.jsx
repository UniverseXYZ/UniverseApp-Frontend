import React from 'react';
import PropTypes from 'prop-types';
import FolderIcon from '../svgs/FolderIcon.jsx';
import UserIcon from '../svgs/UserIcon.jsx';
import FloorPriceIcon from '../svgs/FloorPriceIcon.jsx';
import VolumeTraded from '../svgs/VolumeTraded.jsx';
import currencyIcon from '../../assets/images/eth-icon-new.svg';

const Statistics = ({ nftsCount, ownersCount, floorPrice, volumeTraded }) => (
  <div className="statistics--grid">
    <div>
      <div className="label">
        <FolderIcon />
        Items
      </div>
      <div className="value">{nftsCount}</div>
    </div>
    <div>
      <div className="label">
        <UserIcon />
        Owners
      </div>
      <div className="value">{ownersCount}</div>
    </div>
    <div>
      <div className="label">
        <FloorPriceIcon />
        Floor price
      </div>
      <div className="value">
        {floorPrice ? (
          <>
            <img src={currencyIcon} alt="Currency" /> {floorPrice}
          </>
        ) : (
          '-'
        )}
      </div>
    </div>
    <div>
      <div className="label">
        <VolumeTraded />
        Volume traded
      </div>
      <div className="value">
        {floorPrice ? (
          <>
            <img src={currencyIcon} alt="Currency" /> {volumeTraded}
          </>
        ) : (
          '-'
        )}
      </div>
    </div>
  </div>
);

Statistics.propTypes = {
  nftsCount: PropTypes.number,
  ownersCount: PropTypes.number,
  floorPrice: PropTypes.number,
  volumeTraded: PropTypes.number,
};

Statistics.defaultProps = {
  nftsCount: 0,
  ownersCount: 0,
  floorPrice: null,
  volumeTraded: null,
};

export default Statistics;
