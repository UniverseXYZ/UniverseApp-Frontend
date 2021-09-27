import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loadingBg from '../../assets/images/loading-white-background.png';

const LoadingImage = React.memo(({ placeholderImage, src, alt, className, style }) => {
  const [loading, setLoading] = useState(true);

  const setLoadingFalse = () => {
    setLoading(false);
  };

  return (
    <>
      <img
        alt={alt}
        className={className}
        style={style}
        src={loading ? placeholderImage || loadingBg : src}
        onLoad={setLoadingFalse}
      />
      {loading ? (
        <div className="card-lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

LoadingImage.propTypes = {
  placeholderImage: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.oneOfType(PropTypes.object),
};

LoadingImage.defaultProps = {
  className: '',
  style: {},
  placeholderImage: '',
};

export default LoadingImage;
