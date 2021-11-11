import React, { useState, useEffect, useRef } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import arrowDown from '../../../assets/images/browse-nft-arrow-down.svg';

const ChooseTokenIdDropdown = ({ nft }) => {
  const ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState(nft.tokenIds[0]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

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
              {nft.tokenIds.map((tokenId) => (
                <div
                  className="dropdown--item"
                  key={uuid()}
                  aria-hidden="true"
                  onClick={() => setSelectedTokenId(tokenId)}
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
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ChooseTokenIdDropdown;
