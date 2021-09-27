import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import SortingFilter from '../input/SortingFilter';
import collectionIcon from '../../assets/images/marketplace/collections.svg';
import SearchField from '../input/SearchField';
import { PLACEHOLDER_MARKETPLACE_COLLECTIONS } from '../../utils/fixtures/BrowseNFTsDummyData';
import { defaultColors, getCollectionBackgroundColor } from '../../utils/helpers';
import closeIcon from '../../assets/images/close-menu.svg';
import './styles/CollectionFilter.scss';

const CollectionFilter = (props) => {
  const { getSelectedFilters, onClear, removeElemInSelected } = props;
  const [collections, setCollections] = useState([...PLACEHOLDER_MARKETPLACE_COLLECTIONS]);
  const [selectedCollections, setSellectedCollections] = useState([]);
  const [onClose, setOnClose] = useState(false);

  const handleSelectCollection = (el) => {
    if (!selectedCollections.includes(el)) {
      const copySelectedCollections = [...selectedCollections];
      copySelectedCollections.push(el);
      setSellectedCollections(copySelectedCollections);
    }
  };

  const removeCollection = (index) => {
    const copySelectedCollections = [...selectedCollections];
    copySelectedCollections.splice(index, 1);
    setSellectedCollections(copySelectedCollections);
  };

  const save = () => {
    getSelectedFilters(selectedCollections);
    setOnClose(true);
  };

  useEffect(() => {
    if (onClose) setOnClose(false);
    if (onClear) {
      setSellectedCollections([]);
      getSelectedFilters([]);
    }
  }, [onClose, onClear]);

  useEffect(() => {
    if (removeElemInSelected !== null) {
      const elIndex = selectedCollections.indexOf(removeElemInSelected);
      const copyArr = [...selectedCollections];
      if (elIndex !== -1) {
        copyArr.splice(elIndex, 1);
        setSellectedCollections(copyArr);
        getSelectedFilters(copyArr);
      }
    }
  }, [removeElemInSelected]);

  return (
    <SortingFilter
      className="collections--filter"
      title="Collections"
      countFilter={selectedCollections.length}
      icon={collectionIcon}
      onClose={onClose}
    >
      <div className="collection--dropdown" aria-hidden="true" onClick={(e) => e.stopPropagation()}>
        <div className="collection--dropdown--body">
          <div className="collection--dropdown--selected">
            {selectedCollections.map((coll, index) => (
              <button type="button" className="light-border-button" key={uuid()}>
                {!coll.coverUrl ? (
                  <div
                    className="random--avatar--color"
                    style={{
                      backgroundColor: getCollectionBackgroundColor(coll),
                    }}
                  >
                    {coll.name.charAt(0)}
                  </div>
                ) : (
                  <img className="collection" src={coll.coverUrl} alt={coll.name} />
                )}
                {coll.name}
                <img
                  className="close"
                  src={closeIcon}
                  alt="Close"
                  aria-hidden="true"
                  onClick={() => removeCollection(index)}
                />
              </button>
            ))}
          </div>
          <SearchField
            data={PLACEHOLDER_MARKETPLACE_COLLECTIONS}
            CardElement={<h1>ok</h1>}
            placeholder="Search items"
            dropdown={false}
            getData={(find) => setCollections(find)}
          />
          <div className="collections__list">
            {collections.map(
              (col, index) =>
                index < 5 && (
                  <div
                    className="collection__item"
                    key={uuid()}
                    onClick={() => handleSelectCollection(col)}
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
                      <img className="collection__avatar" src={col.photo} alt={col.name} />
                    )}
                    <p>{col.name}</p>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="collection--dropdown--footer">
          <button type="button" className="clear--all" onClick={() => setSellectedCollections([])}>
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

CollectionFilter.propTypes = {
  getSelectedFilters: PropTypes.func,
  onClear: PropTypes.bool,
  removeElemInSelected: PropTypes.shape({}),
};

CollectionFilter.defaultProps = {
  getSelectedFilters: () => {},
  onClear: false,
  removeElemInSelected: null,
};

export default CollectionFilter;
