import React, { useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import uploadIcon from '../../assets/images/upload.svg';
import AppContext from '../../ContextAPI';

const Cover = ({ selectedCollection }) => {
  const { deployedCollections, setDeployedCollections } = useContext(AppContext);
  const ref = useRef(null);
  const [bgImage, setBgImage] = useState(selectedCollection.bgImage);

  const onInputChange = (e) => {
    if (e.target.files[0]) {
      setBgImage(e.target.files[0]);
      setDeployedCollections(
        deployedCollections.map((item) =>
          item.id === selectedCollection.id
            ? {
                ...item,
                bgImage: e.target.files[0],
              }
            : item
        )
      );
    }
  };

  return (
    <div className="collection__page__cover">
      <div className="upload" onClick={() => ref.current.click()} aria-hidden="true">
        <img src={uploadIcon} alt="Upload" />
        <input type="file" className="inp-disable" ref={ref} onChange={onInputChange} />
      </div>
      {bgImage ? (
        <img className="bg" src={URL.createObjectURL(bgImage)} alt={selectedCollection.name} />
      ) : typeof selectedCollection.previewImage === 'string' &&
        selectedCollection.previewImage.startsWith('#') ? (
        <div
          className="random__bg__color"
          style={{ backgroundColor: selectedCollection.previewImage }}
        />
      ) : (
        <>
          <img
            className="bg blur"
            src={URL.createObjectURL(selectedCollection.previewImage)}
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
