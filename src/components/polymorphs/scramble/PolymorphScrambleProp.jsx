import React from 'react';
import PropTypes from 'prop-types';
import './styles/PolymorphScrambleProp.scss';

const PolymorphScrambleProp = ({ data }) => (
  <div className="scramble--prop">
    <div className="prop--trait">{data.trait}</div>
    <div className="prop--name">{data.name}</div>
    <div className="prop--chance">{data.chance}</div>
  </div>
);

PolymorphScrambleProp.propTypes = {
  data: PropTypes.shape({
    trait: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    chance: PropTypes.string.isRequired,
  }).isRequired,
};

export default PolymorphScrambleProp;
