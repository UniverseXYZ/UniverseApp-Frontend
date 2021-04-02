import React, { useContext } from "react";
import AppContext from "../../ContextAPI";
import Button from "../button/Button";

const CongratsPopup = ({ onClose }) => {
    console.log('onClose', onClose)
    const { setShowModal } = useContext(AppContext);
    return (
        <div className="popup-div congrats-popup">
            <div className="congrats">Congratulations</div>
            <div className="popup-text congrats-text"><p>NFT was successfully minted and should be displayed in your wallet shortly</p></div>
            <div className="popup-btns">
                <Button className="light-border-button" onClick={onClose}>Close</Button>
            </div>
        </div>
    );
};

export default CongratsPopup;