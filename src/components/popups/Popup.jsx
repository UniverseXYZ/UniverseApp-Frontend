import React from "react";
import Popup from "reactjs-popup";
import Button from "../button/Button";
import closeIcon from '../../assets/images/cross.svg';
import "./PopupStyle.scss";

export default ({ onClose }) => {

    return (
        <Popup trigger={<button className="modal-close"><img src={closeIcon} alt=""/> </button>}>
            {
                (close) => (
                    <div className="popup-div modal-close-popup">
                        <button className="popup-close" onClick={close}><img src={closeIcon} alt=""/></button>
                        <div className="popup-title"><h4>Are you sure?</h4></div>
                        <div className="popup-text"><p>Are you sure you want to close this?<br/>All the progress will be lost.</p></div>
                        <div className="popup-btns">
                            <Button onClick={onClose} className="light-button">Discard and close</Button>
                            <Button className="light-border-button" onClick={close}>Continue editing</Button>
                        </div>
                    </div>
                )
            }
        </Popup>
    );
};