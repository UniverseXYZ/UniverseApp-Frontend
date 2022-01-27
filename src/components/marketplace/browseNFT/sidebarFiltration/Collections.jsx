import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import searchIcon from '../../../../assets/images/search-gray.svg';
import collectionIcon from '../../../../assets/images/marketplace/collections.svg';
import { getCollectionBackgroundColor } from '../../../../utils/helpers';
import { useAuthContext } from '../../../../contexts/AuthContext';
import closeIcon from '../../../../assets/images/close-menu.svg';
import checkIcon from '../../../../assets/images/check-vector.svg';
import universeIcon from '../../../../assets/images/universe-img.svg';
import { shortenEthereumAddress } from '../../../../utils/helpers/format';

const Collections = ({
  savedCollections,
  setSavedCollections,
  selectedCollections,
  setSelectedCollections,
}) => {
  const { deployedCollections } = useAuthContext();
  const [showFilters, setShowFilters] = useState(true);
  const [collections, setCollections] = useState(deployedCollections);
  const [searchByCollections, setSearchByCollections] = useState('');

  const handleSearch = (value) => {
    setSearchByCollections(value);
    const filtered = deployedCollections.filter((col) =>
      col.name.toLowerCase().includes(value.toLowerCase())
    );

    setCollections(filtered);
  };

  const handleSelect = (coll) => {
    const newSelectedColl = [...selectedCollections];
    const index = selectedCollections.map((col) => col.id).indexOf(coll.id);

    if (index >= 0) {
      newSelectedColl.splice(index, 1);
    } else {
      newSelectedColl.push(coll);
    }
    setSavedCollections(newSelectedColl);
    setSelectedCollections(newSelectedColl);
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
            .map((col, index) => (
              <div
                className="collections--list"
                key={uuid()}
                onClick={() => handleSelect(col, index)}
                aria-hidden="true"
              >
                {selectedCollections.map((coll) => coll.id).indexOf(col.id) >= 0 ? (
                  <div
                    className="random--avatar--color"
                    style={{
                      background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%)',
                    }}
                  >
                    <img
                      style={{ width: 20, height: 20, marginRight: 0, objectFit: 'initial' }}
                      src={checkIcon}
                      alt="check"
                    />
                  </div>
                ) : col.address === process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                  <img className="random--avatar--color" src={universeIcon} alt={col.name} />
                ) : !col.coverUrl ? (
                  <div
                    className="random--avatar--color"
                    style={{
                      backgroundColor: getCollectionBackgroundColor(col),
                    }}
                  >
                    {col.name.charAt(0)}
                  </div>
                ) : (
                  <img className="sell__collection" src={col.coverUrl} alt={col.name} />
                )}
                <p>{col.name || shortenEthereumAddress(col.address)}</p>
              </div>
            ))}
        </div>
      </Animated>
    </div>
  );
};

Collections.propTypes = {
  savedCollections: PropTypes.oneOfType([PropTypes.array]),
  selectedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSavedCollections: PropTypes.func,
  setSelectedCollections: PropTypes.func,
};

Collections.defaultProps = {
  savedCollections: [],
  selectedCollections: [],
  setSavedCollections: () => {},
  setSelectedCollections: () => {},
};

export default Collections;
