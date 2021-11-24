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

const Tabs = ({ nfts }) => {
  const { loggedInArtist } = useAuthContext();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);

  const getAuctions = async (request, offset) => {
    setLoading(true);
    try {
      const response = await request(loggedInArtist.id, offset, perPage);

      if (response.auctions?.length) {
        setAuctions(response.auctions);
      } else {
        setAuctions([]);
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

  useEffect(async () => {
    // window.scrollTo(0, 360);
    if (selectedTabIndex === 1) {
      getAuctions(getUserActiveAuctions, 0, perPage);
    } else if (selectedTabIndex === 2) {
      getAuctions(getUserFutureAuctions, 0, perPage);
    } else if (selectedTabIndex === 3) {
      getAuctions(getUserPastAuctions, 0, perPage);
    }
  }, [selectedTabIndex, perPage]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        document.querySelector('.tab__right__arrow').style.display = 'flex';
      } else {
        document.querySelector('.tab__right__arrow').style.display = 'none';
        document.querySelector('.tab__left__arrow').style.display = 'none';
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageClick = (item) => {
    // let the user see the tabs after changing page
    window.scrollTo(0, 360);
    const offset = Math.ceil(item.selected * perPage);
    if (selectedTabIndex === 1) {
      getAuctions(getUserActiveAuctions, offset);
    } else if (selectedTabIndex === 2) {
      getAuctions(getUserFutureAuctions, offset);
    } else if (selectedTabIndex === 3) {
      getAuctions(getUserPastAuctions, offset);
    }
  };

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
                Active auctions
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(2)}
                className={selectedTabIndex === 2 ? 'active' : ''}
              >
                Future auctions
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(3)}
                className={selectedTabIndex === 3 ? 'active' : ''}
              >
                Past auctions
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
              showMintPrompt={false}
              auctions={auctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
            />
          )}
          {selectedTabIndex === 2 && (
            <FutureAuctionsTab
              showMintPrompt={false}
              auctions={auctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
            />
          )}
          {selectedTabIndex === 3 && (
            <PastAuctionsTab
              showMintPrompt={false}
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

Tabs.propTypes = {
  nfts: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default Tabs;
