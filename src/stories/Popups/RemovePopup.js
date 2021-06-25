import React from 'react';
import Button from '../../components/button/Button';
import './RemovePopup.scss';
import closeIcon from '../../assets/images/crossclose.png';

const RemovePopup = () => (
  <div className="popup-div remove-popup">
    <img src={closeIcon} alt="icon" className="popup-close" />
    <div className="popup-title">
      <h4>Are you sure?</h4>
    </div>
    <div className="popup-text">
      <p>
        Are you sure you want to remove the <b>NFT 2</b>? All your changes will be deleted and you
        will no longer be able too access them.
      </p>
    </div>
    <div className="popup-btns">
      <Button className="light-button">Yes, remove</Button>
      <Button className="light-border-button">Cancel</Button>
    </div>
  </div>
);
export default RemovePopup;
