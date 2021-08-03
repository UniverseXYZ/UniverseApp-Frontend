import React from 'react';
import PropTypes from 'prop-types';
import './RarityCharsLoader.scss';
import './RarityCharts.scss';

const RarityChartsLoader = ({ number, renderLoaders }) => (
  <div className="rarity-charts--list">
    <div className="grid">{renderLoaders(number)}</div>
  </div>
);

RarityChartsLoader.propTypes = {
  number: PropTypes.number.isRequired,
  renderLoaders: PropTypes.func.isRequired,
};

export default RarityChartsLoader;
