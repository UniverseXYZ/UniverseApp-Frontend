import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NFTMarketplaceTab.scss';

const NFTMarketplaceTab = (props) => {
  const [active, setActive] = useState(0);
  const { headerLabels, className, contents } = props;
  return (
    <div className={`marketplace--tab ${className}`}>
      <div className="tab--header--labels">
        {headerLabels.map((elem, index) => (
          <div
            className={`tab--item ${active === index ? 'active' : ''} ${elem.className}`}
            onClick={() => setActive(index)}
            key={index.toString()}
            aria-hidden="true"
          >
            <div>
              <h5 className="tab--label">{elem.label}</h5>
              <p className="tab--hint--text">{elem.hintText}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="content">{contents[active].component}</div>
    </div>
  );
};

NFTMarketplaceTab.propTypes = {
  className: PropTypes.string,
  headerLabels: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      label: PropTypes.string,
      hintText: PropTypes.string,
    })
  ),
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      component: PropTypes.node,
    })
  ).isRequired,
};

NFTMarketplaceTab.defaultProps = {
  className: '',
  headerLabels: [],
};

export default NFTMarketplaceTab;
