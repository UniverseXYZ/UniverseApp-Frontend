import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import AddToken from './AddTokenPopup.jsx';

import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import AppContext from '../../ContextAPI';

const SelectTokenPopup = ({ onClose }) => {
  const [searchByNameAndAddress, setsearchByNameAndAddress] = useState('');

  const { auction, setAuction, options, setOptions, bidtype, setBidtype } = useContext(AppContext);
  const [openList, setOpenList] = useState(true);

  const handleChange = (key) => {
    setBidtype(key);
    setOpenList(true);
  };

  const handleSearch = (value) => {
    setsearchByNameAndAddress(value);
  };

  return (
    <div className="select-token">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <ul
        className="option-list"
        //   hidden={openList}
      >
        <li className="searchDiv">
          <div>
            <h1>Select bid token (ERC-20)</h1>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              value={searchByNameAndAddress}
              placeholder="Search name or paste address"
              className="searchInp"
            />
          </div>
        </li>
        {options
          .filter(
            (item) =>
              item.name.toLowerCase().includes(searchByNameAndAddress.toLowerCase()) ||
              item.address.toLowerCase().includes(searchByNameAndAddress.toLowerCase())
          )
          .map((item) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={item.value ? item.value : item.name}
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
          <Popup
            nested
            trigger={
              <button type="button" className="light-border-button add-token" onClick={onClose}>
                Add token
              </button>
            }
          >
            {(close) => <AddToken onClose={close} />}
          </Popup>
        </div>
      </ul>
    </div>
  );
};
SelectTokenPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SelectTokenPopup;
