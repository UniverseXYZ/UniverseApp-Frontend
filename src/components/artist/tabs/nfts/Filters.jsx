import React, { useState, useRef, useEffect, useContext } from 'react';
import testCollectionAvatar from '../../../../assets/images/test-collection-avatar.svg';
import AppContext from '../../../../ContextAPI';

const NFTsFilters = () => {
  const { handleClickOutside } = useContext(AppContext);
  const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);
  const [searchByName, setSearchByName] = useState('');
  const ref = useRef(null);
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: 'Collection1',
      avatar: testCollectionAvatar,
      selected: false,
    },
    {
      id: 2,
      name: 'Collection2',
      avatar: testCollectionAvatar,
      selected: false,
    },
  ]);

  const clearFilters = () => {
    const newCollections = [...collections];
    newCollections.forEach((collection) => {
      collection.selected = false;
    });

    setCollections(newCollections);
    setSearchByName('');
  };

  const handleCollections = (index) => {
    const newCollections = [...collections];
    newCollections[index].selected = !newCollections[index].selected;

    setCollections(newCollections);
  };

  useEffect(() => {
    window.document.addEventListener(
      'click',
      (e) => handleClickOutside(e, 'target', ref, setIsCollectionDropdownOpened),
      true
    );
    return () => {
      window.document.removeEventListener(
        'click',
        (e) => handleClickOutside(e, 'target', ref, setIsCollectionDropdownOpened),
        true
      );
    };
  });

  return (
    <>
      <div className="filtration">
        <div className="filter__by__collection">
          <div className="filter__by__collection__label">
            <span>Filter by collection</span>
            <button type="button" onClick={clearFilters}>
              Clear all
            </button>
          </div>
          <div className="filter__by__collection__input">
            <input
              className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
              type="text"
              placeholder="Browse collections..."
              onFocus={() => setIsCollectionDropdownOpened(true)}
            />
          </div>
        </div>
        <div className="search__by__name">
          <div className="search__by__name__label">
            <span>Seach by name</span>
          </div>
          <div className="search__by__name__input">
            <input
              type="text"
              placeholder="Start typing"
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
        </div>
        {isCollectionDropdownOpened && (
          <div ref={ref} className="collections__dropdown">
            {collections.length ? (
              collections.map((collection, index) => (
                <button
                  type="button"
                  key={collection.id}
                  className={collection.selected ? 'selected' : ''}
                  onClick={() => handleCollections(index)}
                >
                  {typeof collection.avatar === 'string' && collection.avatar.startsWith('#') ? (
                    <div
                      className="random__bg__color"
                      style={{ backgroundColor: collection.avatar }}
                    >
                      {collection.name.charAt(0)}
                    </div>
                  ) : (
                    <img src={collection.avatar} alt={collection.name} />
                  )}
                  <span>{collection.name}</span>
                </button>
              ))
            ) : (
              <div className="empty__nfts">
                <h3>No Collections found</h3>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="selected__filters">
        {collections.map(
          (collection, index) =>
            collection.selected && (
              <div key={collection.id}>
                {typeof collection.avatar === 'string' && collection.avatar.startsWith('#') ? (
                  <div className="random__bg__color" style={{ backgroundColor: collection.avatar }}>
                    {collection.name.charAt(0)}
                  </div>
                ) : (
                  <img src={collection.avatar} alt={collection.name} />
                )}
                <span>{collection.name}</span>
                <button type="button" title="Remove" onClick={() => handleCollections(index)}>
                  &#10006;
                </button>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default NFTsFilters;
