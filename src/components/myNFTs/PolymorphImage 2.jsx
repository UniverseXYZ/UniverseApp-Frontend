import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import neverScrambledIcon from '../../assets/images/never-scrambled-badge.svg';
import singleTraitScrambledIcon from '../../assets/images/single-trait-scrambled-badge.svg';
import { polymorphScrambleHistory } from '../../utils/graphql/queries';
import { getScrambleStatus } from '../../utils/helpers/polymorphs';

const PolymorphImage = ({ src, placeholderImg, errorImg, name, tokenId }) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);
  const [loading, setLoading] = useState(true);
  const [scrambled, setScrambled] = useState('none');
  const { data } = useQuery(polymorphScrambleHistory(tokenId));

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

  useEffect(() => {
    if (data) {
      setScrambled(getScrambleStatus(data.tokenMorphedEntities));
    }
  }, [data]);

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

      {scrambled && scrambled === 'never' ? (
        <div className="never-scrambled">
          <img alt="Never scrambled badge" src={neverScrambledIcon} />
          <span className="tooltiptext">Never scrambled</span>
        </div>
      ) : (
        <></>
      )}
      {scrambled && scrambled === 'single' ? (
        <div className="single-trait-scrambled">
          <img alt="Single trait scrambled badge" src={singleTraitScrambledIcon} />
          <span className="tooltiptext">Single trait scrambled</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

PolymorphImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string]).isRequired,
  placeholderImg: PropTypes.oneOfType([PropTypes.string]).isRequired,
  errorImg: PropTypes.oneOfType([PropTypes.string]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string]).isRequired,
  tokenId: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default PolymorphImage;
