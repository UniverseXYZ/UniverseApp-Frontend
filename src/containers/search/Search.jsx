import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import NotFound from '../../components/notFound/NotFound';
import tabArrow from '../../assets/images/tab-arrow.svg';
import './Search.scss';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../utils/scrollingHandlers';
import AuctionsResult from '../../components/search/auctions/AuctionsResult';
import NFTsResult from '../../components/search/nfts/NFTsResult';
import UsersResult from '../../components/search/users/UsersResult';
import CollectionsResult from '../../components/search/collections/CollectionsResult';
import CommunitiesResult from '../../components/search/communities/CommunitiesResult';
import GalleriesResult from '../../components/search/galleries/GalleriesResult';
import { PLACEHOLDER_MARKETPLACE_AUCTIONS } from '../../utils/fixtures/BrowseNFTsDummyData';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const tabs = ['Auctions', 'NFTs', 'Users', 'Collections', 'Communities', 'Galleries'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      setQuery(location.state.query);
    }
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
      <div className="container">
        <h1 className="page--title">
          Search results for <span>{query}</span>
        </h1>
        <div className="tabs__wrapper">
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
          {selectedTabIndex === 0 && (
            <AuctionsResult query={query} data={PLACEHOLDER_MARKETPLACE_AUCTIONS} />
          )}
          {selectedTabIndex === 1 && <NFTsResult query={query} />}
          {selectedTabIndex === 2 && <UsersResult query={query} />}
          {selectedTabIndex === 3 && <CollectionsResult query={query} />}
          {selectedTabIndex === 4 && <CommunitiesResult query={query} />}
          {selectedTabIndex === 5 && <GalleriesResult query={query} />}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Search;
