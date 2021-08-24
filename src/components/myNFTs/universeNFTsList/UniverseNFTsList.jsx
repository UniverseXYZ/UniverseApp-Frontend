/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import PolymorphCard from './PolymorphCard.jsx';
import CategoriesFilter from './CategoriesFilter.jsx';
import closeIcon from '../../../assets/images/close-menu.svg';
import Pagination from '../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown';

const UniverseNFTsList = ({
  data,
  perPage,
  setPerPage,
  offset,
  setOffset,
  categories,
  setCategories,
  categoriesIndexes,
  setCategoriesIndexes,
}) => {
  const sliceData = data.slice(offset, offset + perPage);

  const [showClearALL, setShowClearALL] = useState(false);

  const handleClearAll = () => {
    const newCategories = [...categories];
    newCategories.forEach((item) => {
      item.traits.forEach((trait) => {
        trait.checked = false;
      });
    });
    setCategories(newCategories);
  };

  const removeSelectedFilter = (index, idx) => {
    const newCategories = [...categories];
    newCategories[index].traits[idx].checked = false;
    setCategories(newCategories);
  };

  useEffect(() => {
    let check = false;
    categories.forEach((item) => {
      const res = item.traits.filter((i) => i.checked);
      if (res.length) {
        check = true;
      }
    });
    if (check) {
      setShowClearALL(true);
    } else {
      setShowClearALL(false);
    }
  }, [categories]);

  return sliceData.length ? (
    <div className="rarity--charts--list">
      <CategoriesFilter
        categories={categories}
        setCategories={setCategories}
        categoriesIndexes={categoriesIndexes}
        setCategoriesIndexes={setCategoriesIndexes}
      />
      <div className="list--with--selected--filters">
        <div className="selected--filters">
          {showClearALL && <div className="result">898 results</div>}
          {categories.map((item, index) => (
            <>
              {item.traits.map(
                (trait, idx) =>
                  trait.checked && (
                    <button type="button" className="light-border-button">
                      {trait.name}
                      <img
                        className="close"
                        src={closeIcon}
                        alt="Close"
                        aria-hidden="true"
                        onClick={() => removeSelectedFilter(index, idx)}
                      />
                    </button>
                  )
              )}
            </>
          ))}
          {showClearALL && (
            <button type="button" className="clear--all" onClick={() => handleClearAll()}>
              Clear all
            </button>
          )}
        </div>
        <div className="grid">
          {sliceData.map((item) => (
            <PolymorphCard key={uuid()} item={item} />
          ))}
        </div>
        {data.length ? (
          <div className="pagination__container">
            <Pagination data={data} perPage={perPage} setOffset={setOffset} />
            <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <div className="rarity--charts--empty">
      <p>No Polymorph could be found :’(</p>
    </div>
  );
};

UniverseNFTsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  setPerPage: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategories: PropTypes.func.isRequired,
  categoriesIndexes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategoriesIndexes: PropTypes.func.isRequired,
};

export default UniverseNFTsList;
