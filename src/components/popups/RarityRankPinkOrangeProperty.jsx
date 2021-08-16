import React from 'react';
import PropTypes from 'prop-types';
import pinkOrangePuzzle from '../../assets/images/pink-orange-puzzle.svg';

const RarityRankPinkOrangeProperty = ({ tooltipText, propertyName, trait, chance }) => (
  <div className="rarity--description--gradient">
    <div className="rarity--description selected--pink--orange">
      <div className="matching">
        <img src={pinkOrangePuzzle} alt="Pink orange" />
        <span className="tooltiptext">{tooltipText}</span>
      </div>
      <h4>{propertyName}</h4>
      <h3>{trait}</h3>
      <p className="description">{chance}</p>
    </div>
    <div className="rarity--rank--border" />
  </div>
);

RarityRankPinkOrangeProperty.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  trait: PropTypes.string.isRequired,
  chance: PropTypes.string.isRequired,
};

export default RarityRankPinkOrangeProperty;
