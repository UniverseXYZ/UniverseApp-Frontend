import React, { useState, useEffect, useRef, useContext } from 'react';
import uuid from 'react-uuid';
import '../pagination/Pagination.scss';
import main1 from '../../assets/images/main1.png';
import main2 from '../../assets/images/main2.png';
import main3 from '../../assets/images/main3.png';
import './UniverseNFTs.scss';
import cover from '../../assets/images/cover.png';
import Pagination from '../pagination/Pagionation';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import Lists from './Lists';
import { UNIVERSE_NFTS } from '../../utils/fixtures/NFTsUniverseDummyData';
import arrowDown from '../../assets/images/arrow-down.svg';

const UniverseNFTs = (selectedNFTIds, setSelectedNFTIds, winners, nftsPerWinner) => {
  const [selectAllIsChecked, setSelectAllIsChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const ref = useRef(null);
  const [indexes, setIndexes] = useState([]);
  const [collections, setCollections] = useState([]);
  const [mobileVersion, setMobileVersion] = useState(true);
  const [draftCollections, setDraftCollections] = useState([]);
  const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('All characters');
  const sliceData = UNIVERSE_NFTS.slice(offset, offset + perPage);

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsCollectionDropdownOpened(false);
      }
    }
  };

  const clearFilters = () => {
    const newCollections = [...collections];
    newCollections.forEach((collection) => {
      collection.selected = false;
    });

    setCollections(newCollections);
    setSearchByName('');
  };

  const handleSearchByName = (value) => {
    setSearchByName(value);
  };

  return (
    <div className="tab__saved__nfts">
      <div className="tab__wallet">
        <div className="universe_NFTs">
          <div className="universe_filter">
            <div className="universe_filter_label">
              <span>Filter</span>
            </div>
            <div>
              <div
                ref={ref}
                className={`universe_dropdown ${isDropdownOpened ? 'opened' : ''}`}
                onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                aria-hidden="true"
              >
                <span className="selected__universe__item">{selectedItem}</span>
                <img className="arrow__down" src={arrowDown} alt="Arrow" />
                {isDropdownOpened && (
                  <div className="sort__dropdown">
                    <ul>
                      <li
                        onClick={() => {
                          setSelectedItem('All characters');
                          setIsDropdownOpened(false);
                        }}
                        aria-hidden="true"
                      >
                        All characters
                      </li>
                      <li
                        onClick={() => {
                          setSelectedItem('OG characters');
                          setIsDropdownOpened(false);
                        }}
                        aria-hidden="true"
                      >
                        OG characters
                      </li>
                      <li
                        onClick={() => {
                          setSelectedItem('My polymorphs');
                          setIsDropdownOpened(false);
                        }}
                        aria-hidden="true"
                      >
                        My polymorphs
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="universe_search_by_name">
            <div className="universe_search_by_name_label">
              <span>Seach by name</span>
            </div>
            <div className="search_by_name_input">
              <input
                type="text"
                placeholder="Start typing"
                // value={searchByName}
                // onChange={(e) => handleSearchByName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="nfts__lists">
          {sliceData.map((elm) => (
            <div className="nft__box">
              <div>
                <img alt="ffff" src={elm.previewImage.url} />
              </div>
              <div className="polymorph">
                <p>{elm.name}</p>
              </div>
              <div className="nft_box_footer">
                <img alt="fjffd" src={elm.collectionAvatar} />
                <p>{elm.collectionName}</p>
              </div>
            </div>
          ))}
        </div>
        {sliceData.length ? (
          <div>
            <div className="pagination__container">
              <Pagination data={UNIVERSE_NFTS} perPage={perPage} setOffset={setOffset} />
              <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
          </div>
        ) : (
          <div className="empty__filter__nfts">
            <h3>No NFTs found</h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default UniverseNFTs;
