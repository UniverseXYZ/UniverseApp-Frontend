import React from 'react';
import './MarketplaceTabComponent.scss';
import image1 from '../../assets/images/collection_img (3).svg';
import image2 from '../../assets/images/collection_img (4).svg';
import image3 from '../../assets/images/collection_img (6).svg';
import image4 from '../../assets/images/collection_img (7).svg';
import image5 from '../../assets/images/collection_img (8).svg';
import Button from '../button/Button.jsx';

const Owners = () => (
  <div className="marketplace--owners">
    <div className="border">
      <img src={image1} alt="icon1" />
      <div className="sale-box">
        <h1>RedPixelOrganicholas</h1>
        <p>
          2/2 on sale for <span>0.341 ETH</span> each
        </p>
      </div>
      <div className="border-box">
        <p>LOWEST ASK</p>
      </div>
      <div className="button-box">
        <Button className="light-button">Buy</Button>
      </div>
    </div>
    <div>
      <img src={image2} alt="icon2" />
      <div className="sale-box">
        <h1>The Collector</h1>
        <p>
          2 editions <span>not for sale</span>
        </p>
      </div>
    </div>
    <div>
      <img src={image3} alt="icon3" />
      <div className="sale-box">
        <h1>RedPixelOrganicholas</h1>
        <p>
          2/2 on sale for <span>0.341 ETH</span> each
        </p>
      </div>
      <div className="button-box">
        <Button className="light-button">Buy</Button>
      </div>
    </div>
    <div>
      <img src={image4} alt="icon4" />
      <div className="sale-box">
        <h1>Roger Kilimanjaro</h1>
        <p>
          2/2 on sale for <span>0.341 ETH</span> each
        </p>
      </div>
      <div className="button-box">
        <Button className="light-button">Buy</Button>
      </div>
    </div>
    <div>
      <img src={image5} alt="icon5" />
      <div className="sale-box">
        <h1>The Collector</h1>
        <p>
          2/2 on sale for <span>0.341 ETH</span> each
        </p>
      </div>
      <div className="button-box">
        <Button className="light-button">Buy</Button>
      </div>
    </div>
  </div>
);
export default Owners;
