import React, { useState } from 'react';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';
import searchIcon from '../../../../assets/images/search-gray.svg';
import creatorImg from '../../../../assets/images/Justin-3LAU.png';
import { PLACEHOLDER_MARKETPLACE_USERS } from '../../../../utils/fixtures/BrowseNFTsDummyData';

const Creators = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [creators, setCreators] = useState(PLACEHOLDER_MARKETPLACE_USERS);
  const [searchByCreators, setSearchByCreators] = useState('');

  const handleSearch = (value) => {
    setSearchByCreators(value);
  };

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h3>Creators</h3>
      </div>
      <Animated animationIn="fadeIn">
        <div className="browse--nft--sidebar--filtration--item--content">
          <div className="search--field">
            <input
              type="text"
              placeholder="Search artists"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchByCreators}
            />
            <img src={searchIcon} alt="Search" />
          </div>
          {creators
            .filter((item) => item.name.toLowerCase().includes(searchByCreators.toLowerCase()))
            .map((creator) => (
              <div className="creators--list" key={uuid()}>
                <img src={creator.avatar} alt={creator.name} />
                <p>{creator.name}</p>
              </div>
            ))}
        </div>
      </Animated>
    </div>
  );
};

export default Creators;
