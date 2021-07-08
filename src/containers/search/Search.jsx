import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import NotFound from '../../components/notFound/NotFound';
import tabArrow from '../../assets/images/tab-arrow.svg';
import bigSearchIcon from '../../assets/images/marketplace/big-search.png';
import './Search.scss';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../utils/scrollingHandlers';
import AuctionsResult from '../../components/search/auctions/AuctionsResult';
import NFTsResult from '../../components/search/nfts/NFTsResult';
import UsersResult from '../../components/search/users/UsersResult';
import CollectionsResult from '../../components/search/collections/CollectionsResult';
import CommunitiesResult from '../../components/search/communities/CommunitiesResult';
import GalleriesResult from '../../components/search/galleries/GalleriesResult';
import Button from '../../components/button/Button.jsx';
import {
  PLACEHOLDER_MARKETPLACE_AUCTIONS,
  PLACEHOLDER_MARKETPLACE_NFTS,
  PLACEHOLDER_MARKETPLACE_USERS,
  PLACEHOLDER_MARKETPLACE_COLLECTIONS,
  PLACEHOLDER_MARKETPLACE_COMMUNITIES,
  PLACEHOLDER_MARKETPLACE_GALLERIES,
} from '../../utils/fixtures/BrowseNFTsDummyData';

const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const tabs = ['Auctions', 'NFTs', 'Users', 'Collections', 'Communities', 'Galleries'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    if (location.state) {
      setQuery(location.state.query);
    }
    const auctionsCount = PLACEHOLDER_MARKETPLACE_AUCTIONS.filter((item) =>
      item.name.toLowerCase().includes(location.state.query.toLowerCase())
    );
    const nftsCount = PLACEHOLDER_MARKETPLACE_NFTS.filter((item) =>
      item.name.toLowerCase().includes(location.state.query.toLowerCase())
    );
    const usersCount = PLACEHOLDER_MARKETPLACE_USERS.filter((item) =>
      item.name.toLowerCase().includes(location.state.query.toLowerCase())
    );
    const collectionsCount = PLACEHOLDER_MARKETPLACE_COLLECTIONS.filter((item) =>
      item.name.toLowerCase().includes(location.state.query.toLowerCase())
    );
    const communitiesCount = PLACEHOLDER_MARKETPLACE_COMMUNITIES.filter((item) =>
      item.name.toLowerCase().includes(location.state.query.toLowerCase())
    );
    const galleriesCount = PLACEHOLDER_MARKETPLACE_GALLERIES.filter((item) =>
      item.name.toLowerCase().includes(location.state.query.toLowerCase())
    );
    setResultsCount(
      auctionsCount.length +
        nftsCount.length +
        usersCount.length +
        collectionsCount.length +
        communitiesCount.length +
        galleriesCount.length
    );
  }, []);

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
          <input type="text" placeholder="Search" />
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
