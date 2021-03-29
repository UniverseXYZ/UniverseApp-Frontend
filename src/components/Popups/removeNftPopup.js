import React from "react";
import Popup from "reactjs-popup";
import Button from "../Button";
import "./popupStyle.scss";

const RemovePopup = ({ onClose }) => {
    return (
        <Popup  trigger={<button className=""></button>}>
            {
                (close) => (
                    <div className="popup-div remove-popup">
                        <div className="popup-text"><p>Are you sure you want to remove the <b>NFT 2</b>?</p></div>
                        <div className="popup-btns">
                            <Button onClick="" className="light-button">Yes, Remove</Button>
                            <Button className="light-border-button" onClick={close}>Cancel</Button>
                        </div>
                    </div>
                )
            }
        </Popup>
    );
};

export default RemovePopup;