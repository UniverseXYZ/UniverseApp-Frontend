import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tabArrow from '../../assets/images/tab-arrow.svg';
import './Tabs.scss';

const Tabs = (args) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { variant } = args;
  return (
    <div className="tabs__section">
      <div className="tabs">
        <div className={variant === 'vertical' ? 'tab_items vertical' : 'tab_items'}>
          <button
            type="button"
            onClick={() => setSelectedTabIndex(0)}
            className={selectedTabIndex === 0 ? 'active' : ''}
          >
            Active Tab
          </button>
          <button
            type="button"
            onClick={() => setSelectedTabIndex(1)}
            className={selectedTabIndex === 1 ? 'active' : ''}
          >
            Active Tabs
          </button>
          <button
            type="button"
            onClick={() => setSelectedTabIndex(2)}
            className={selectedTabIndex === 2 ? 'active' : ''}
          >
            Active Tab
          </button>
          <button
            type="button"
            onClick={() => setSelectedTabIndex(3)}
            className={selectedTabIndex === 3 ? 'active' : ''}
          >
            Active Tab
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
