import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SaleTypeFilter from '../ui-elements/SaleTypeFilter';
import PriceRangeFilter from '../ui-elements/PriceRangeFilter';
import CollectionFilter from '../ui-elements/CollectionFilter';
import ArtistFilter from '../ui-elements/ArtistsFilter';
import SearchField from '../input/SearchField';
import SortBySelect from '../input/SortBySelect';
import filtersIcon from '../../assets/images/filters-icon-black.svg';
import './styles/SelectNfts.scss';

const SelectNfts = (props) => {
  const [filtersCount, setFiltersCount] = useState(0);

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
        <SaleTypeFilter />
        <PriceRangeFilter />
        <CollectionFilter />
        <ArtistFilter />
      </div>
    </div>
  );
};

export default SelectNfts;
