import React, { useState, useEffect } from 'react';
import '../pagination/Pagination.scss';
import './UniverseNFTs.scss';
import MyPolymorphsChart from './MyPolymorphsChart';
import MyLobstersChart from './MyLobstersChart';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';

const UniverseNFTs = () => {
  const { collectionFilter, setCollectionFilter, polymorphsFilter, lobstersFilter } =
    useMyNftsContext();

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
        />
      );
    }
    if (collectionFilter === lobstersFilter) {
      return (
        <MyLobstersChart
          isDropdownOpened={isDropdownOpened}
          setIsDropdownOpened={setIsDropdownOpened}
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
export default UniverseNFTs;
