import React, { useContext } from "react";
import AppContext from "../../ContextAPI";
import Button from "../button/Button";
import "./PopupStyle.scss";

const RemovePopup = ({ close, nftID, removedItemName, removeFrom, collectionNFTs, setCollectionNFTs }) => {
    const { savedNfts, setSavedNfts, savedCollections, setSavedCollections } = useContext(AppContext);

    const handleRemove = (id) => {
        if (removeFrom === 'collection') {
            setCollectionNFTs(collectionNFTs.filter(item => item.id !== id));
            setSavedNfts(savedNfts.filter(item => item.id !== id));
        } else if(removeFrom === 'saved') {
            setSavedNfts(savedNfts.filter(item => item.id !== id));
        } else if (removeFrom === 'savedCollection') {
            setSavedNfts(savedNfts.filter(item => item.collectionId !== id));
            setSavedCollections(savedCollections.filter(item => item.id !== id));
        }
    }

    return (
        <div className="popup-div remove-popup">
            <div className="popup-text"><p>Are you sure you want to remove the <b>{removedItemName}</b>?</p></div>
            <div className="popup-btns">
                <Button className="light-button" onClick={() => handleRemove(nftID)}>Yes, Remove</Button>
                <Button className="light-border-button" onClick={close}>Cancel</Button>
            </div>
        </div>
    );
};

export default RemovePopup;