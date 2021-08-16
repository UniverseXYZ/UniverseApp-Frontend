import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';
import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';
import { removeSavedNft } from '../../utils/api/mintNFT';

const RemovePopup = ({
  close,
  nftID,
  removedItemName,
  removeFrom,
  collectionNFTs,
  setCollectionNFTs,
}) => {
  const { savedNfts, setSavedNfts, savedCollections, setSavedCollections } = useContext(AppContext);

  const handleRemove = async (id) => {
    if (removeFrom === 'collection') {
      setCollectionNFTs(collectionNFTs.filter((item) => item.id !== id));
      // setSavedNfts(savedNfts.filter((item) => item.id !== id));
    } else if (removeFrom === 'saved') {
      setSavedNfts(savedNfts.filter((item) => item.id !== id) || []);
      const result = await removeSavedNft(id);

      if (!result.ok || result.status !== 200) {
        console.error(`Cannot delete NFT with id: ${id}`);
      }
    } else if (removeFrom === 'savedCollection') {
      setSavedNfts(savedNfts.filter((item) => item.collectionId !== id) || []);
      setSavedCollections(savedCollections.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="popup-div remove-popup">
      <button type="button" className="popup-close" onClick={close}>
        <img src={closeIcon} alt="" />
      </button>
      <div className="popup-title">
        <h4>Are you sure?</h4>
      </div>
      <div className="popup-text">
        <p>
          Are you sure you want to remove the <b>{removedItemName}</b>?
        </p>
      </div>
      <div className="popup-btns">
        <Button className="light-button" onClick={() => handleRemove(nftID)}>
          Yes, remove
        </Button>
        <Button className="light-border-button" onClick={close}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

RemovePopup.propTypes = {
  close: PropTypes.func.isRequired,
  nftID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  removedItemName: PropTypes.string.isRequired,
  removeFrom: PropTypes.string.isRequired,
  collectionNFTs: PropTypes.oneOfType([PropTypes.array]),
  setCollectionNFTs: PropTypes.func,
};

RemovePopup.defaultProps = {
  collectionNFTs: [],
  setCollectionNFTs: () => {},
};
export default RemovePopup;
