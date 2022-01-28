import React, { useState, useEffect } from 'react';
import Input from '../input/Input.jsx';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation.jsx';
import searchIconGray from '../../assets/images/search-gray.svg';
import ActiveAuctionsTabsCard from '../auctionsCard/ActiveAuctionsTabsCard.jsx';
import NoAuctionsFound from './NoAuctionsFound';
import { getActiveAuctions } from '../../utils/api/auctions';
import ActiveAndPastCardSkeleton from './skeleton/ActiveAndPastCardSkeleton';
import SortBySelect from '../input/SortBySelect';

const ActiveAuctions = () => {
  const sortOptions = ['Newest', 'Oldest'];
  const perPage = 10;

  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchByName, setSearchByName] = useState('');
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  useEffect(async () => {
    try {
      const response = await getActiveAuctions();
      if (!response.auctions?.length) {
        setNotFound(true);
        setLoading(false);
      } else {
        setActiveAuctions(response.auctions);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const newFilteredAuctions = activeAuctions.filter((auction) =>
      auction.name.toLowerCase().includes(searchByName.toLowerCase())
    );
    if (sortOption === 'Newest') {
      newFilteredAuctions.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortOption === 'Oldest') {
      newFilteredAuctions.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
    setActiveAuctions(newFilteredAuctions);
  }, [sortOption]);

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const removeAuction = (auctionToRemoveId) => {
    const updatedAuctions = activeAuctions.filter((auction) => auction.id !== auctionToRemoveId);
    setActiveAuctions(updatedAuctions);
  };

  return (
    <div className="active-auctions">
      <div className="search-sort-section">
        <div className="input-search">
          <div className="input--section">
            <Input
              className="searchInp"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchByName}
              placeholder="Search by name"
              hoverBoxShadowGradient
            />
            <img src={searchIconGray} alt="search" />
          </div>
        </div>
        <SortBySelect
          id="sort--select"
          sort={sortOption}
          sortData={sortOptions}
          setSort={setSortOption}
        />
      </div>
      {!loading ? (
        <div>
          {activeAuctions
            .slice(offset, offset + perPage)
            .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
            .map((activeAuction, index) => (
              <ActiveAuctionsTabsCard
                activeAuction={activeAuction}
                index={index}
                removeAuction={removeAuction}
              />
            ))}
        </div>
      ) : (
        <ActiveAndPastCardSkeleton />
      )}
      {notFound && <NoAuctionsFound title="No active auctions found" />}
      {activeAuctions?.length ? (
        <div className="pagination__container">
          <Pagination data={activeAuctions} perPage={perPage} setOffset={setOffset} />
        </div>
      ) : null}
    </div>
  );
};

export default ActiveAuctions;
