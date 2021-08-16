import React from 'react';
import PropTypes from 'prop-types';
import pinkPuzzle from '../../assets/images/pink-puzzle.svg';

const RarityRankPinkProperty = ({ tooltipText, propertyName, trait, chance }) => (
  <div className="rarity--description selected--pink">
    <div className="matching">
      <img src={pinkPuzzle} alt="Pink" />
      <span className="tooltiptext">{tooltipText}</span>
    </div>
    <h4>{propertyName}</h4>
    <h3>{trait}</h3>
    <p className="description">{chance}</p>
  </div>
);

RarityRankPinkProperty.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  trait: PropTypes.string.isRequired,
  chance: PropTypes.string.isRequired,
};

export default RarityRankPinkProperty;
