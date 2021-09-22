import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import loadingBg from '../../assets/images/loading-white-background.png';

const LoadingImage = React.memo(({ placeholderImage, realImage, alt, className, style }) => {
  const [loading, setLoading] = useState(true);

  const setLoadingFalse = () => {
    setLoading(false);
  };

  return (
    <div className="loading-image">
      <img
        alt={alt}
        className={className}
        style={style}
        src={loading ? loadingBg || placeholderImage : realImage}
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
    </div>
  );
});

LoadingImage.propTypes = {
  placeholderImage: PropTypes.string,
  realImage: PropTypes.string.isRequired,
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
