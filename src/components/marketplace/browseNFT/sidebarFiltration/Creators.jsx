import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import artistIcon from '../../../../assets/images/marketplace/artist.svg';
import searchIcon from '../../../../assets/images/search-gray.svg';
import { PLACEHOLDER_MARKETPLACE_USERS } from '../../../../utils/fixtures/BrowseNFTsDummyData';

const Creators = ({ savedCreators, setSavedCreators }) => {
  const [showFilters, setShowFilters] = useState(true);
  const [creators, setCreators] = useState(PLACEHOLDER_MARKETPLACE_USERS);
  const [searchByCreators, setSearchByCreators] = useState('');

  const handleSearch = (value) => {
    setSearchByCreators(value);
  };

  const handleSelect = (creator) => {
    const newSelectedCreators = [...savedCreators];
    if (newSelectedCreators.filter((item) => item.id === creator.id).length === 0) {
      newSelectedCreators.push(creator);
    }
    setSavedCreators(newSelectedCreators);
  };

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h3>
          <img src={artistIcon} alt="Artist" /> Creators
        </h3>
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
            .map(
              (creator, index) =>
                index < 5 && (
                  <div
                    className="creators--list"
                    key={uuid()}
                    aria-hidden="true"
                    onClick={() => handleSelect(creator)}
                  >
                    <img src={creator.avatar} alt={creator.name} />
                    <p>{creator.name}</p>
                  </div>
                )
            )}
        </div>
      </Animated>
    </div>
  );
};

Creators.propTypes = {
  savedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSavedCreators: PropTypes.func,
};

Creators.defaultProps = {
  savedCreators: [],
  setSavedCreators: () => {},
};

export default Creators;
