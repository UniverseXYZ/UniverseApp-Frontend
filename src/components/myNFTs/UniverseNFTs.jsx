/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect, useRef, useContext } from 'react';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import '../pagination/Pagination.scss';
import checkIcon from '../../assets/images/check.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import AppContext from '../../ContextAPI';
import RemovePopup from '../popups/RemoveNftPopup.jsx';
import main1 from '../../assets/images/main1.png';
import './UniverseNFTs.scss';
import cover from '../../assets/images/cover.png';
import Pagination from '../pagination/Pagionation';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import Lists from './Lists';
import { UNIVERSE_NFTS } from '../../utils/fixtures/NFTsUniverseDummyData';

const UniverseNFTs = () => {
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
  // const data = UNIVERSE_NFTS

  const handleUniverseNfts = (index) => {
    const newUniverseNfts = [...universeNFTs];
    newUniverseNfts[index].selected = !newUniverseNfts[index].selected;

    setUniverseNFTs(newUniverseNfts);
  };

  const handleCollections = (index) => {
    const newCollections = [...collections];
    newCollections[index].selected = !newCollections[index].selected;
    setCollections(newCollections);
  };

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
        <div className="univers_NFTs">
          <div className="universe_filter">
            <div className="universe_filter_label">
              <span>Filter</span>
            </div>
            <div className="universe_filter_input">
              {/* <input
                  className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
                  type="text"
                  placeholder="Browse collections..."
                  onFocus={() => setIsCollectionDropdownOpened(true)}
                /> */}
              <select className="universe_select">
                <option selected="">All characters</option>
                <option>OG characters</option>
                <option>My polymorphs</option>
              </select>
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
          {isCollectionDropdownOpened && (
            <div ref={ref} className="collections__dropdown">
              {collections.length ? (
                collections.map((collection, index) => (
                  <button
                    type="button"
                    key={collection.id}
                    className={collection.selected ? 'selected' : ''}
                    onClick={() => handleCollections(index)}
                  >
                    {typeof collection.avatar === 'string' && collection.avatar.startsWith('#') ? (
                      <div
                        className="random__bg__color"
                        style={{ backgroundColor: collection.avatar }}
                      >
                        {collection.name.charAt(0)}
                      </div>
                    ) : (
                      <img src={URL.createObjectURL(collection.avatar)} alt={collection.name} />
                    )}
                    <span>{collection.name}</span>
                  </button>
                ))
              ) : (
                <div className="dropdown_search">
                  <ul>
                    <div>
                      <li>All characters</li>
                    </div>
                    <div>
                      <li>OG characters</li>
                    </div>
                    <div>
                      <li>My polymorphs</li>
                    </div>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="nfts__lists">
          <div className="nft__box">
            <div>
              <img src={main1} alt="dlk" />
            </div>
            <div className="polymorph">
              <p>Polymorph #22</p>
            </div>
            <div className="nft_box_footer">
              <img src={cover} alt="nsdn" />
              <p>Universe Polymorphs</p>
            </div>
          </div>
        </div>
        {/* {filteredNFTs.length ? (
          <div>
            <Lists
              data={filteredNFTs}
              perPage={perPage}
              offset={offset}
              selectedNFTIds={selectedNFTIds}
              setSelectedNFTIds={setSelectedNFTIds}
              winners={Number(winners)}
              nftsPerWinner={Number(nftsPerWinner)}
            />

            <div className="pagination__container">
              <Pagination data={filteredNFTs} perPage={perPage} setOffset={setOffset} />
              <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
          </div>
        ) : (
          <div className="empty__filter__nfts">
            <h3>No NFTs found</h3>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default UniverseNFTs;
