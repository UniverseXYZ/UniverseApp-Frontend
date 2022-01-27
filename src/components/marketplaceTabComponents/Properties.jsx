import React from 'react';
import PropTypes from 'prop-types';
import './MarketplaceTabComponent.scss';
// Will the code below not show if value is 0 ?
const Properties = ({ properties }) => (
  <>
    <div className="marketplace--properties">
      {properties?.map((property, index) => {
        const propName = Object.keys(property)[0];
        const propValue = property[propName];
        if (!propValue && propValue !== 0) {
          return <></>;
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <p>{propName}</p>
            <h1>{property[propName]}</h1>
          </div>
        );
      })}
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
