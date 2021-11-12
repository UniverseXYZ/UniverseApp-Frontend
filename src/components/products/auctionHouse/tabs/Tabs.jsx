import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './Tabs.scss';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab.jsx';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab.jsx';
import { getAllFutureAuctions, getAllActiveAuctions } from '../../../../utils/api/auctions';

const Tabs = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);

  const getAuctions = async (request, offset) => {
    setLoading(true);
    try {
      const response = await request(offset, perPage);
      if (response.auctions?.length) {
        setAuctions(response.auctions);
        setLoading(false);
      }

      if (response.pagination) {
        const { total } = response.pagination;
        const pages = Math.ceil(total / perPage);
        setPageCount(pages);
      }
    } catch (error) {
      // TODO: handle errors
      console.error(error);
    }
  };

  useEffect(async () => {
    // window.scrollTo(0, 360);
    if (selectedTabIndex === 0) {
      getAuctions(getAllActiveAuctions, 0, perPage);
    } else if (selectedTabIndex === 1) {
      getAuctions(getAllFutureAuctions, 0, perPage);
    }
  }, [selectedTabIndex, perPage]);

  const handlePageClick = (item) => {
    // let the user see the tabs after changing page
    window.scrollTo(0, 360);
    const offset = Math.ceil(item.selected * perPage);
    if (selectedTabIndex === 0) {
      getAuctions(getAllActiveAuctions, offset);
    } else if (selectedTabIndex === 1) {
      getAuctions(getAllFutureAuctions, offset);
    }
  };

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
            />
          ) : (
            <FutureAuctionsTab
              auctions={auctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Tabs);
