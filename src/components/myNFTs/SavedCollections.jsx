import React, { useState, useEffect, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import RemovePopup from '../popups/RemoveNftPopup.jsx';

const SavedCollections = () => {
  const { savedCollections, setSavedCollectionID, setActiveView, setShowModal } = useContext(
    AppContext
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const ref = useRef(null);
  const history = useHistory();

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('three__dots')) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (document.getElementById('popup-root')) {
          if (!document.getElementById('popup-root').hasChildNodes()) {
            setShowDropdown(false);
          }
        } else {
          setShowDropdown(false);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const handleEdit = (id) => {
    document.body.classList.add('no__scroll');
    setSavedCollectionID(id);
    setActiveView('collection');
    setShowModal(true);
  };

  return (
    <div className="tab__saved__collections">
      {savedCollections.length ? (
        <div className="saved__collections__lists">
          {savedCollections.map((collection) => (
            <div
              className="saved__collection__box"
              key={uuid()}
              aria-hidden="true"
              onClick={() =>
                history.push(`/c/${collection.id.toLowerCase().replace(' ', '-')}`, {
                  collection,
                  saved: true,
                })
              }
            >
              <div className="saved__collection__box__header">
                {typeof collection.previewImage === 'string' &&
                collection.previewImage.startsWith('#') ? (
                  <div
                    className="random__bg__color"
                    style={{ backgroundColor: collection.previewImage }}
                  />
                ) : (
                  <img src={URL.createObjectURL(collection.previewImage)} alt={collection.name} />
                )}
              </div>
              <div className="saved__collection__box__body">
                {typeof collection.previewImage === 'string' &&
                collection.previewImage.startsWith('#') ? (
                  <div
                    className="random__avatar__color"
                    style={{ backgroundColor: collection.previewImage }}
                  >
                    {collection.name.charAt(0)}
                  </div>
                ) : (
                  <img
                    className="collection__avatar"
                    src={URL.createObjectURL(collection.previewImage)}
                    alt={collection.name}
                  />
                )}
                <h3 className="collection__name">{collection.name}</h3>
                <button
                  type="button"
                  className="three__dots"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                    setDropdownID(collection.id);
                  }}
                >
                  <span />
                  <span />
                  <span />
                  {dropdownID === collection.id && showDropdown && (
                    <ul ref={ref} className="edit__remove">
                      <li
                        className="edit"
                        onClick={() => handleEdit(collection.id)}
                        aria-hidden="true"
                      >
                        <p>Edit</p>
                        <img src={editIcon} alt="Edit Icon" />
                      </li>
                      <Popup
                        trigger={
                          <li className="remove">
                            <p>Remove</p>
                            <img src={removeIcon} alt="Remove Icon" />
                          </li>
                        }
                      >
                        {(close) => (
                          <RemovePopup
                            close={close}
                            nftID={collection.id}
                            removedItemName={collection.name}
                            removeFrom="savedCollection"
                          />
                        )}
                      </Popup>
                    </ul>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty__nfts">
          <h3>No Saved Collections found</h3>
        </div>
      )}
    </div>
  );
};

export default SavedCollections;
