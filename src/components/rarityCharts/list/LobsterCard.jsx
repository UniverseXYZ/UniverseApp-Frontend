import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import LoadingImage from '../../general/LoadingImage';
import lobsterLoadingBg from '../../../assets/images/lobby-lobsters/img_placeholder.png';

const LobsterCard = ({ item }) => {
  const history = useHistory();

  return (
    <div
      className="card"
      onClick={() =>
        history.push(`/nft/${process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS}/${item.id}`)
      }
      aria-hidden="true"
    >
      <div className="card--header">
        <div className="card--number">#???</div>
        <div className="card--price">Rarity Score: ????</div>
      </div>
      <div className="card--body">
        <LoadingImage
          className="rarity--chart"
          src={item.previewImage.url}
          alt={item.name}
          placeholderImage={lobsterLoadingBg}
        />
      </div>
      <div className="card--footer">
        <h2>Lobby Lobster</h2>
        <p>{`ID: #${item.id}`}</p>
      </div>
    </div>
  );
};

LobsterCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LobsterCard;
