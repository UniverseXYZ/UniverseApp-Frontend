import React from 'react'
import Popup from 'reactjs-popup'
import Button from '../Button'
import './popupStyle.scss';

const LoadingPopup = ({ onClose }) => {
    return (
        <Popup trigger="">
            {
                (close) => (
                    <div className="loading-div popup-div">
                        <div className="loading-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="loading-text"><p>Loading... do not click refresh or leave this page.<br/>Just kidding, you can do whatever you want.<br/>This is Ethereum!</p></div>
                        <div className="loading-btns">
                            <Button onClick={close} className="light-border-button">Close</Button>
                        </div>
                    </div>
                )
            }
        </Popup>
    );
};
export default LoadingPopup