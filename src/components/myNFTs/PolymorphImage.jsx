import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PolymorphImage = ({ src, placeholderImg, errorImg, name }) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);
  const [loading, setLoading] = useState(true);

  const onLoad = useCallback(() => {
    setSrc(src);
    setLoading(false);
  }, [src]);

  const onError = useCallback(() => {
    setSrc(errorImg || placeholderImg);
    setLoading(false);
  }, [errorImg, placeholderImg]);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, onLoad, onError]);

  return (
    <div className="nft__box__image">
      {loading && (
        <div className="loading-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
      <img className="preview-image" alt={name} src={imgSrc} />
    </div>
  );
};

PolymorphImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string]).isRequired,
  placeholderImg: PropTypes.oneOfType([PropTypes.string]).isRequired,
  errorImg: PropTypes.oneOfType([PropTypes.string]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default PolymorphImage;
