import React, { useState } from 'react';
import { Animated } from 'react-animated-css';
import searchIcon from '../../../../../../../../assets/images/search-gray.svg';
import collectionIcon from '../../../../../../../../assets/images/marketplace/collections.svg';
import closeIcon from '../../../../../../../../assets/images/close-menu.svg';
import checkIcon from '../../../../../../../../assets/images/check-vector.svg';
import universeIcon from '../../../../../../../../assets/images/universe-img.svg';

import { useAuthContext } from '../../../../../../../../contexts/AuthContext';
import { getCollectionBackgroundColor } from '../../../../../../../../utils/helpers';
import { shortenEthereumAddress } from '../../../../../../../../utils/helpers/format';

interface ICollectionsProps {
  selectedCollections: any[],
  setSelectedCollections: (value: any) => void,
  savedCollections: any[],
  setSavedCollections: (value: any) => void,
}

export const Collections = (props: ICollectionsProps) => {
  // const { deployedCollections } = useAuthContext();
  const deployedCollections: any[] = [];
  const [showFilters, setShowFilters] = useState(true);
  const [collections, setCollections] = useState(deployedCollections);
  const [searchByCollections, setSearchByCollections] = useState('');

  const handleSearch = (value: any) => {
    setSearchByCollections(value);
    const filtered = deployedCollections?.filter((col: any) =>
      col.name.toLowerCase().includes(value.toLowerCase())
    );

    setCollections(filtered);
  };

  const handleSelect = (coll: any) => {
    const newSelectedColl = [...props.selectedCollections];
    const index = props.selectedCollections.map((col) => col.id).indexOf(coll.id);

    if (index >= 0) {
      newSelectedColl.splice(index, 1);
    } else {
      newSelectedColl.push(coll);
    }
    props.setSavedCollections(newSelectedColl);
    props.setSelectedCollections(newSelectedColl);
  };

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
        onClick={() => setShowFilters(!showFilters)}
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
              onChange={(e) => handleSearch(e.target.value)}
              value={searchByCollections}
            />
            <img src={searchIcon} alt="Search" />
          </div>
          {collections
            .filter((item: any) => item.name.toLowerCase().includes(searchByCollections.toLowerCase()))
            .sort((a: any, b: any) => b.nftCount - a.nftCount)
            .map((col: any) => (
              <div
                className="collections--list"
                key={col.id}
                onClick={() => handleSelect(col)}
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
                ) : !col.coverUrl ? (
                  <div
                    className="random--avatar--color"
                    style={{
                      backgroundColor: getCollectionBackgroundColor(col),
                    }}
                  >
                    {col.name.charAt(0)}
                  </div>
                ) : (
                  <img className="sell__collection" src={col.coverUrl} alt={col.name} />
                )}
                <p>
                  {col.name || shortenEthereumAddress(col.address)} ({col.nftCount})
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};