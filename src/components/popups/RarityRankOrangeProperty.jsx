import React from 'react';
import PropTypes from 'prop-types';
import orangePuzzle from '../../assets/images/orange-puzzle.svg';

const RarityRankOrangeProperty = ({ tooltipText, propertyName, trait, chance }) => (
  <div className="rarity--description selected--orange">
    <div className="matching">
      <img src={orangePuzzle} alt="Orange" />
      <span className="tooltiptext">{tooltipText}</span>
    </div>
    <h4>{propertyName}</h4>
    <h3>{trait}</h3>
    <p className="description">{chance}</p>
  </div>
);

RarityRankOrangeProperty.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  trait: PropTypes.string.isRequired,
  chance: PropTypes.string.isRequired,
};

export default RarityRankOrangeProperty;
