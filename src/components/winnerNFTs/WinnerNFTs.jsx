/* eslint-disable react/prop-types */
import React from 'react';
import './WinnerNFTs.scss';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import WinnerNft from '../winnerNft/WinnerNft';

const WinnerNFTs = ({ winnersData, sliderSettings }) => {
  console.info(winnersData);
  return (
    <div className="carousel img-div">
      <Slider {...sliderSettings}>
        {winnersData.map((winner) => (
          <div className="winner-block">
            <div className="title-winner">Winner #{winner.slot}</div>
            {winner.nftsData?.length ? (
              winner.nftsData?.map((nft) => <WinnerNft nft={nft} />)
            ) : (
              <div className="placeholder-winners" key={uuid()} />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WinnerNFTs;
