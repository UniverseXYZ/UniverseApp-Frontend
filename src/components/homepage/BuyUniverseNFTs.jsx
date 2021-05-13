import React from 'react';
import buyUniverseNFTsImg from '../../assets/images/buy-universe-nft.png';

const BuyUniverseNFTs = () => (
  <div className="buy__universe__nfts__section">
    <div className="buy__universe__nfts__section__container">
      <div>
        <h1 className="title">Buy Universe NFTs</h1>
        <p className="desc">
          The Universe Protocol is a community bootstrapping engine. It&apos;s designed to embed
          community building mechanics into the way you mint and monetize NFTs.
        </p>
        <span className="coming__soon">Coming soon</span>
      </div>
      <div>
        <img
          src={buyUniverseNFTsImg}
          alt="Buy Universe NFTs"
          style={{ minWidth: '280px', maxWidth: '310px' }}
        />
      </div>
    </div>
  </div>
);

export default BuyUniverseNFTs;
