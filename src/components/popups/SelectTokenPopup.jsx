import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddToken from './AddTokenPopup.jsx';
import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';
import AppContext from '../../ContextAPI';
import SearchField from '../input/SearchField';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';

const SelectTokenPopup = ({ onClose }) => {
  const { options, setBidtype } = useAuctionContext();
  const [showAddTokenPopup, setShowAddTokenPopup] = useState(false);
  const [optionsClone, setOptionsClone] = useState([...options]);

  const handleChange = (key) => {
    setBidtype(key);
  };

  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => document.body.classList.remove('no__scroll');
  }, []);

  return (
    <div className="select-token">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      {!showAddTokenPopup ? (
        <ul className="option-list">
          <li className="searchDiv">
            <div>
              <h1>Select bid token (ERC-20)</h1>
              <SearchField
                data={options}
                placeholder="Search name or paste address"
                dropdown={false}
                CardElement={<></>}
                enterKeyEvent={false}
                getData={(find) => setOptionsClone(find)}
              />
            </div>
          </li>
          {optionsClone.map((item) => (
            <li
              key={item.value ? item.value : item.name}
              aria-hidden="true"
              onClick={() => handleChange(item.value)}
              onKeyPress={() => handleChange(item.value)}
              onKeyDown={() => handleChange(item.value)}
            >
              <div className="img-name">
                {item.img ? <img src={item.img} alt="icon" /> : <span className="imgDefSpan" />}
                <span className="dai-name">{item.name}</span>
              </div>
              {item.subtitle && <span className="subtitle">{item.subtitle}</span>}
            </li>
          ))}
          <div className="token-div">
            <button
              type="button"
              className="light-border-button add-token"
              onClick={() => setShowAddTokenPopup(true)}
            >
              Add custom token
            </button>
          </div>
        </ul>
      ) : (
        <AddToken setShowAddTokenPopup={setShowAddTokenPopup} />
      )}
    </div>
  );
};
SelectTokenPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SelectTokenPopup;
