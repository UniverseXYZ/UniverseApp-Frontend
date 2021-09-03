import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import PolymorphImage from './PolymorphImage';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';

const PolymorphCard = ({ polymorph }) => {
  const history = useHistory();

  return (
    <div
      key={uuid()}
      className="nft__box"
      aria-hidden="true"
      onClick={() => {
        history.push(`/polymorphs/${polymorph.id}`);
      }}
    >
      <PolymorphImage
        name={polymorph.name}
        placeholderImg={loadingBg}
        errorImg={loadingBg}
        src={polymorph.previewImage.url}
        tokenId={polymorph.id}
      />

      <div className="polymorph">
        <p>{polymorph.name}</p>
      </div>
      <div className="nft_box_footer">
        <img alt="fjffd" src={polymorph.collectionAvatar} />
        <p>{polymorph.collectionName}</p>
      </div>
    </div>
  );
};

PolymorphCard.propTypes = {
  polymorph: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PolymorphCard;
