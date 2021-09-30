import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import bubbleIcon from '../../assets/images/text-bubble.png';
import plusIcon from '../../assets/images/plus.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import SimplePagination from '../pagination/SimplePaginations';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import CollectionPendingDropdown from './pendingDropdown/CollectionPendingDropdown.jsx';
import { PLACEHOLDER_PENDING_COLLECTIONS } from '../../utils/fixtures/PendingCollectionsDummyData';

const DeployedCollections = () => {
  const { deployedCollections } = useAuthContext();
  const history = useHistory();
  const ref2 = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(8);

  const handleClickOutside = (event) => {
    if (ref2.current && !ref2.current.contains(event.target)) {
      setIsDropdownOpened(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  console.log(deployedCollections);
  return (
    <div className="tab__saved__collections">
      {PLACEHOLDER_PENDING_COLLECTIONS.length ? (
        <CollectionPendingDropdown data={PLACEHOLDER_PENDING_COLLECTIONS} />
      ) : (
        <></>
      )}
      {deployedCollections.length ? (
        <>
          <div className="saved__collections__lists">
            {deployedCollections.slice(offset, offset + perPage).map((collection, index) => (
              <div
                className="saved__collection__box"
                key={uuid()}
                aria-hidden="true"
                onClick={() =>
                  history.push(`/collection/${collection.address}`, {
                    collection,
                    saved: true,
                  })
                }
              >
                <div className="saved__collection__box__header">
                  {collection.bannerUrl ? (
                    <img src={collection.bannerUrl} alt={collection.name} />
                  ) : typeof collection.previewImage === 'string' &&
                    collection.previewImage.startsWith('#') ? (
                    <div
                      className="random__bg__color"
                      style={{ backgroundColor: collection.previewImage }}
                    />
                  ) : collection.coverUrl ? (
                    <img className="blur" src={collection.coverUrl} alt={collection.name} />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: getCollectionBackgroundColor(collection),
                      }}
                    />
                  )}
                </div>
                <div className="saved__collection__box__body">
                  {!collection.coverUrl ? (
                    <div
                      className="random__avatar__color"
                      style={{
                        backgroundColor: getCollectionBackgroundColor(collection),
                      }}
                    >
                      {collection.name.charAt(0)}
                    </div>
                  ) : (
                    <img
                      className="collection__avatar"
                      src={collection.coverUrl}
                      alt={collection.name}
                    />
                  )}
                  <h3 title={collection.name} className="collection__name">
                    {collection.name.length > 13
                      ? `${collection.name.substring(0, 13)}...`
                      : collection.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination__container">
            <SimplePagination
              data={deployedCollections}
              perPage={perPage}
              setOffset={setOffset}
              setPage={setPage}
              page={page}
            />
            <ItemsPerPageDropdown
              perPage={perPage}
              setPerPage={setPerPage}
              itemsPerPage={[8, 16, 32]}
            />
          </div>
        </>
      ) : (
        <div className="empty__nfts">
          <div className="tabs-empty">
            <div className="image-bubble">
              <img src={bubbleIcon} alt="bubble-icon" />
            </div>
            <h3>No collections found</h3>
            <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
            <button
              type="button"
              ref={ref2}
              className={`create--nft--dropdown  ${isDropdownOpened ? 'opened' : ''} light-button`}
              onClick={() => setIsDropdownOpened(!isDropdownOpened)}
              aria-hidden="true"
            >
              Create
              <img src={plusIcon} alt="icon" />
              {isDropdownOpened && (
                <div className="sort__share__dropdown">
                  <ul>
                    <li
                      aria-hidden="true"
                      onClick={() =>
                        history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                      }
                    >
                      NFT
                    </li>
                    <li
                      aria-hidden="true"
                      onClick={() =>
                        history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })
                      }
                    >
                      Collection
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeployedCollections;
