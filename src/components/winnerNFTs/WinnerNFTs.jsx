import React from 'react';
import './WinnerNFTs.scss';
import PropTypes from 'prop-types';
import mp3Icon from '../../assets/images/mp3-icon.png';
import WinnerNft from '../winnerNft/WinnerNft';

const WinnerNFTs = ({ data, winnersData, winners }) => (
  <>
    {winners.map((winner) => (
      <div className="winner-block">
        <div className="title-winner">Winner #{winner.winner}</div>
        {data.map((nft) => {
          if (nft.winner === winner.winnerName) {
            return <WinnerNft nft={nft} />;
          }
          return '';
        })}
      </div>
    ))}
  </>
);

WinnerNFTs.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winnersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winners: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default WinnerNFTs;
