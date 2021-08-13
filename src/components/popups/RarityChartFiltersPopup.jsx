import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowIcon from '../../assets/images/browse-nft-arrow-down.svg';
import Button from '../button/Button';

const RarityChartFiltersPopup = ({
  close,
  categories,
  setCategories,
  categoriesIndexes,
  setCategoriesIndexes,
  selectedFiltersLength,
  setSelectedFiltersLength,
}) => {
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
    let length = 0;
    categories.forEach((item) => {
      const res = item.traits.filter((i) => i.checked);
      if (res.length) {
        length += res.length;
        check = true;
      }
    });
    setSelectedFiltersLength(length);
    if (check) {
      setShowClearALL(true);
    } else {
      setShowClearALL(false);
    }
  }, [categories]);

  const handleClick = useCallback(
    (idx) => {
      if (categoriesIndexes.includes(idx)) {
        setCategoriesIndexes(categoriesIndexes.filter((i) => i !== idx));
      } else {
        setCategoriesIndexes([...categoriesIndexes, idx]);
      }
    },
    [categoriesIndexes]
  );

  const handleChange = (idx, traitIdx) => {
    const newCategories = [...categories];
    newCategories[idx].traits[traitIdx].checked = !newCategories[idx].traits[traitIdx].checked;
    setCategories(newCategories);
  };

  return (
    <div className="rarity--chart--filters--popup">
      <div className="rarity--chart--filters--popup--header">
        <button type="button" onClick={close}>
          <img className="close" src={closeIcon} alt="Close" />
        </button>
        <p>Filters</p>
        <button className="clear--all" type="button" onClick={() => handleClearAll()}>
          Clear all
        </button>
      </div>
      <div className="rarity--chart--filters--popup--body">
        <div className="selected--filters">
          {showClearALL && <div className="result">231 results</div>}
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
        <div className="categories--filters">
          <h2>Categories</h2>
          {categories.map((item, index) => (
            <div className="each--category" key={uuid()}>
              <div
                className={`dropdown ${categoriesIndexes.includes(index) ? 'open' : ''}`}
                aria-hidden="true"
                onClick={() => handleClick(index)}
              >
                <span>{`${item.title} (${item.traits.length})`}</span>
                <img src={arrowIcon} alt="Arrow" />
                <div className="box--shadow--effect--block" />
              </div>
              {categoriesIndexes.includes(index) && (
                <div className="traits">
                  {item.traits.map((trait, traitIndex) => (
                    <div className="trait" key={uuid()}>
                      <input
                        id={trait.name.toLowerCase().replaceAll(' ', '--')}
                        type="checkbox"
                        checked={trait.checked}
                        onChange={() => handleChange(index, traitIndex)}
                      />
                      <label htmlFor={trait.name.toLowerCase().replaceAll(' ', '--')}>
                        {trait.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="rarity--chart--filters--popup--footer">
        <Button className="light-button" onClick={close}>
          Show 231 results
        </Button>
      </div>
    </div>
  );
};

RarityChartFiltersPopup.propTypes = {
  close: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategories: PropTypes.func.isRequired,
  categoriesIndexes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategoriesIndexes: PropTypes.func.isRequired,
  selectedFiltersLength: PropTypes.number.isRequired,
  setSelectedFiltersLength: PropTypes.func.isRequired,
};

export default RarityChartFiltersPopup;
