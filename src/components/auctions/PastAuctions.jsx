import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/images/search-gray.svg';
import Input from '../input/Input.jsx';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/SimplePaginations';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { getPastAuctions } from '../../utils/api/auctions';
import NoAuctionsFound from './NoAuctionsFound';
import ActiveAndPastCardSkeleton from './skeleton/ActiveAndPastCardSkeleton';
import SortBySelect from '../input/SortBySelect';
import PastAuctionsCard from './PastAuctionsCard';
import {
  disconnectAuctionSocket,
  initiateAuctionSocket,
  removeAllListeners,
  subscribeToAuctionWithdrawnRevenue,
} from '../../utils/websockets/auctionEvents';

const PastAuctions = ({ setShowLoadingModal, setLoadingText }) => {
  const sortOptions = ['Newest', 'Oldest'];
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchByName, setSearchByName] = useState('');
  const [pastAuctions, setPastAuctions] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const { address } = useAuthContext();
  const { setActiveTxHashes } = useMyNftsContext();

  useEffect(async () => {
    try {
      initiateAuctionSocket();
      const response = await getPastAuctions();
      if (!response.auctions?.length) {
        setNotFound(true);
        setLoading(false);
      } else {
        setPastAuctions(response.auctions);
        setFilteredAuctions(response.auctions);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      disconnectAuctionSocket();
    }
  }, []);

  useEffect(
    () => () => {
      disconnectAuctionSocket();
    },
    []
  );

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const handleAuctionWithdrawnRevenueEvent = (err, auctionId, totalRevenue, recipient) => {
    const isYourEvent = recipient.toLowerCase() === address.toLowerCase();

    if (isYourEvent) {
      setFilteredAuctions((upToDate) => {
        let newAuctions = [...upToDate];

        newAuctions = newAuctions.map((auction) => {
          if (auction.id === auctionId) {
            auction.revenueClaimed = totalRevenue;
          }
          return auction;
        });

        return newAuctions;
      });
      setShowLoadingModal(false);
      setActiveTxHashes([]);
    }
  };

  useEffect(() => {
    if (filteredAuctions) {
      if (pastAuctions) {
        pastAuctions.forEach((a) => removeAllListeners(a.id));
      }

      // Attach events to all visible Auctions in the tab
      filteredAuctions.forEach((a) => {
        subscribeToAuctionWithdrawnRevenue(a.id, (err, { totalRevenue, recipient }) => {
          handleAuctionWithdrawnRevenueEvent(err, a.id, totalRevenue, recipient);
          removeAllListeners(a.id);
        });
      });
    }
  }, [filteredAuctions]);

  useEffect(() => {
    const newFilteredAuctions = [...pastAuctions].filter((auction) =>
      auction.name.toLowerCase().includes(searchByName.toLowerCase())
    );
    if (sortOption === 'Newest') {
      newFilteredAuctions.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortOption === 'Oldest') {
      newFilteredAuctions.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
    setFilteredAuctions(newFilteredAuctions);
  }, [searchByName, sortOption]);

  return (
    <div className="past-auctions">
      <div className="search-sort-section">
        <div className="input-search">
          <div className="input--section">
            <Input
              className="searchInp"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchByName}
              placeholder="Search"
              hoverBoxShadowGradient
            />
            <img src={searchIcon} alt="search" />
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
        filteredAuctions.map((pastAuction) => (
          <PastAuctionsCard
            auction={pastAuction}
            setShowLoadingModal={setShowLoadingModal}
            setLoadingText={setLoadingText}
          />
        ))
      ) : (
        <ActiveAndPastCardSkeleton />
      )}
      {notFound && <NoAuctionsFound title="No past auctions found" />}
      {pastAuctions.length ? (
        <div className="pagination__container">
          <Pagination
            data={pastAuctions}
            perPage={perPage}
            setOffset={setOffset}
            page={page}
            setPage={setPage}
          />
        </div>
      ) : null}
    </div>
  );
};

PastAuctions.propTypes = {
  setShowLoadingModal: PropTypes.func.isRequired,
  setLoadingText: PropTypes.func.isRequired,
};

export default PastAuctions;
