import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../utils/scrollingHandlers';
import NotFound from '../../components/notFound/NotFound.jsx';
import './Search.scss';
import AuctionsResult from '../../components/search/auctions/AuctionsResult.jsx';
import NFTsResult from '../../components/search/nfts/NFTsResult.jsx';
import UsersResult from '../../components/search/users/UsersResult.jsx';
import CollectionsResult from '../../components/search/collections/CollectionsResult.jsx';
import CommunitiesResult from '../../components/search/communities/CommunitiesResult.jsx';
import GalleriesResult from '../../components/search/galleries/GalleriesResult.jsx';
import Button from '../../components/button/Button.jsx';
import {
  PLACEHOLDER_MARKETPLACE_AUCTIONS,
  PLACEHOLDER_MARKETPLACE_NFTS,
  PLACEHOLDER_MARKETPLACE_USERS,
  PLACEHOLDER_MARKETPLACE_COLLECTIONS,
  PLACEHOLDER_MARKETPLACE_COMMUNITIES,
  PLACEHOLDER_MARKETPLACE_GALLERIES,
} from '../../utils/fixtures/BrowseNFTsDummyData';
import tabArrow from '../../assets/images/tab-arrow.svg';
import searchIcon from '../../assets/images/search-gray.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import bigSearchIcon from '../../assets/images/marketplace/big-search.png';

const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const tabs = ['Auctions', 'NFTs', 'Users', 'Collections', 'Communities', 'Galleries'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [searchValue, setSearchValue] = useState(location.state.query);
  const searchRef = useRef();

  const handleSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (searchValue) {
        setQuery(searchValue);
        searchRef.current.blur();
      }
    }
  };

  useEffect(() => {
    if (location.state) {
      setQuery(location.state.query);
    }
  }, []);

  useEffect(() => {
    const auctionsCount = PLACEHOLDER_MARKETPLACE_AUCTIONS.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    const nftsCount = PLACEHOLDER_MARKETPLACE_NFTS.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    const usersCount = PLACEHOLDER_MARKETPLACE_USERS.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    const collectionsCount = PLACEHOLDER_MARKETPLACE_COLLECTIONS.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    const communitiesCount = PLACEHOLDER_MARKETPLACE_COMMUNITIES.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    const galleriesCount = PLACEHOLDER_MARKETPLACE_GALLERIES.filter((item) =>
      item.name
        .toLowerCase()
        .includes(query ? query.toLowerCase() : location.state.query.toLowerCase())
    );
    setResultsCount(
      auctionsCount.length +
        nftsCount.length +
        usersCount.length +
        collectionsCount.length +
        communitiesCount.length +
        galleriesCount.length
    );
  }, [query]);

  useEffect(() => {
    function handleResize() {
      if (document.querySelector('.tab__right__arrow')) {
        if (window.innerWidth < 600) {
          document.querySelector('.tab__right__arrow').style.display = 'flex';
        } else {
          document.querySelector('.tab__right__arrow').style.display = 'none';
          document.querySelector('.tab__left__arrow').style.display = 'none';
        }
      }
    }
    window.addEventListener('resize', handleResize);
    setTimeout(() => {
      handleResize();
    }, 1000);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return query ? (
    <div className="search--page">
      <div className="search--background">
        <div className="search--field">
          <img className="search--icon" src={searchIcon} alt="Search" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            ref={searchRef}
          />
          {searchValue && (
            <img
              className="close--icon"
              src={closeIcon}
              alt="Close"
              aria-hidden="true"
              onClick={() => setSearchValue('')}
            />
          )}
        </div>
      </div>
      <div className="container">
        <h1 className="page--title">{query}</h1>
        <div className="tabs__wrapper">
          <div className="search--results">{`${resultsCount} results`}</div>
          <div className="tab__left__arrow">
            <img
              onClick={handleTabLeftScrolling}
              src={tabArrow}
              alt="Tab left arrow"
              aria-hidden="true"
            />
          </div>
          <div className="tabs">
            <ul className="tab_items">
              {tabs.map((tab, index) => (
                <li
                  key={uuid()}
                  className={selectedTabIndex === index ? 'active' : ''}
                  onClick={() => setSelectedTabIndex(index)}
                  aria-hidden="true"
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div className="tab__right__arrow">
            <img
              onClick={handleTabRightScrolling}
              src={tabArrow}
              alt="Tab right arrow"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 && resultsCount !== 0 && (
            <AuctionsResult query={query} data={PLACEHOLDER_MARKETPLACE_AUCTIONS} />
          )}
          {selectedTabIndex === 1 && resultsCount !== 0 && (
            <NFTsResult query={query} data={PLACEHOLDER_MARKETPLACE_NFTS} />
          )}
          {selectedTabIndex === 2 && resultsCount !== 0 && (
            <UsersResult query={query} data={PLACEHOLDER_MARKETPLACE_USERS} />
          )}
          {selectedTabIndex === 3 && resultsCount !== 0 && (
            <CollectionsResult query={query} data={PLACEHOLDER_MARKETPLACE_COLLECTIONS} />
          )}
          {selectedTabIndex === 4 && resultsCount !== 0 && (
            <CommunitiesResult query={query} data={PLACEHOLDER_MARKETPLACE_COMMUNITIES} />
          )}
          {selectedTabIndex === 5 && resultsCount !== 0 && (
            <GalleriesResult query={query} data={PLACEHOLDER_MARKETPLACE_GALLERIES} />
          )}
          {resultsCount === 0 && (
            <div className="no--search--result">
              <img src={bigSearchIcon} alt="Search" />
              <h3>No Items found</h3>
              <p>{`There are no search results for “${query}”`}</p>
              <Button className="light-button" onClick={() => history.push('/marketplace')}>
                Browse marketplace
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Search;
