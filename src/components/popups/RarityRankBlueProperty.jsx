import React from 'react';
import PropTypes from 'prop-types';
import bluePuzzle from '../../assets/images/blue-puzzle.svg';

const RarityRankBlueProperty = ({ tooltipText, propertyName, trait, chance }) => (
  <div className="rarity--description selected--blue">
    <div className="matching">
      <img src={bluePuzzle} alt="Blue" />
      <span className="tooltiptext">{tooltipText}</span>
    </div>
    <h4>{propertyName}</h4>
    <h3>{trait}</h3>
    <p className="description">{chance}</p>
  </div>
);

RarityRankBlueProperty.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  trait: PropTypes.string.isRequired,
  chance: PropTypes.string.isRequired,
};

export default RarityRankBlueProperty;
