import React, { useState, useEffect } from 'react';
// import '../pagination/Pagination.scss';
// import './UniverseNFTs.scss';
import PropTypes from 'prop-types';
import MyPolymorphsChart from './MyPolymorphsChart';
import MyLobstersChart from './MyLobstersChart';
import { useMyNftsStore } from 'src/stores/myNftsStore';

const UniverseNFTs = ({ scrollContainer }) => {
  const { collectionFilter, setCollectionFilter, polymorphsFilter, lobstersFilter } =
    useMyNftsStore(s => ({
      collectionFilter: s.collectionFilter,
      setCollectionFilter: s.setCollectionFilter,
      polymorphsFilter: s.polymorphsFilter,
      lobstersFilter: s.lobstersFilter,
    }));

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useEffect(() => {
    setCollectionFilter(collectionFilter);
  }, [collectionFilter]);

  const renderMyNFTsNew = () => {
    if (collectionFilter === polymorphsFilter) {
      return (
        <MyPolymorphsChart
          isDropdownOpened={isDropdownOpened}
          setIsDropdownOpened={setIsDropdownOpened}
          scrollContainer={scrollContainer}
        />
      );
    }
    if (collectionFilter === lobstersFilter) {
      return (
        <MyLobstersChart
          isDropdownOpened={isDropdownOpened}
          setIsDropdownOpened={setIsDropdownOpened}
          scrollContainer={scrollContainer}
        />
      );
    }

    return <div>Invalid collection</div>;
  };

  return (
    <div className="tab__saved__nfts">
      <div className="tab__wallet">{renderMyNFTsNew()}</div>
    </div>
  );
};
UniverseNFTs.propTypes = {
  scrollContainer: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default UniverseNFTs;
