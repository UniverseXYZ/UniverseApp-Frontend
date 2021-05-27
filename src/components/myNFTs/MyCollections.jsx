import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import AppContext from '../../ContextAPI';

const MyCollections = () => {
  const { myCollections } = useContext(AppContext);
  const history = useHistory();

  return (
    <div className="tab__saved__collections">
      {myCollections.length ? (
        <div className="saved__collections__lists">
          {myCollections.map((collection) => (
            <div
              className="saved__collection__box"
              key={uuid()}
              aria-hidden="true"
              onClick={() =>
                history.push(`/c/${collection.id.toLowerCase().replace(' ', '-')}`, {
                  collection,
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty__nfts">
          <h3>No Collection found</h3>
        </div>
      )}
    </div>
  );
};

export default MyCollections;
