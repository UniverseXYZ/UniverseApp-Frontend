import React, { useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import uploadIcon from '../../assets/images/upload.svg';
import AppContext from '../../ContextAPI';
import { editCollectionBanner } from '../../utils/api/mintNFT';

const Cover = ({ selectedCollection }) => {
  const { deployedCollections, setDeployedCollections } = useContext(AppContext);
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
      ) : typeof selectedCollection.bannerUrl === 'string' &&
        selectedCollection.bannerUrl.startsWith('#') ? (
        <div
          className="random__bg__color"
          style={{ backgroundColor: selectedCollection.bannerUrl }}
        />
      ) : (
        <>
          <img
            className="bg blur"
            src={selectedCollection.bannerUrl}
            alt={selectedCollection.name}
          />
          <div className="blured" />
        </>
      )}
    </div>
  );
};

Cover.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Cover;
