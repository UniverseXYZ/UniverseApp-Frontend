import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import searchIcon from '../../../../assets/images/search-gray.svg';
import collectionIcon from '../../../../assets/images/marketplace/collections.svg';
import { PLACEHOLDER_MARKETPLACE_COLLECTIONS } from '../../../../utils/fixtures/BrowseNFTsDummyData';
import { defaultColors } from '../../../../utils/helpers';

const Collections = ({ savedCollections, setSavedCollections }) => {
  const [showFilters, setShowFilters] = useState(true);
  const [collections, setCollections] = useState(PLACEHOLDER_MARKETPLACE_COLLECTIONS);
  const [searchByCollections, setSearchByCollections] = useState('');

  const handleSearch = (value) => {
    setSearchByCollections(value);
  };

  const handleSelect = (coll) => {
    const newSelectedColl = [...savedCollections];
    if (newSelectedColl.filter((item) => item.id === coll.id).length === 0) {
      newSelectedColl.push(coll);
    }
    setSavedCollections(newSelectedColl);
  };

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h3>
          <img src={collectionIcon} alt="Collection" /> Collections
        </h3>
      </div>
      <Animated animationIn="fadeIn">
        <div className="browse--nft--sidebar--filtration--item--content">
          <div className="search--field">
            <input
              type="text"
              placeholder="Search collections"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchByCollections}
            />
            <img src={searchIcon} alt="Search" />
          </div>
          {collections
            .filter((item) => item.name.toLowerCase().includes(searchByCollections.toLowerCase()))
            .map(
              (col, index) =>
                index < 5 && (
                  <div
                    className="collections--list"
                    key={uuid()}
                    onClick={() => handleSelect(col)}
                    aria-hidden="true"
                  >
                    {!col.photo ? (
                      <div
                        className="random--avatar--color"
                        style={{
                          backgroundColor:
                            defaultColors[Math.floor(Math.random() * defaultColors.length)],
                        }}
                      >
                        {col.name.charAt(0)}
                      </div>
                    ) : (
                      <img className="collection--avatar" src={col.photo} alt={col.name} />
                    )}
                    <p>{col.name}</p>
                  </div>
                )
            )}
        </div>
      </Animated>
    </div>
  );
};

Collections.propTypes = {
  savedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSavedCollections: PropTypes.func,
};

Collections.defaultProps = {
  savedCollections: [],
  setSavedCollections: () => {},
};

export default Collections;
