import React from 'react'
import Button from '../button/Button'
import './PopupStyle.scss';

const LoadingPopup = ({ onClose }) => {
    return (
        <div className="loading-div popup-div">
            <div className="loading-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="loading-text"><p>Loading... do not click refresh or leave this page.<br/>Just kidding, you can do whatever you want.<br/>This is Ethereum!</p></div>
            <div className="loading-btns">
                <Button onClick={onClose} className="light-border-button">Close</Button>
            </div>
        </div>
    );
};
export default LoadingPopup