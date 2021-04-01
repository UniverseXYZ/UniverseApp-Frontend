import React, { useContext } from "react";
import AppContext from "../../ContextAPI";
import Button from "../Button";
import "./popupStyle.scss";

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
        <div className="popup-div remove-popup prevent-close">
            <div className="popup-text prevent-close"><p>Are you sure you want to remove the <b>{removedItemName}</b>?</p></div>
            <div className="popup-btns prevent-close">
                <Button className="light-button prevent-close" onClick={() => handleRemove(nftID)}>Yes, Remove</Button>
                <Button className="light-border-button prevent-close" onClick={close}>Cancel</Button>
            </div>
        </div>
    );
};

export default RemovePopup;