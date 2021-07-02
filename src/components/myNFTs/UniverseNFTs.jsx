import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../pagination/Pagination.scss';
import './UniverseNFTs.scss';
import uuid from 'react-uuid';
import { useQuery } from '@apollo/client';
import AppContext from '../../ContextAPI';
import Pagination from '../pagination/Pagionation';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import arrowDown from '../../assets/images/arrow-down.svg';
import { transferPolymorphs } from '../../utils/graphql/queries';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';
import PolymorphImage from './PolymorphImage';

const UniverseNFTs = () => {
  const { setSelectedNftForScramble, userPolymorphs, address, fetchUserPolymorphsTheGraph } =
    useContext(AppContext);
  const history = useHistory();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const ref = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('My polymorphs');
  const [searchByName, setSearchByName] = useState('');
  const { data } = useQuery(transferPolymorphs(address));
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    setDisplayItems(userPolymorphs);
  }, [userPolymorphs]);

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpened(false);
      }
    }
  };

  const handleSearchByName = (value) => {
    setSearchByName(value);

    const itemsTodisplay = userPolymorphs.filter(
      (item) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setDisplayItems(itemsTodisplay);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

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
                // onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                aria-hidden="true"
              >
                <span className="selected__universe__item">{selectedItem}</span>
                <img className="arrow__down" src={arrowDown} alt="Arrow" />
                {isDropdownOpened && (
                  <div className="sort__dropdown">
                    <ul>
                      {/* <li
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
                      </li> */}
                      <li
                        onClick={() => {
                          // setSelectedItem('My polymorphs');
                          // setIsDropdownOpened(false);
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
              <span>Search by name</span>
            </div>
            <div className="search_by_name_input">
              <input
                type="text"
                placeholder="Start typing"
                value={searchByName}
                onChange={(e) => handleSearchByName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="nfts__lists">
          {displayItems
            .slice(offset, offset + perPage)
            // .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
            .map((elm) =>
              elm.previewImage.type === 'image/jpg' ? (
                <div
                  key={uuid()}
                  className="nft__box"
                  aria-hidden="true"
                  onClick={() => {
                    setSelectedNftForScramble(elm);
                    history.push(`/polymorphs/${elm.id}`);
                  }}
                >
                  <PolymorphImage
                    name={elm.name}
                    placeholderImg={loadingBg}
                    errorImg={loadingBg}
                    src={elm.previewImage.url}
                    tokenId={elm.id}
                  />

                  <div className="polymorph">
                    <p>{elm.name}</p>
                  </div>
                  <div className="nft_box_footer">
                    <img alt="fjffd" src={elm.collectionAvatar} />
                    <p>{elm.collectionName}</p>
                  </div>
                </div>
              ) : (
                <div key={uuid()} className="nft__box">
                  <div className="videoicon">
                    <img alt="videocover" src={elm.videoavatar} />
                  </div>
                  <div className="nft__box__image">
                    <video
                      onMouseOver={(event) => event.target.play()}
                      onFocus={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                      onBlur={(event) => event.target.pause()}
                    >
                      <source src={elm.previewImage.url} type="video/mp4" />
                      <track kind="captions" />
                    </video>
                  </div>
                  <div className="polymorph">
                    <p>{elm.name}</p>
                  </div>
                  <div className="nft_box_footer">
                    <img alt="fjffd" src={elm.collectionAvatar} />
                    <p>{elm.collectionName}</p>
                  </div>
                </div>
              )
            )}
        </div>
        {displayItems.length ? (
          <div>
            <div className="pagination__container">
              <Pagination data={displayItems} perPage={perPage} setOffset={setOffset} />
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
