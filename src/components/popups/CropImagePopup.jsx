import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import Button from '../button/Button';
import closeIcon from '../../assets/images/cross.svg';

const CropImagePopup = (props) => {
  const { onClose, image, title } = props;
  const [imageURL, setImageURL] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropedArea, setCropedArea] = useState(null);
  const [cropedAreaPixels, setCropedAreaPixels] = useState(null);
  useEffect(() => {
    const url = URL.createObjectURL(image);
    setImageURL(url);
  }, [image]);
  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    setCropedArea(croppedArea);
    setCropedAreaPixels(croppedAreaPixels);
  };

  const cropped = () => {
    console.log(cropedAreaPixels, cropedArea);
  };

  return (
    <div className="crop--image--popup--parent">
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
      <h5 className="title">{title}</h5>
      <div className="cropper--section">
        <Cropper
          image={imageURL}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{ containerStyle: { background: 'rgba(255,255,255,1)' } }}
          cropShape="round"
          cropSize={{ width: 220, height: 220 }}
          showGrid={false}
          objectFit="horizontal-cover"
        />
      </div>
      <div className="range--slider">
        <input
          type="range"
          value={zoom}
          onChange={(e) => setZoom(+e.target.value)}
          min={1}
          max={3}
          step={0.1}
        />
      </div>
      <div className="crop--btn--group">
        <Button className="light-border-button" onClick={onClose}>
          Cancel
        </Button>
        <Button className="light-button" onClick={() => cropped()}>
          Crop photo
        </Button>
      </div>
    </div>
  );
};

CropImagePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  title: PropTypes.string,
};

CropImagePopup.defaultProps = {
  title: '',
};

export default CropImagePopup;
