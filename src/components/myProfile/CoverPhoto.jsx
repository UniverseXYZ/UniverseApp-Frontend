import React from 'react';
import PropTypes from 'prop-types';
import defaultCoverPhoto from '../../assets/images/my-profile-cover-photo.png';
import uploadIcon from '../../assets/images/upload.svg';
import './styles/CoverPhoto.scss';

const CoverPhoto = (props) => {
  const { coverPhoto, className, color } = props;
  return (
    <div
      className={`cover--photo ${className}`}
      style={!coverPhoto ? { background: color } : { backgroundImage: `url(${coverPhoto})` }}
    >
      <label htmlFor="upload--input">
        <img src={uploadIcon} alt="img" />
      </label>
      <input type="file" accept="image/png, image/gif, image/jpeg" id="upload--input" />
    </div>
  );
};

CoverPhoto.propTypes = {
  className: PropTypes.string,
  coverPhoto: PropTypes.string,
  color: PropTypes.string,
};

CoverPhoto.defaultProps = {
  className: '',
  coverPhoto: defaultCoverPhoto,
  color: '#D7CCC8',
};

export default CoverPhoto;
