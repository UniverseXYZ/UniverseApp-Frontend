/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './corouselForNfts.scss';
import './WinnerNFTs.scss';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import WinnerNft from '../winnerNft/WinnerNft';

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

const CarouselForNfts = ({ winnersData, onRemoveEdition }) => {
  const settings = {
    dots: true,
    infinite: winnersData.length && winnersData.length > 2,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
  };
  return (
    <div className="carousel img-div">
      <Slider {...settings}>
        {winnersData.map((winner) => {
          const result = winner.nftsData.reduce((res, curr) => {
            if (!res[curr.name])
              res[curr.name] = {
                tokenIds: [],
                url: curr.url,
                artworkType: curr.artworkType,
                count: 0,
              };

            res[curr.name].tokenIds.push(curr.tokenId);
            res[curr.name].count += 1;
            return res;
          }, {});
          return (
            <div className="winner-block">
              <div className="title-winner">Winner #{winner.slot + 1}</div>
              {Object.values(result).length ? (
                Object.values(result).map((nft) => (
                  <WinnerNft key={uuid()} nft={nft} onRemoveEdition={onRemoveEdition} />
                ))
              ) : (
                <div className="placeholder-winners" key={uuid()} />
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default CarouselForNfts;
