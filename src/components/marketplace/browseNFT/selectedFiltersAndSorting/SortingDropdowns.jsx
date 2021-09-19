import React, { useState, useRef, useEffect, useContext } from 'react';
import uuid from 'react-uuid';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';

const SortingDropdowns = () => {
  const [showFirstDropdown, setShowFirstDropdown] = useState(false);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [selectedFirstDropdownIndex, setSelectedFirstDropdownIndex] = useState(0);
  const [selectedSecondDropdownIndex, setSelectedSecondDropdownIndex] = useState(0);
  const [sortName, setSortName] = useState('Sort by');
  const secondDropdownItems = [
    'Sort by',
    'Ending soon',
    'Lowest price first',
    'Highest price first',
    'Recently listed',
    'Recently created',
    'Recently sold',
    'Most liked',
  ];
  const ref = useRef(null);
  const ref2 = useRef(null);

  // TODO: Uncomment for marketplace
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowFirstDropdown(false);
    }
    if (ref2.current && !ref2.current.contains(event.target)) {
      setShowSecondDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="nft--sorting">
      {/* <div
        className={`dropdown ${showFirstDropdown ? 'open' : ''}`}
        aria-hidden="true"
        onClick={() => setShowFirstDropdown(!showFirstDropdown)}
        ref={ref}
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
      </div> */}
      <div
        className={`dropdown ${showSecondDropdown ? 'open' : ''}`}
        aria-hidden="true"
        onClick={() => setShowSecondDropdown(!showSecondDropdown)}
        ref={ref2}
      >
        <span>{sortName}</span>
        <img src={arrowDown} alt="Arrow down" className={showSecondDropdown ? 'rotate' : ''} />
        <div className="box--shadow--effect--block" />
        {showSecondDropdown ? (
          <div className="dropdown--items">
            {secondDropdownItems.map(
              (item, index) =>
                index !== selectedSecondDropdownIndex &&
                index !== 0 && (
                  // TODO: Uncomment for marketplace
                  // <div
                  //   className="dropdown--item"
                  //   key={uuid()}
                  //   aria-hidden="true"
                  //   onClick={() => {
                  //     setSelectedSecondDropdownIndex(index);
                  //     setSortName(secondDropdownItems[index]);
                  //   }}
                  // >
                  //   {item}
                  // </div>

                  <div
                    style={{ opacity: 0.2, cursor: 'default' }}
                    className="dropdown--item"
                    key={uuid()}
                    aria-hidden="true"
                  >
                    {item}
                  </div>
                )
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SortingDropdowns;
