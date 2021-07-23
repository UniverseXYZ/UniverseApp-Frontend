import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import SearchField from '../input/SearchField';
import SortingFilter from '../input/SortingFilter';
import artistIcon from '../../assets/images/marketplace/artist.svg';
import { PLACEHOLDER_MARKETPLACE_USERS } from '../../utils/fixtures/BrowseNFTsDummyData';
import closeIcon from '../../assets/images/close-menu.svg';
import './styles/ArtistsFilter.scss';

const ArtistFilter = (props) => {
  const { getSelectedFilters, onClear, removeElemInSelected } = props;
  const [creators, setCreators] = useState([...PLACEHOLDER_MARKETPLACE_USERS]);
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [onClose, setOnClose] = useState(false);

  const handleSelectCreators = (creator) => {
    if (!selectedCreators.includes(creator)) {
      const copySelectedCreators = [...selectedCreators];
      copySelectedCreators.push(creator);
      setSelectedCreators(copySelectedCreators);
    }
  };

  const removeArtist = (index) => {
    const copySelectedCreators = [...selectedCreators];
    copySelectedCreators.splice(index, 1);
    setSelectedCreators(copySelectedCreators);
  };

  useEffect(() => {
    if (onClose) setOnClose(false);
    if (onClear) {
      setSelectedCreators([]);
      getSelectedFilters([]);
    }
  }, [onClose, onClear]);

  const save = () => {
    getSelectedFilters(selectedCreators);
    setOnClose(true);
  };
  useEffect(() => {
    if (removeElemInSelected !== null) {
      const elIndex = selectedCreators.indexOf(removeElemInSelected);
      const copyArr = [...selectedCreators];
      if (elIndex !== -1) {
        copyArr.splice(elIndex, 1);
        setSelectedCreators(copyArr);
        getSelectedFilters(copyArr);
      }
    }
  }, [removeElemInSelected]);

  return (
    <SortingFilter
      className="artists--filter"
      title="Artists"
      countFilter={selectedCreators.length}
      icon={artistIcon}
      onClose={onClose}
    >
      <div className="artist--dropdown" aria-hidden="true" onClick={(e) => e.stopPropagation()}>
        <div className="artist--dropdown--body">
          <div className="artist--dropdown--selected">
            {selectedCreators.map((artist, index) => (
              <button type="button" className="light-border-button" key={uuid()}>
                <img className="artist" src={artist.avatar} alt={artist.name} />
                {artist.name}
                <img
                  className="close"
                  src={closeIcon}
                  alt="Close"
                  aria-hidden="true"
                  onClick={() => removeArtist(index)}
                />
              </button>
            ))}
          </div>
          <SearchField
            data={PLACEHOLDER_MARKETPLACE_USERS}
            CardElement={<h1>ok</h1>}
            placeholder="Search items"
            dropdown={false}
            getData={(find) => setCreators(find)}
          />
          <div className="artists__list">
            {creators.map((creator) => (
              <div
                className="artists__item"
                key={uuid()}
                aria-hidden="true"
                onClick={() => handleSelectCreators(creator)}
              >
                <img className="artist__avatar" src={creator.avatar} alt={creator.name} />
                <p>{creator.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="artists--dropdown--footer">
          <button type="button" className="clear--all" onClick={() => setSelectedCreators([])}>
            Clear
          </button>
          <button type="button" className="light-button" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </SortingFilter>
  );
};

ArtistFilter.propTypes = {
  getSelectedFilters: PropTypes.func,
  onClear: PropTypes.bool,
  removeElemInSelected: PropTypes.shape({}),
};

ArtistFilter.defaultProps = {
  getSelectedFilters: () => {},
  onClear: false,
  removeElemInSelected: null,
};

export default ArtistFilter;
