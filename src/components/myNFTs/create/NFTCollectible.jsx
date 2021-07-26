import React, { useState, useRef } from 'react';
import Button from '../../button/Button.jsx';
import Input from '../../input/Input.jsx';
import uploadIcon from '../../../assets/images/ion_cloud.svg';
import closeIcon from '../../../assets/images/close-menu.svg';
import infoIcon from '../../../assets/images/icon.svg';

const NFTCollectible = () => {
  const inputFile = useRef(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editions, setEditions] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);

  const [clicked, setClicked] = useState(false);
  const [hideIcon, setHideIcon] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    edition: '',
    previewImage: '',
  });

  const validateFile = (file) => {
    setClicked(false);
    if (!file) {
      setPreviewImage(null);
      setErrors({
        ...errors,
        previewImage: 'File format must be PNG, JPEG, GIF, WEBP or MP4 (Max Size: 30mb)',
      });
    } else if (
      (file.type === 'video/mp4' ||
        file.type === 'image/webp' ||
        file.type === 'image/gif' ||
        file.type === 'image/png') &&
      file.size / 1048576 < 30
    ) {
      setPreviewImage(file);
      setErrors({ ...errors, previewImage: '' });
    } else {
      setPreviewImage(null);
      setErrors({
        ...errors,
        previewImage: 'File format must be PNG, JPEG, GIF, WEBP or MP4 (Max Size: 30mb)',
      });
    }
  };

  const validateEdition = (e) => {
    const value = e.target.value.replace(/[^\d]/, '');
    if (parseInt(value, 10) !== 0) {
      setEditions(value);
    }
  };

  return (
    <div className="create--nft--for--collection--page">
      <div className="upload--file--section">
        <h3>Upload file</h3>
        <div className="dropzone">
          {!previewImage ? (
            <div className="image--not--selected">
              <img src={uploadIcon} alt="Upload" />
              <p>
                Drop your file here <br /> (min 800x800px, PNG/JPEG/GIF/WEBP/MP4, max 30mb)
              </p>
              <Button className="light-button" onClick={() => inputFile.current.click()}>
                Choose file
              </Button>
              <input
                type="file"
                ref={inputFile}
                onChange={(e) => validateFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="image--selected">
              <img className="cover" src={URL.createObjectURL(previewImage)} alt="NFT" />
              <div
                className="remove--selected--image"
                onClick={() => setPreviewImage(null)}
                aria-hidden="true"
              >
                <img src={closeIcon} alt="Close" />
              </div>
            </div>
          )}
        </div>
        {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
        <div className="nft--name">
          <Input
            label="Name"
            className="inp"
            error={errors.name}
            placeholder="Enter NFT name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="nft--description">
          <label>Description (optional)</label>
          <textarea
            placeholder="Spread some words about your NFT"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="nft-coll-editions">
          <div className="nft-coll-editions-header">
            <label
              onMouseOver={() => setHideIcon(true)}
              onFocus={() => setHideIcon(true)}
              onMouseLeave={() => setHideIcon(false)}
              onBlur={() => setHideIcon(false)}
            >
              Number of Editions <img src={infoIcon} alt="Info Icon" />
            </label>
            {hideIcon && (
              <div className="info-text">
                <p>
                  Total amount of NFTs that will be distributed to the current reward tier winners.
                </p>
              </div>
            )}
          </div>
          <Input
            error={errors.edition}
            placeholder="Enter Number of Editions"
            onChange={validateEdition}
            value={editions}
          />
        </div>
      </div>
    </div>
  );
};

export default NFTCollectible;
