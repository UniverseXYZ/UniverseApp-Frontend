import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import loadingBg from '../../assets/images/loading-white-background.png';
import './LoadingImage.scss';

const LoadingImage = React.memo(({ placeholderImage, src, alt, className, showSpinner, style }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const setLoadingFalse = () => {
    setLoading(false);
  };

  const setErrorFlag = () => {
    setHasError(true);
    setLoading(false);
  };

  useEffect(
    () => () => {
      setLoading(true);
    },
    []
  );

  return hasError ? (
    <div className="error-text">
      <p>Image couldn&apos;t be loaded.</p>
      <p>We&apos;ll do our best to fix that soon.</p>
    </div>
  ) : (
    <>
      <img
        alt={alt}
        className={className}
        style={style}
        src={loading ? placeholderImage || loadingBg : src}
        onLoad={setLoadingFalse}
        onError={setErrorFlag}
      />
      {loading && showSpinner ? (
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
  showSpinner: PropTypes.bool,
};

LoadingImage.defaultProps = {
  className: '',
  style: {},
  placeholderImage: '',
  showSpinner: false,
};

export default LoadingImage;
