import React from 'react';
import './MarketplaceTabComponent.scss';
import image1 from '../../assets/images/collection_img (3).svg';
import image2 from '../../assets/images/collection_img (4).svg';
import image3 from '../../assets/images/collection_img (6).svg';
import image4 from '../../assets/images/collection_img (7).svg';
import image5 from '../../assets/images/collection_img (8).svg';

const Owners = () => (
  <div className="marketplace--owners">
    <div>
      <img src={image1} alt="icon1" />
      <div>
        <h1>On sale · RedPixelOrganicholas</h1>
        <p>2 editions</p>
      </div>
    </div>
    <div>
      <img src={image2} alt="icon2" />
      <div>
        <h1>On sale · The Collector</h1>
        <p>1 editions</p>
      </div>
    </div>
    <div>
      <img src={image3} alt="icon3" />
      <div>
        <h1>On sale · RedPixelOrganicholas</h1>
        <p>2 editions</p>
      </div>
    </div>
    <div>
      <img src={image4} alt="icon4" />
      <div>
        <h1>Not for sale · Roger Kilimanjaro</h1>
        <p>1 editions</p>
      </div>
    </div>
    <div>
      <img src={image5} alt="icon5" />
      <div>
        <h1>On sale · The Collector</h1>
        <p>1 editions</p>
      </div>
    </div>
  </div>
);
export default Owners;
