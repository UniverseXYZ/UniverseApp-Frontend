import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import uploadIcon from '../../assets/images/upload.svg';
import { editCollectionBanner } from '../../utils/api/mintNFT';
import { useAuthContext } from '../../contexts/AuthContext';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';

const Cover = ({ selectedCollection, collectionGeneralInfo, collectionOwner }) => {
  const { isAuthenticated, address } = useAuthContext();
  const { setMyMintableCollections, myMintableCollections } = useMyNftsContext();
  const ref = useRef(null);
  const [bgImage, setBgImage] = useState(selectedCollection?.bgImage);
  const [imageUploadError, setError] = useState('');

  const onInputChange = async (e) => {
    if (e.target.files[0]) {
      const res = await editCollectionBanner(e.target.files[0], selectedCollection.address);

      if (!res.message) {
        setError('');
        setBgImage(e.target.files[0]);
        const updatedCollections =
          myMintableCollections.map((item) =>
            item.id === selectedCollection.id
              ? {
                  ...res,
                }
              : item
          ) || [];

        setMyMintableCollections(updatedCollections);
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="collection__page__cover">
      {isAuthenticated &&
        (address?.toLowerCase() === collectionOwner ||
          process.env.REACT_APP_COLLECTION_EDITOR?.toLowerCase() === address) && ( //
          <>
            <p className="image-upload-error">{imageUploadError}</p>
            <div className="upload" onClick={() => ref.current.click()} aria-hidden="true">
              <img src={uploadIcon} alt="Upload" />
              <input type="file" className="inp-disable" ref={ref} onChange={onInputChange} />
            </div>
          </>
        )}
      {bgImage ? (
        <img className="bg" src={URL.createObjectURL(bgImage)} alt={selectedCollection.name} />
      ) : !selectedCollection?.bannerUrl && selectedCollection?.coverUrl ? (
        <>
          <img
            className="bg blur"
            src={selectedCollection.coverUrl}
            alt={selectedCollection.name}
          />
          <div className="blured" />
        </>
      ) : selectedCollection?.bannerUrl ? (
        <img className="bg" src={selectedCollection.bannerUrl} alt={selectedCollection.name} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: getCollectionBackgroundColor(
              selectedCollection || collectionGeneralInfo
            ),
          }}
        />
      )}
      <div className="transparent-dark-background" />
    </div>
  );
};

Cover.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]),
  collectionGeneralInfo: PropTypes.oneOfType([PropTypes.object]),
  collectionOwner: PropTypes.string,
};

Cover.defaultProps = {
  selectedCollection: {},
  collectionGeneralInfo: {},
  collectionOwner: '',
};

export default Cover;
