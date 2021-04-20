import React from "react";
import PropTypes from 'prop-types';
import Button from "../button/Button";
import closeIcon from '../../assets/images/cross.svg';

const CongratsPopup = ({ onClose }) => {
    return (
        <div className="popup-div congrats-popup">
            <button className="popup-close" onClick={onClose}><img src={closeIcon} alt=""/></button>
            <div className="popup-title"><h4>Congratulations</h4></div>
            <div className="popup-text"><p>NFT was successfully minted and should be displayed in your wallet shortly</p></div>
            <div className="popup-btns">
                <Button className="light-border-button" onClick={onClose}>Close</Button>
            </div>
        </div>
    );
};

CongratsPopup.propTypes = {
    onClose: PropTypes.func,
}

export default CongratsPopup;