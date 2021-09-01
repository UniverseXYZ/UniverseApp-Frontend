import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import bubbleIcon from '../../assets/images/text-bubble.png';
import Button from '../button/Button';
import AppContext from '../../ContextAPI';
import plusIcon from '../../assets/images/PlusIcon.png';

const DeployedCollections = () => {
  const { deployedCollections } = useContext(AppContext);
  const history = useHistory();
  const ref = useRef(null);
  const refMobile = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  return (
    <div className="tab__saved__collections">
      {deployedCollections.length ? (
        <div className="saved__collections__lists">
          {deployedCollections.map((collection) => (
            <div
              className="saved__collection__box"
              key={uuid()}
              aria-hidden="true"
              onClick={() =>
                history.push(`/c/${collection.id}`, {
                  collection,
                  saved: true,
                })
              }
            >
              <div className="saved__collection__box__header">
                {collection.bgImage ? (
                  <img src={URL.createObjectURL(collection.bgImage)} alt={collection.name} />
                ) : typeof collection.coverUrl === 'string' &&
                  collection.coverUrl.startsWith('#') ? (
                  <div
                    className="random__bg__color"
                    style={{ backgroundColor: collection.coverUrl }}
                  />
                ) : (
                  <img className="blur" src={collection.coverUrl} alt={collection.name} />
                )}
              </div>
              <div className="saved__collection__box__body">
                {typeof collection.coverUrl === 'string' && collection.coverUrl.startsWith('#') ? (
                  <div
                    className="random__avatar__color"
                    style={{ backgroundColor: collection.coverUrl }}
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
                {/* <h3 className="collection__name">{collection.name}</h3> */}
                <h3 title={collection.name} className="collection__name">
                  {collection.name.length > 13
                    ? `${collection.name.substring(0, 13)}...`
                    : collection.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty__nfts">
          <div className="tabs-empty">
            <div className="image-bubble">
              <img src={bubbleIcon} alt="bubble-icon" />
            </div>
            <h3>No collections found</h3>
            <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
            <Button
              // className="light-button"
              // onClick={() => history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })}
              ref={ref}
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
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeployedCollections;
