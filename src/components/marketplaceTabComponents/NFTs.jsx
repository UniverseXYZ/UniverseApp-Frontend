import React from 'react';
import './MarketplaceTabComponent.scss';
import img1 from '../../assets/images/nftimg.svg';
import cover1 from '../../assets/images/collection_nft.svg';

const NFTs = () => (
  <div className="marketplace--nft">
    <div className="marketplace--nft--box">
      <div className="image--box">
        <img src={img1} alt="images" />
        <div className="info--box">
          <h1>Tribal Deer</h1>
          <div>
            <img src={cover1} alt="cover" />
            <p>Zelad</p>
          </div>
        </div>
      </div>
      <div className="count">
        <h2>x1</h2>
      </div>
    </div>
    <div className="marketplace--nft--box">
      <div className="image--box">
        <img src={img1} alt="images" />
        <div className="info--box">
          <h1>Tribal Deer</h1>
          <div>
            <img src={cover1} alt="cover" />
            <p>Zelad</p>
          </div>
        </div>
      </div>
      <div className="count">
        <h2>x1</h2>
      </div>
    </div>
    <div className="marketplace--nft--box">
      <div className="image--box">
        <img src={img1} alt="images" />
        <div className="info--box">
          <h1>Tribal Deer</h1>
          <div>
            <img src={cover1} alt="cover" />
            <p>Zelad</p>
          </div>
        </div>
      </div>
      <div className="count">
        <h2>x1</h2>
      </div>
    </div>
    <div className="marketplace--nft--box">
      <div className="image--box">
        <img src={img1} alt="images" />
        <div className="info--box">
          <h1>Tribal Deer</h1>
          <div>
            <img src={cover1} alt="cover" />
            <p>Zelad</p>
          </div>
        </div>
      </div>
      <div className="count">
        <h2>x1</h2>
      </div>
    </div>
  </div>
);
export default NFTs;
