import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SaleTypeFilter from '../ui-elements/SaleTypeFilter';
import PriceRangeFilter from '../ui-elements/PriceRangeFilter';
import CollectionFilter from '../ui-elements/CollectionFilter';
import ArtistFilter from '../ui-elements/ArtistsFilter';
import SearchField from '../input/SearchField';
import SortBySelect from '../input/SortBySelect';
import filtersIcon from '../../assets/images/filters-icon-black.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import { defaultColors } from '../../utils/helpers';
import './styles/SelectNfts.scss';

const clearCheck = (filtersSale, collections, artist) => {
  const arr = [].concat(filtersSale).concat(collections).concat(artist);
  if (arr.length) {
    return true;
  }
  return false;
};

const SelectNfts = (props) => {
  const [filtersCount, setFiltersCount] = useState(0);
  const [saleTypeFilters, setSaleTypeFilters] = useState([]);
  const [collectionsSelected, setCollectionSelected] = useState([]);
  const [artistsSelected, setArtistsSelected] = useState([]);
  const [elemSaleRemove, setElemSaleRemove] = useState(null);
  const [clearCollectionSelectedItem, setClearCollectionSelectedItem] = useState(null);
  const [clearAll, setClearAll] = useState(false);

  useEffect(() => {
    if (clearAll) setClearAll(false);
    if (elemSaleRemove) setElemSaleRemove(null);
    if (clearCollectionSelectedItem !== null) setClearCollectionSelectedItem(null);
  }, [clearAll, elemSaleRemove, clearCollectionSelectedItem]);

  useEffect(() => {
    const arr = [].concat(saleTypeFilters).concat(collectionsSelected).concat(artistsSelected);
    setFiltersCount(arr.length);
  }, [saleTypeFilters, collectionsSelected, artistsSelected]);

  return (
    <div className="select--nfts--container">
      <div className="section--title--block">
        <h3 className="section--title">Select NFTs</h3>
        <p className="section--hint--text">
          You can only select minted NFTs from your wallet. If you want to create NFTs, go to
          <Link to="/nft-marketplace/settings">Minting</Link>.
        </p>
      </div>
      <div className="header--search--block">
        <div className="search--block">
          <SearchField
            data={[]}
            CardElement={<h1>ok</h1>}
            placeholder="Search items"
            dropdown={false}
          />
        </div>
        <div className="sort--by--block">
          <SortBySelect />
        </div>
        <div className="filters--count--block">
          <div className="filters--count--parent">
            <div className="filters--count--child">
              {!filtersCount ? (
                <img src={filtersIcon} alt="img" />
              ) : (
                <div className="count--block">
                  <p>{filtersCount}</p>
                </div>
              )}
              <p>Filters</p>
            </div>
            {/* <div className="box--shadow--effect--block" /> */}
          </div>
        </div>
      </div>
      <div className="sorting--filters--row">
        <SaleTypeFilter
          getSelectedFilters={setSaleTypeFilters}
          onClear={clearAll}
          removeElemInSelected={elemSaleRemove}
        />
        <PriceRangeFilter />
        <CollectionFilter
          getSelectedFilters={setCollectionSelected}
          onClear={clearAll}
          removeElemInSelected={clearCollectionSelectedItem}
        />
        <ArtistFilter
          getSelectedFilters={setArtistsSelected}
          onClear={clearAll}
          removeElemInSelected={clearCollectionSelectedItem}
        />
      </div>
      <div className="filters--row--data">
        <div className="nfts--data--count">
          <p>15,118,898 results</p>
        </div>
        <div className="filters">
          {saleTypeFilters.map((elem, index) => (
            <div className="filter--item--parent" key={index.toString()}>
              <div className="filter--item--child">
                <p className="filter--text">{elem.text}</p>
                <img
                  src={closeIcon}
                  alt="img"
                  className="close--icon"
                  onClick={() => setElemSaleRemove(elem)}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
          {collectionsSelected.map((elem, index) => (
            <div className="filter--item--parent" key={index.toString()}>
              <div className="filter--item--child">
                {/* {console.log(elem)} */}
                {elem.background !== null && (
                  <img src={elem.background} alt="img" className="avatar--img" />
                )}
                {elem.background === null && (
                  <p
                    className="default--avatar"
                    style={{
                      backgroundColor:
                        defaultColors[Math.floor(Math.random() * defaultColors.length)],
                    }}
                  >
                    {elem.name[0]}
                  </p>
                )}
                <p className="filter--text">{elem.name}</p>
                <img
                  src={closeIcon}
                  alt="img"
                  className="close--icon"
                  onClick={() => setClearCollectionSelectedItem(elem)}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
          {artistsSelected.map((elem, index) => (
            <div className="filter--item--parent" key={index.toString()}>
              <div className="filter--item--child">
                {/* {console.log(elem)} */}
                {elem.avatar !== null && (
                  <img src={elem.avatar} alt="img" className="avatar--img" />
                )}
                {elem.avatar === null && (
                  <p
                    className="default--avatar"
                    style={{
                      backgroundColor:
                        defaultColors[Math.floor(Math.random() * defaultColors.length)],
                    }}
                  >
                    {elem.name[0]}
                  </p>
                )}
                <p className="filter--text">{elem.name}</p>
                <img
                  src={closeIcon}
                  alt="img"
                  className="close--icon"
                  onClick={() => setClearCollectionSelectedItem(elem)}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
        {clearCheck(saleTypeFilters, collectionsSelected, artistsSelected) && (
          <div className="clear--all" aria-hidden="true" onClick={() => setClearAll(true)}>
            Clear all
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectNfts;
