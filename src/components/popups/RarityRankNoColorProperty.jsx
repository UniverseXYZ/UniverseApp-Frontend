import React from 'react';
import PropTypes from 'prop-types';

const RarityRankNoColorProperty = ({ propertyName, trait, chance }) => (
  <div className="rarity--description">
    <h4>{propertyName}</h4>
    <h3>{trait}</h3>
    <p className="description">{chance}</p>
  </div>
);

RarityRankNoColorProperty.propTypes = {
  propertyName: PropTypes.string.isRequired,
  trait: PropTypes.string.isRequired,
  chance: PropTypes.string.isRequired,
};

export default RarityRankNoColorProperty;
