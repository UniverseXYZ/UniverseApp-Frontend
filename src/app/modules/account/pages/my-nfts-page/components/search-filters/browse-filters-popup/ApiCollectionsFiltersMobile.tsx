import { useState } from 'react';

// Icons
import searchIcon from '../../../../../../../../assets/images/search-gray.svg';
import collectionIcon from '../../../../../../../../assets/images/marketplace/collections.svg';
import checkIcon from '../../../../../../../../assets/images/check-vector.svg';
import universeIcon from '../../../../../../../../assets/images/universe-img.svg';

// Helpers
import { getCollectionBackgroundColor } from '../../../../../../../../utils/helpers';
import { shortenEthereumAddress } from '../../../../../../../../utils/helpers/format';

// Interfaces
import { ISearchBarDropdownCollection } from '../../../../../../nft/types';
import { ICollectionFilterValue } from '../index';

interface ICollectionsMobileProps {
  collectionName: string,
  setCollectionName: (value: string) => void,
  handleCollectionSearch: (value: ICollectionFilterValue) => void,
  allCollections: ISearchBarDropdownCollection[],
  selectedCollections: ISearchBarDropdownCollection[],
  setSelectedCollections: (c: ISearchBarDropdownCollection[]) => void,
}

export const ApiCollectionsFiltersMobile = (props: ICollectionsMobileProps) => {

  const handleSearchCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    props.setCollectionName(name);
  };

  const handleSelectCollection = (c: ISearchBarDropdownCollection) => {
    const alreadySelected = props.selectedCollections.find((item: ISearchBarDropdownCollection) => item.id === c.id);

    if (alreadySelected) {
      // The user want's to de-select a collection from the list
      props.setSelectedCollections([]);
      return;
    };

    const newSelectedCollections = [c];
    props.setSelectedCollections(newSelectedCollections);
  };

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
      >
        <h3>
          <img src={collectionIcon} alt="Collection" /> Collections
        </h3>
      </div>
      <div >
        <div className="browse--nft--sidebar--filtration--item--content">
          <div className="search--field">
            <input
              type="text"
              placeholder="Search collections"
              onChange={handleSearchCollection}
              value={props.collectionName}
            />
            <img src={searchIcon} alt="Search" />
          </div>
          {props.allCollections
            .filter((item: ISearchBarDropdownCollection) => item.name.toLowerCase().includes(props.collectionName.toLowerCase()))
            .map((col: ISearchBarDropdownCollection) => (
              <div
                className="collections--list"
                key={col.id}
                onClick={() => handleSelectCollection(col)}
                aria-hidden="true"
              >
                {props.selectedCollections.map((coll) => coll.id).indexOf(col.id) >= 0 ? (
                  <div
                    className="random--avatar--color"
                    style={{
                      background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%)',
                    }}
                  >
                    <img
                      style={{ width: 20, height: 20, marginRight: 0, objectFit: 'initial' }}
                      src={checkIcon}
                      alt="check"
                    />
                  </div>
                ) : col.address === process?.env?.REACT_APP_UNIVERSE_ERC_721_ADDRESS?.toLowerCase() ? (
                  <img className="random--avatar--color" src={universeIcon} alt={col.name} />
                ) : !col.image ? (
                  <div
                    className="random--avatar--color"
                    style={{
                      backgroundColor: getCollectionBackgroundColor(col),
                    }}
                  >
                    {col.name.charAt(0)}
                  </div>
                ) : (
                  <img className="sell__collection" src={col.image} alt={col.name} />
                )}
                <p>
                  {col.name || shortenEthereumAddress(col.address)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};