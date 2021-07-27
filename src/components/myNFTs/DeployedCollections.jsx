import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import AppContext from '../../ContextAPI';

const DeployedCollections = () => {
  const { deployedCollections } = useContext(AppContext);
  const history = useHistory();

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
                history.push(`/c/${collection.id.toLowerCase().replace(' ', '-')}`, {
                  collection,
                  saved: false,
                })
              }
            >
              <div className="saved__collection__box__header">
                {collection.bgImage ? (
                  <img src={URL.createObjectURL(collection.bgImage)} alt={collection.name} />
                ) : typeof collection.previewImage === 'string' &&
                  collection.previewImage.startsWith('#') ? (
                  <div
                    className="random__bg__color"
                    style={{ backgroundColor: collection.previewImage }}
                  />
                ) : (
                  <img
                    className="blur"
                    src={
                      collection.previewImage
                        ? URL.createObjectURL(collection.previewImage)
                        : collection.previewImageMock
                    }
                    alt={collection.name}
                  />
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
                    src={
                      collection.previewImage
                        ? URL.createObjectURL(collection.previewImage)
                        : collection.previewImageMock
                    }
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

export default DeployedCollections;
