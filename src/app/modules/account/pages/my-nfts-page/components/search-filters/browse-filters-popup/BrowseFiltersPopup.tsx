import { useState } from 'react';

// Components
import { ApiCollectionsFiltersMobile } from './ApiCollectionsFiltersMobile';

// Icons
import closeIcon from '../../../../../../../../assets/images/close-menu.svg';

// Interfaces & Types
import { ISearchBarDropdownCollection } from '../../../../../../nft/types';
import { ICollectionFilterValue } from '../index';
interface IPropsBrowseFiltersPopup {
  onClose: () => void,
  handleCollectionSearch: (value: ICollectionFilterValue) => void,
  allCollections: ISearchBarDropdownCollection[],
  selectedCollections: ISearchBarDropdownCollection[],
  setSelectedCollections: (c: ISearchBarDropdownCollection[]) => void,
};

export const BrowseFiltersPopup = (props: IPropsBrowseFiltersPopup) => {
  const [collectionName, setCollectionName] = useState<string>('');

  const handleClearCollections = () => {
    props.setSelectedCollections([]);
    setCollectionName('');

    const r: ICollectionFilterValue = {
      contractAddress: ''
    };

    props.handleCollectionSearch(r);
    props.onClose();
  };

  const handleSave = () => {
    const c: ISearchBarDropdownCollection = props.selectedCollections[0];

    const r: ICollectionFilterValue = {
      contractAddress: c.address
    };

    props.handleCollectionSearch(r);
    props.onClose();
  }

  const handleClose = () => {
    // This handles the case in which, the user has deselected a collection and just press the X button
    // In this case we wan't to clear all the filters of the user
    if (!props.selectedCollections.length) {
      handleClearCollections();
      return;
    }

    props.onClose();
  }

  return (
    <div className="browse__nft__filter__popup">
      <div className="browse__nft__filter__header">
        <img className="close" src={closeIcon} alt="Close" onClick={handleClose} aria-hidden="true" />
        <h3>Filters</h3>
        <button type="button" className="clear__all" onClick={handleClearCollections}>
          Clear all
        </button>
      </div>
      <div className="browse__nft__filter__body">
        <ApiCollectionsFiltersMobile
          collectionName={collectionName}
          setCollectionName={setCollectionName}
          allCollections={props.allCollections}
          handleCollectionSearch={props.handleCollectionSearch}
          selectedCollections={props.selectedCollections}
          setSelectedCollections={props.setSelectedCollections}
        />
      </div>
      <div className="show--results">
        <button
          type="button"
          className="light-button"
          disabled={!props.selectedCollections.length}
          onClick={handleSave}>
            Show results
        </button>
      </div>
    </div>
  );
};