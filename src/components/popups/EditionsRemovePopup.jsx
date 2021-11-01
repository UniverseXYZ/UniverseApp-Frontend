import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../button/Button.jsx';
import EditionsSelectRemove from '../editionsSelectRemove/EditionsSelectRemove';
import SearchNFTsField from '../input/SearchNFTsField.jsx';

const EditionsRemovePopup = ({ onClose, nft, onRemoveEdition }) => {
  const [searchValue, setSearchValue] = useState('');

  const nftCopy = { ...nft };
  const editions = [...nft.tokenIds];
  let filteredEditions = [];
  if (searchValue) {
    filteredEditions = editions.filter((edition) =>
      edition.toString().toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    nftCopy.tokenIds = filteredEditions;
  }

  const handleRemoveEdition = (selectedNft) => onRemoveEdition(selectedNft);
  return (
    <div className="editionsRemove">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h3>Select editions to remove</h3>
      <SearchNFTsField
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholder="Search"
      />
      <EditionsSelectRemove nft={nftCopy} removeEdition={handleRemoveEdition} close={onClose} />
    </div>
  );
};
EditionsRemovePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onRemoveEdition: PropTypes.func.isRequired,
};

export default EditionsRemovePopup;
