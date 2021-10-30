import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../button/Button.jsx';
import EditionsSelectRemove from '../editionsSelectRemove/EditionsSelectRemove';
import SearchField from '../input/SearchField';

const EditionsRemovePopup = ({ onClose, nft, editions, onRemoveEdition }) => {
  const handleRemoveEdition = (selectedNft) => onRemoveEdition(selectedNft);
  return (
    <div className="editionsRemove">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h3>Select editions to remove</h3>
      <SearchField
        data={[nft]}
        placeholder="Search"
        dropdown={false}
        CardElement={<></>}
        enterKeyEvent={false}
      />
      <EditionsSelectRemove nft={nft} editions={editions} removeEdition={handleRemoveEdition} />
    </div>
  );
};
EditionsRemovePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
  editions: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onRemoveEdition: PropTypes.func.isRequired,
};

export default EditionsRemovePopup;
