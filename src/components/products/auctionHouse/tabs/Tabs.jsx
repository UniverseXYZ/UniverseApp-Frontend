import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './Tabs.scss';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab.jsx';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab.jsx';
import { getAllFutureAuctions, getAllActiveAuctions } from '../../../../utils/api/auctions';

const ENDING = 'ending';
const RECENT = 'recent';
const HIGHEST_BID = 'highestBid';
const LOWEST_BID = 'lowestBid';
const STARTING = 'starting';

const Tabs = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [sortActive, setSortActive] = useState('Ending soon');
  const [sortPast, setSortPast] = useState('Starts soon');
  const [currentPage, setCurrentPage] = useState(0);

  const getAuctions = async (request, _offset, filter) => {
    setLoading(true);
    try {
      const response = await request(_offset, perPage, filter);
      if (response.auctions) {
        setAuctions(response.auctions);
      }

      if (response.pagination) {
        const { total } = response.pagination;
        const pages = Math.ceil(total / perPage);
        setPageCount(pages);
      }
      setLoading(false);
    } catch (error) {
      // TODO: handle errors
      console.error(error);
    }
  };

  const requestWithParams = (offset) => {
    if (selectedTabIndex === 0) {
      if (sortActive === 'Ending soon') {
        getAuctions(getAllActiveAuctions, offset, ENDING);
      } else if (sortActive === 'Recently added') {
        getAuctions(getAllActiveAuctions, offset, RECENT);
      } else if (sortActive === 'Highest winning bid') {
        getAuctions(getAllActiveAuctions, offset, HIGHEST_BID);
      } else if (sortActive === 'Lowest winning bid') {
        getAuctions(getAllActiveAuctions, offset, LOWEST_BID);
      }
    } else if (selectedTabIndex === 1) {
      if (sortPast === 'Starts soon') {
        getAuctions(getAllFutureAuctions, offset, STARTING);
      } else if (sortPast === 'Recently added') {
        getAuctions(getAllFutureAuctions, offset, RECENT);
      }
    }
  };

  const handlePageClick = (item) => {
    // let the user see the tabs after changing the page
    window.scrollTo(0, 360);
    setCurrentPage(item.selected);
    const offset = Math.ceil(item.selected * perPage);
    requestWithParams(offset);
  };

  useEffect(() => {
    setCurrentPage(0);
    requestWithParams(0);
  }, [selectedTabIndex, perPage, sortActive, sortPast]);

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
            <ActiveAuctionsTab
              auctions={auctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
              sort={sortActive}
              setSort={setSortActive}
              forcePage={currentPage}
            />
          ) : (
            <FutureAuctionsTab
              auctions={auctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
              sort={sortPast}
              setSort={setSortPast}
              forcePage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Tabs);
