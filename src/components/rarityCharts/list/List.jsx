/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import uuid from 'react-uuid';
import PolymorphCard from './PolymorphCard';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown';
import Pagination from '../../pagination/Pagionation';
import { categoriesArray } from './categories';
import '../../../containers/rarityCharts/RarityCharsLoader.scss';
import '../../../containers/rarityCharts/RarityCharts.scss';
import { renderLoaders } from '../../../containers/rarityCharts/renderLoaders';
import CategoriesFilter from './CategoriesFilter';

const List = ({
  data,
  perPage,
  offset,
  isLastPage,
  setPerPage,
  setOffset,
  setApiPage,
  setIsLastPage,
}) => {
  const sliceData = data.slice(offset, offset + perPage) || [];
  const emptySlots = perPage - sliceData.length || 4;
  const [categories, setCategories] = useState(categoriesArray);
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

  return (
    <div className="rarity--charts--list">
      <CategoriesFilter categories={categories} setCategories={setCategories} />
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
          {sliceData.map((item, i) => (
            <PolymorphCard key={uuid()} item={item} index={offset + i + 1} />
          ))}
          {isLastPage ? renderLoaders(emptySlots) : <></>}
        </div>
        <div className="pagination__container">
          <Pagination data={data} perPage={perPage} setOffset={setOffset} setApiPage={setApiPage} />
          <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  setOffset: PropTypes.func.isRequired,
  setApiPage: PropTypes.func.isRequired,
  setIsLastPage: PropTypes.func.isRequired,
  setPerPage: PropTypes.func.isRequired,
};

export default List;
