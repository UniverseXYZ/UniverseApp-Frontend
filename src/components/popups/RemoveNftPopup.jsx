import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';
// import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';

const RemovePopup = ({ close, nftID, removedItemName, handleRemove }) => (
  <div className="popup-div remove-popup">
    <button type="button" className="popup-close" onClick={close}>
      <img src={closeIcon} alt="" />
    </button>
    <div className="popup-title">
      <h4>Are you sure?</h4>
    </div>
    <div className="popup-text">
      <p>
        Are you sure you want to remove the <b>{removedItemName}</b>?
      </p>
    </div>
    <div className="popup-btns">
      <Button className="light-button" onClick={() => handleRemove(nftID)}>
        Yes, remove
      </Button>
      <Button className="light-border-button" onClick={close}>
        Cancel
      </Button>
    </div>
  </div>
);

RemovePopup.propTypes = {
  close: PropTypes.func.isRequired,
  nftID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  removedItemName: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default RemovePopup;
