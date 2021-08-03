import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import RarityRankPopup from '../../popups/RarityRankPopup.jsx';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import neverScrambledIcon from '../../../assets/images/never-scrambled-badge.svg';
import singleTraitScrambledIcon from '../../../assets/images/single-trait-scrambled-badge.svg';

const PolymorphCard = ({ item }) => (
  <div className="card">
    <div className="card--header">
      <div className="card--number">{`#${item.id}`}</div>
      <div className="card--price">{`Rarity Score: ${item.rarityScore}`}</div>
    </div>
    <div className="card--body">
      <Popup
        trigger={<img className="rarity--chart" src={item.previewImage.url} alt={item.name} />}
      >
        {(close) => <RarityRankPopup onClose={close} item={item} />}
      </Popup>
      {item.scrambled === 'single' ? (
        <div className="card--scrambled">
          <img alt="Single trait scrambled badge" src={singleTraitScrambledIcon} />
          <span className="tooltiptext">Single trait scrambled</span>
        </div>
      ) : (
        <div className="card--scrambled">
          <img alt="Never scrambled badge" src={neverScrambledIcon} />
          <span className="tooltiptext">Never scrambled</span>
        </div>
      )}
    </div>
    <div className="card--footer">
      <h2>{item.name}</h2>
      <p>{`#${item.serialNumber}`}</p>
    </div>
  </div>
);

PolymorphCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PolymorphCard;
