import React, { useState, useEffect } from 'react';
import Input from '../input/Input.jsx';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation.jsx';
import searchIconGray from '../../assets/images/search-gray.svg';
import { isAfterNow, isBeforeNow } from '../../utils/dates';
import ActiveAuctionsTabsCard from '../auctionsCard/ActiveAuctionsTabsCard.jsx';
import NoAuctionsFound from './NoAuctionsFound';
import { getActiveAuctions } from '../../utils/api/auctions';
import ActiveAndPastCardSkeleton from './skeleton/ActiveAndPastCardSkeleton';
import SortBySelect from '../input/SortBySelect';

const ActiveAuctions = () => {
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');

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

  const handleSearch = (value) => {
    setSearchByName(value);
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
          defaultValue="Sort by"
          sortData={['Sort by', 'Newest', 'Oldest']}
          hideFirstOption
        />
      </div>
      {!loading ? (
        <div>
          {activeAuctions
            .slice(offset, offset + perPage)
            .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
            .filter((item) => item && isBeforeNow(item.startDate) && isAfterNow(item.endDate))
            .map((activeAuction, index) => (
              <ActiveAuctionsTabsCard activeAuction={activeAuction} index={index} />
            ))}
        </div>
      ) : (
        <ActiveAndPastCardSkeleton />
      )}
      {notFound && <NoAuctionsFound title="No active auctions found" />}
      <div className="pagination__container">
        <Pagination data={activeAuctions} perPage={perPage} setOffset={setOffset} />
      </div>
    </div>
  );
};

export default ActiveAuctions;
