import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import SaleType from '../marketplace/browseNFT/sidebarFiltration/SaleType';
import Price from '../marketplace/browseNFT/sidebarFiltration/Price';
import Collections from '../marketplace/browseNFT/sidebarFiltration/Collections';
import Creators from '../marketplace/browseNFT/sidebarFiltration/Creators';
import VerifiedOnly from '../marketplace/browseNFT/sidebarFiltration/VerifiedOnly';
import salesIcon from '../../assets/images/marketplace/sale-type.svg';
import priceIcon from '../../assets/images/marketplace/price-range.svg';
import collectionIcon from '../../assets/images/marketplace/collections.svg';
import artistIcon from '../../assets/images/marketplace/artist.svg';

const BrowseFilterPopup = ({
  saleTypeButtons,
  setSaleTypeButtons,
  selectedPrice,
  setSelectedPrice,
  selectedTokenIndex,
  setSelectedTokenIndex,
  savedCollections,
  setSavedCollections,
  selectedCollections,
  setSelectedCollections,
  selectedCreators,
  setSelectedCreators,
  savedCreators,
  setSavedCreators,
  onClose,
}) => {
  const [filter, setFilter] = useState('');
  const handleClick = (idx) => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons[idx].selected = !newSaleTypeButtons[idx].selected;
    setSaleTypeButtons(newSaleTypeButtons);
  };
  const handleClearAll = () => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    setSaleTypeButtons(newSaleTypeButtons);
    setSelectedPrice(null);
    setSelectedCollections([]);
    setSavedCollections([]);
    setSelectedCreators([]);
    setSavedCreators([]);
    onClose();
  };
  return (
    <div className="browse__nft__filter__popup">
      <div className="browse__nft__filter__header">
        <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
        <h3>Filters</h3>
        <button type="button" className="clear__all" onClick={() => handleClearAll()}>
          Clear all
        </button>
      </div>
      <div className="browse__nft__filter__body">
        <h3>
          <img src={salesIcon} alt="Sale" /> Sale types
        </h3>
        <div className="sale--dropdown--body">
          <div className="sale--dropdown--header">
            <div className="active">Single items</div>
            <div>Bundles</div>
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
        </div>
        <Price
          setSelectedPrice={setSelectedPrice}
          selectedTokenIndex={selectedTokenIndex}
          setSelectedTokenIndex={setSelectedTokenIndex}
        />
        <Collections
          savedCollections={savedCollections}
          setSavedCollections={setSavedCollections}
        />
        <Creators savedCreators={savedCreators} setSavedCreators={setSavedCreators} />
        {/* <VerifiedOnly /> */}
      </div>
      <div className="show--results">
        <button type="button" className="light-button">
          Show 231 results
        </button>
      </div>
    </div>
  );
};

BrowseFilterPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
  selectedPrice: PropTypes.oneOfType([PropTypes.any]),
  setSelectedPrice: PropTypes.func,
  selectedTokenIndex: PropTypes.number,
  setSelectedTokenIndex: PropTypes.func,
  selectedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSelectedCollections: PropTypes.func,
  savedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSavedCollections: PropTypes.func,
  selectedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSelectedCreators: PropTypes.func,
  savedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSavedCreators: PropTypes.func,
};

BrowseFilterPopup.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
  selectedTokenIndex: 0,
  setSelectedTokenIndex: () => {},
  selectedCollections: [],
  setSelectedCollections: () => {},
  savedCollections: [],
  setSavedCollections: () => {},
  selectedCreators: [],
  setSelectedCreators: () => {},
  savedCreators: [],
  setSavedCreators: () => {},
};

export default BrowseFilterPopup;
