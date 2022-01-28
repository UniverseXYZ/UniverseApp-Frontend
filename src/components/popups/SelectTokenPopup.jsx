import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddToken from './AddTokenPopup.jsx';
import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';
import SearchField from '../input/SearchField';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext';
import SetTokenErrorPopup from './SetTokenErrorPopup';

const SelectTokenPopup = ({ onClose }) => {
  const { options, setBidtype } = useAuctionContext();
  const { universeAuctionHouseContract } = useAuthContext();
  const [showAddTokenPopup, setShowAddTokenPopup] = useState(false);
  const [optionsClone, setOptionsClone] = useState([...options]);
  const [tokenError, setTokenError] = useState(false);

  const handleChange = (key) => {
    setBidtype(key);
    onClose();
  };

  useEffect(async () => {
    const supportedTokens = [];
    for (let i = 0; i < options.length; i += 1) {
      const token = options[i];

      try {
        // eslint-disable-next-line no-await-in-loop
        const isSupported = await universeAuctionHouseContract.supportedBidTokens(token.address);

        if (isSupported) {
          supportedTokens.push(token);
        }

        if (i === options.length - 1) {
          setOptionsClone(supportedTokens);
        }
      } catch (error) {
        setTokenError(true);
      }
    }
  }, []);

  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => document.body.classList.remove('no__scroll');
  }, []);
  const selectToken = (
    <div
      className="select-token"
      style={{ overflow: `${optionsClone.length > 5 ? 'scroll' : ''}` }}
    >
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
        </ul>
      ) : (
        <AddToken setShowAddTokenPopup={setShowAddTokenPopup} />
      )}
    </div>
  );
  const selectTokenError = (
    <SetTokenErrorPopup setTokenError={setTokenError} onClose={() => onClose()} />
  );
  if (tokenError) {
    return selectTokenError;
  }
  return selectToken;
};
SelectTokenPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SelectTokenPopup;
