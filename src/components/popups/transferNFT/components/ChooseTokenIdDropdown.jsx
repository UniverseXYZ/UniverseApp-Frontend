import React, { useState, useEffect, useRef } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';

export const ChooseTokenIdDropdown = ({ selectedTokenId, tokenIds, onSelect }) => {
  const ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  return (
    <div className="tokenID--dropdown--container">
      <div
        className={`dropdown ${showDropdown ? 'open' : ''}`}
        aria-hidden="true"
        onClick={() => setShowDropdown(!showDropdown)}
        ref={ref}
      >
        <span>{`#${selectedTokenId}`}</span>
        <img src={arrowDown} alt="Arrow down" className={showDropdown ? 'rotate' : ''} />
        {showDropdown ? (
          <div className="dropdown--items">
            <div className="dropdown--items--container">
              {tokenIds.map((tokenId) => (
                <div
                  className="dropdown--item"
                  key={uuid()}
                  aria-hidden="true"
                  onClick={() => onSelect(tokenId)}
                >
                  {`#${tokenId}`}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="box--shadow--effect--block" />
    </div>
  );
};

ChooseTokenIdDropdown.propTypes = {
  tokenIds: PropTypes.oneOfType([PropTypes.array]).isRequired,
  selectedTokenId: PropTypes.oneOfType([PropTypes.string]).isRequired,
  onSelect: PropTypes.func.isRequired,
};
