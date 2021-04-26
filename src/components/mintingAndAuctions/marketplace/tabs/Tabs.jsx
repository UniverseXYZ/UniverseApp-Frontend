import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router-dom';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab';

const Tabs = ({ location }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === '/minting-and-auctions/marketplace/active-auctions') {
      setSelectedTabIndex(0);
    } else if (location.pathname === '/minting-and-auctions/marketplace/future-auctions') {
      setSelectedTabIndex(1);
    }
  }, []);

  return (
    <div className="tabs__section">
      <div className="tabs__section__container">
        <div className="tabs">
          <button
            type="button"
            onClick={() => {
              setSelectedTabIndex(0);
              history.push('/minting-and-auctions/marketplace/active-auctions');
            }}
            className={selectedTabIndex === 0 ? 'active' : ''}
          >
            Active auctions
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedTabIndex(1);
              history.push('/minting-and-auctions/marketplace/future-auctions');
            }}
            className={selectedTabIndex === 1 ? 'active' : ''}
          >
            Future auctions
          </button>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 ? <ActiveAuctionsTab /> : <FutureAuctionsTab />}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  location: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default withRouter(Tabs);
