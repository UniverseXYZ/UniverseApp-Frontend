import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import LobsterImage from './LobsterImage';
import loadingBg from '../../assets/images/lobby-lobsters/img_placeholder.png';

const LobsterCard = ({ lobster }) => {
  const history = useHistory();

  return (
    <div
      key={uuid()}
      className="nft__box"
      aria-hidden="true"
      onClick={() => {
        history.push(`/lobsters/${lobster.id}`);
      }}
    >
      <LobsterImage
        name={lobster.name}
        placeholderImg={loadingBg}
        errorImg={loadingBg}
        src={lobster.previewImage.url}
        tokenId={lobster.id}
      />

      <div className="polymorph">
        <p>{lobster.name}</p>
      </div>
      <div className="nft_box_footer">
        <img alt="fjffd" src={lobster.collectionAvatar} />
        <p>{lobster.collectionName}</p>
      </div>
    </div>
  );
};

LobsterCard.propTypes = {
  lobster: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LobsterCard;
