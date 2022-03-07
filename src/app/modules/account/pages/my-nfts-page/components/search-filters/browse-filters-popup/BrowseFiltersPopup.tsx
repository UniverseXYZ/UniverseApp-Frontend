import React, { useState } from 'react';

// import SaleType from '../marketplace/browseNFT/sidebarFiltration/SaleType';
// import Price from '../marketplace/browseNFT/sidebarFiltration/Price';
// import Creators from '../marketplace/browseNFT/sidebarFiltration/Creators';
// import VerifiedOnly from '../marketplace/browseNFT/sidebarFiltration/VerifiedOnly';
import { Collections } from './Collections';

import salesIcon from '../../../../../../../../assets/images/marketplace/sale-type.svg';
import priceIcon from '../../../../../../../../assets/images/marketplace/price-range.svg';
import collectionIcon from '../../../../../../../../assets/images/marketplace/collections.svg';
import artistIcon from '../../../../../../../../assets/images/marketplace/artist.svg';
import closeIcon from '../../../../../../../../assets/images/close-menu.svg';


interface IPropsBrowseFiltersPopup {
  onClose: () => void,
  saleTypeButtons: any[],
  setSaleTypeButtons: (values: any[]) => void,
  setSelectedPrice: (value: number) => void,
  selectedTokenIndex: number,
  setSelectedTokenIndex: (value: number) => void,
  selectedCollections: any[],
  setSelectedCollections: (value: any) => void,
  savedCollections: any[],
  setSavedCollections: (value: any) => void,
  selectedCreators: any[],
  setSelectedCreators: (value: any) => void,
  savedCreators: any[],
  setSavedCreators: (value: any) => void,
};

export const BrowseFilterPopup = (props: IPropsBrowseFiltersPopup) => {
  const [filter, setFilter] = useState('');
  const [singleItems, setSingleItems] = useState(true);

  const handleClick = (idx: any) => {
    const newSaleTypeButtons = [...props.saleTypeButtons];
    newSaleTypeButtons[idx].selected = !newSaleTypeButtons[idx].selected;
    props.setSaleTypeButtons(newSaleTypeButtons);
  };

  const handleClearAll = () => {
    const newSaleTypeButtons = [...props.saleTypeButtons];

    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });

    props.setSaleTypeButtons(newSaleTypeButtons);
    props.setSelectedPrice(0);
    props.setSelectedCollections([]);
    props.setSavedCollections([]);
    props.setSelectedCreators([]);
    props.setSavedCreators([]);
    // onClose();
  };

  return (
    <div className="browse__nft__filter__popup">
      <div className="browse__nft__filter__header">
        <img className="close" src={closeIcon} alt="Close" onClick={props.onClose} aria-hidden="true" />
        <h3>Filters</h3>
        <button type="button" className="clear__all" onClick={() => handleClearAll()}>
          Clear all
        </button>
      </div>
      <div className="browse__nft__filter__body">
        {/* <h3>
          <img src={salesIcon} alt="Sale" /> Sale types
        </h3>
        <div className="sale--dropdown--body">
          <div className="sale--dropdown--header">
            <div
              className={singleItems ? 'active' : ''}
              onClick={() => setSingleItems(true)}
              aria-hidden="true"
            >
              Single items
            </div>
            <div
              className={singleItems ? '' : 'active'}
              onClick={() => setSingleItems(false)}
              aria-hidden="true"
            >
              Bundles
            </div>
          </div>
          <div className="sale--types">
            {saleTypeButtons.map((item, index) => (
              <div className="sale--type--div">
                <input
                  type="checkbox"
                  className="sale--type--checkboxes"
                  onChange={() => handleClick(index)}
                  checked={item.selected}
                />
                <div className="sale--type--name">
                  <h4>{item.text}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* <Price
          setSelectedPrice={setSelectedPrice}
          selectedTokenIndex={selectedTokenIndex}
          setSelectedTokenIndex={setSelectedTokenIndex}
        /> */}
        <Collections
          savedCollections={props.savedCollections}
          setSavedCollections={props.setSavedCollections}
          selectedCollections={props.selectedCollections}
          setSelectedCollections={props.setSelectedCollections}
        />
        {/* <Creators savedCreators={savedCreators} setSavedCreators={setSavedCreators} /> */}
      </div>
      <div className="show--results">
        <button type="button" className="light-button" onClick={props.onClose}>
          Show results
        </button>
      </div>
    </div>
  );
};