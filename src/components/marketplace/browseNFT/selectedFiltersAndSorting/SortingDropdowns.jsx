import React, { useState } from 'react';
import uuid from 'react-uuid';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';

const SortingDropdowns = () => {
  const [showFirstDropdown, setShowFirstDropdown] = useState(false);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [selectedFirstDropdownIndex, setSelectedFirstDropdownIndex] = useState(0);
  const [selectedSecondDropdownIndex, setSelectedSecondDropdownIndex] = useState(0);
  const firstDropdownItems = ['All Items', 'Single Items', 'Bundles'];
  const secondDropdownItems = [
    'Sort by',
    'Ending Soon',
    'Lowest Price First',
    'Highest Price First',
    'Recently Listed',
    'Recently Created',
    'Recently Sold',
    'Most Liked',
  ];

  return (
    <div className="nft--sorting">
      <div
        className="dropdown"
        aria-hidden="true"
        onClick={() => setShowFirstDropdown(!showFirstDropdown)}
      >
        <span>{firstDropdownItems[selectedFirstDropdownIndex]}</span>
        <img src={arrowDown} alt="Arrow down" className={showFirstDropdown ? 'rotate' : ''} />
        {showFirstDropdown ? (
          <div className="dropdown--items">
            {firstDropdownItems.map((item, index) => (
              <div
                className="dropdown--item"
                key={uuid()}
                aria-hidden="true"
                onClick={() => setSelectedFirstDropdownIndex(index)}
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        className="dropdown"
        aria-hidden="true"
        onClick={() => setShowSecondDropdown(!showSecondDropdown)}
      >
        <span>{secondDropdownItems[selectedSecondDropdownIndex]}</span>
        <img src={arrowDown} alt="Arrow down" className={showSecondDropdown ? 'rotate' : ''} />
        {showSecondDropdown ? (
          <div className="dropdown--items">
            {secondDropdownItems.map((item, index) => (
              <div
                className="dropdown--item"
                key={uuid()}
                aria-hidden="true"
                onClick={() => setSelectedSecondDropdownIndex(index)}
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SortingDropdowns;
