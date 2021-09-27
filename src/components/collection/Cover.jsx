import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import uploadIcon from '../../assets/images/upload.svg';
import { editCollectionBanner } from '../../utils/api/mintNFT';
import { useAuthContext } from '../../contexts/AuthContext';
import { getCollectionBackgroundColor } from '../../utils/helpers';

const Cover = ({ selectedCollection }) => {
  const { deployedCollections, setDeployedCollections } = useAuthContext();
  const ref = useRef(null);
  const [bgImage, setBgImage] = useState(selectedCollection.bgImage);
  const [imageUploadError, setError] = useState('');

  const onInputChange = async (e) => {
    if (e.target.files[0]) {
      const res = await editCollectionBanner(e.target.files[0], selectedCollection.id);

      if (!res.message) {
        setError('');
        setBgImage(e.target.files[0]);
        setDeployedCollections(
          deployedCollections.map((item) =>
            item.id === selectedCollection.id
              ? {
                  ...res,
                }
              : item
          ) || []
        );
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="collection__page__cover">
      <p className="image-upload-error">{imageUploadError}</p>
      <div className="upload" onClick={() => ref.current.click()} aria-hidden="true">
        <img src={uploadIcon} alt="Upload" />
        <input type="file" className="inp-disable" ref={ref} onChange={onInputChange} />
      </div>
      {bgImage ? (
        <img className="bg" src={URL.createObjectURL(bgImage)} alt={selectedCollection.name} />
      ) : !selectedCollection.bannerUrl && selectedCollection.coverUrl ? (
        <>
          <img
            className="bg blur"
            src={selectedCollection.coverUrl}
            alt={selectedCollection.name}
          />
          <div className="blured" />
        </>
      ) : selectedCollection.bannerUrl ? (
        <img className="bg" src={selectedCollection.bannerUrl} alt={selectedCollection.name} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: getCollectionBackgroundColor(selectedCollection),
          }}
        />
      )}
    </div>
  );
};

Cover.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Cover;
