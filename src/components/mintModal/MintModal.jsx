import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Modals.scss';
import MintNft from './MintNft';
import MintNftCollection from './MintNftCollection';
import MintSingleNft from './MintSingleNft';
import PopupComponent from '../popups/Popup';
import AppContext from '../../ContextAPI';

const MintModal = ({ open, onClose, ...restProps }) => {
  const { activeView, setActiveView } = useContext(AppContext);

  const handleNtfClick = (type) => {
    setActiveView(type);
  };

  return (
    <div className="whole-modal">
      <div {...restProps} className="mod-div">
        <PopupComponent onClose={onClose} />
        {activeView === null && <MintNft onClick={handleNtfClick} />}
        {activeView === 'single' && <MintSingleNft onClick={handleNtfClick} />}
        {activeView === 'collection' && <MintNftCollection onClick={handleNtfClick} />}
      </div>
    </div>
  );
};

MintModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MintModal;
