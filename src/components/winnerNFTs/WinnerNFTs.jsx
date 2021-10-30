/* eslint-disable react/prop-types */
import React from 'react';
import './WinnerNFTs.scss';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import mp3Icon from '../../assets/images/mp3-icon.png';
import WinnerNft from '../winnerNft/WinnerNft';

const WinnerNFTs = ({ data, winnersData, winners, sliderSettings }) => (
  <Slider {...sliderSettings}>
    {winners.map((winner) => {
      if (data.find((a) => a.winner === winner.winnerName)) {
        return (
          <div className="winner-block">
            <div className="title-winner">Winner #{winner.winnerName}</div>
            {data.map((nft) => {
              if (nft.winner === winner.winnerName) {
                return <WinnerNft nft={nft} data={data} />;
              }
              return '';
            })}
          </div>
        );
      }
      return (
        <div className="winner-block">
          <div className="title-winner">Winner #{winner.winnerName}</div>
          <div className="placeholder-winners" key={uuid()} />
        </div>
      );
    })}
  </Slider>
);
WinnerNFTs.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winnersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winners: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default WinnerNFTs;
