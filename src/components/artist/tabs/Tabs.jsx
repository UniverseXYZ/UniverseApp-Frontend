import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NFTsTab from './nfts/NFTsTab.jsx';
import tabArrow from '../../../assets/images/tab-arrow.svg';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab.jsx';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab.jsx';
import PastAuctionsTab from './pastAuctions/PastAuctionsTab.jsx';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../../utils/scrollingHandlers';
import { useAuthContext } from '../../../contexts/AuthContext';
import {
  getUserActiveAuctions,
  getUserFutureAuctions,
  getUserPastAuctions,
} from '../../../utils/api/auctions';

const Tabs = ({ nfts, artistId }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [futureAuctions, setFutureAuctions] = useState([]);
  const [pastAuctions, setPastAuctions] = useState([]);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [totalActiveCount, setTotalActiveCount] = useState(0);
  const [totalFutureCount, setTotalFutureCount] = useState(0);
  const [totalPastCount, setTotalPastCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const getAuctions = async (request, offset, setAuctionState, setAuctionCount) => {
    setLoading(true);
    try {
      const response = await request(artistId, offset, perPage);

      if (response.auctions?.length) {
        setAuctionState(response.auctions);
      } else {
        setAuctionState([]);
      }

      if (response.pagination) {
        const { total } = response.pagination;
        const pages = Math.ceil(total / perPage);
        setPageCount(pages);
        setAuctionCount(total);
      }
      setLoading(false);
    } catch (error) {
      // TODO: handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    getAuctions(getUserActiveAuctions, 0, setActiveAuctions, setTotalActiveCount);
    getAuctions(getUserFutureAuctions, 0, setFutureAuctions, setTotalFutureCount);
    getAuctions(getUserPastAuctions, 0, setPastAuctions, setTotalPastCount);
  }, []);
  const fetchAuctionsForTab = () => {
    if (selectedTabIndex === 1) {
      getAuctions(getUserActiveAuctions, 0, setActiveAuctions, setTotalActiveCount);
    } else if (selectedTabIndex === 2) {
      getAuctions(getUserFutureAuctions, 0, setFutureAuctions, setTotalFutureCount);
    } else if (selectedTabIndex === 3) {
      getAuctions(getUserPastAuctions, 0, setPastAuctions, setTotalPastCount);
    }
  };

  useEffect(async () => {
    window.scrollTo(0, 360);
    fetchAuctionsForTab();
  }, [perPage]);

  const handlePageClick = (item) => {
    // let the user see the tabs after changing page
    window.scrollTo(0, 360);
    const offset = Math.ceil(item.selected * perPage);
    setCurrentPage(item.selected);
    fetchAuctionsForTab();
  };

  useEffect(() => {
    setCurrentPage(0);
    fetchAuctionsForTab();
  }, [selectedTabIndex]);

  return (
    <div className="tabs__section">
      <div className="tabs__section__container">
        <div className="tabs__wrapper">
          <div className="tab__left__arrow">
            <img
              onClick={handleTabLeftScrolling}
              aria-hidden="true"
              src={tabArrow}
              alt="Tab left arrow"
            />
          </div>
          <div className="tabs">
            <div className="tab_items">
              <button
                type="button"
                onClick={() => setSelectedTabIndex(0)}
                className={selectedTabIndex === 0 ? 'active' : ''}
              >
                {`NFTs (${nfts.length})`}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(1)}
                className={selectedTabIndex === 1 ? 'active' : ''}
              >
                {`Active auctions (${totalActiveCount})`}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(2)}
                className={selectedTabIndex === 2 ? 'active' : ''}
              >
                {`Future auctions (${totalFutureCount})`}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(3)}
                className={selectedTabIndex === 3 ? 'active' : ''}
              >
                {`Past auctions (${totalPastCount})`}
              </button>
            </div>
          </div>
          <div className="tab__right__arrow">
            <img
              onClick={handleTabRightScrolling}
              aria-hidden="true"
              src={tabArrow}
              alt="Tab right arrow"
            />
          </div>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 && <NFTsTab showMintPrompt={false} nftData={nfts} />}
          {selectedTabIndex === 1 && (
            <ActiveAuctionsTab
              showCreatePrompt={false}
              auctions={activeAuctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
              currentPage={currentPage}
            />
          )}
          {selectedTabIndex === 2 && (
            <FutureAuctionsTab
              showCreatePrompt={false}
              auctions={futureAuctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
              currentPage={currentPage}
            />
          )}
          {selectedTabIndex === 3 && (
            <PastAuctionsTab
              showCreatePrompt={false}
              auctions={pastAuctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  nfts: PropTypes.oneOfType([PropTypes.array]).isRequired,
  artistId: PropTypes.number.isRequired,
};

export default Tabs;
