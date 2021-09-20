import React from 'react';
import PropTypes from 'prop-types';
import './MarketplaceTabComponent.scss';

const Properties = ({ properties }) => (
  <>
    <div className="marketplace--properties">
      {properties.map((property) => (
        <div>
          <p>{Object.keys(property)[0]}</p>
          <h1>{property[Object.keys(property)[0]]}</h1>
        </div>
      ))}
    </div>
  </>
);

Properties.propTypes = {
  properties: PropTypes.oneOfType([PropTypes.object]),
};

Properties.defaultProps = {
  properties: '',
};

export default Properties;
