import React from "react";
import Popup from "reactjs-popup";
import Button from "../Button";

const CongratsPopup = ({ onClose }) => {
    return (
        <Popup trigger="">
            {
                (close) => (
                    <div className="popup-div congrats-popup">
                        <div className="congrats">Congratulations</div>
                        <div className="popup-text congrats-text"><p>NFT was successfully minted and should be displayed in your wallet shortly</p></div>
                        <div className="popup-btns">
                            <Button className="light-border-button" onClick={close}>Close</Button>
                        </div>
                    </div>
                )
            }
        </Popup>
    );
};

export default CongratsPopup;