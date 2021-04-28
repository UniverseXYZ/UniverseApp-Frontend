import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../button/Button';

const AddTokenPopup = ({ onClose }) => (
  <div className="add__token">
    <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
    <h3>Add token</h3>
    <label>Token Contract Address</label>
    <input className="inp" placeholder="0x0000" />
    <label>Token Symbol</label>
    <input className="inp" placeholder="Name" />
    <label>Decimal and Precision</label>
    <input className="inp" />
    <Button className="light-button">Add token</Button>
  </div>
);
AddTokenPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddTokenPopup;
