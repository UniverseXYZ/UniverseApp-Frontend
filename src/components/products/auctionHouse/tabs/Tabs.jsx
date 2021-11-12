import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './Tabs.scss';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab.jsx';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab.jsx';
import { getActiveAuctions, getFutureAuctions } from '../../../../utils/api/auctions';

const Tabs = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAuctions = async (apiCall) => {
    setLoading(true);
    try {
      const response = await apiCall();
      if (response.auctions?.length) {
        setAuctions(response.auctions);
        setLoading(false);
      }
    } catch (error) {
      // TODO: handle errors
      console.error(error);
    }
  };

  useEffect(async () => {
    if (selectedTabIndex === 0) {
      getAuctions(getActiveAuctions);
    } else if (selectedTabIndex === 1) {
      getAuctions(getFutureAuctions);
    }
  }, [selectedTabIndex]);

  return (
    <div className="auction__house__tabs__section">
      <div className="auction__house__tabs__section__container">
        <div className="tabs">
          <button
            type="button"
            onClick={() => {
              setSelectedTabIndex(0);
            }}
            className={`active__auctions__btn${selectedTabIndex === 0 ? ' active' : ''}`}
          >
            Active auctions
            <div className="btn--left--shape">
              <span className="circle" />
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedTabIndex(1);
            }}
            className={`future__auctions__btn${selectedTabIndex === 1 ? ' active' : ''}`}
          >
            Future auctions
            <div className="btn--middle--shape">
              <span className="circle" />
            </div>
            <div className="btn--right--shape">
              <span className="circle" />
            </div>
          </button>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 ? (
            <ActiveAuctionsTab auctions={auctions} loading={loading} />
          ) : (
            <FutureAuctionsTab auctions={auctions} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Tabs);
