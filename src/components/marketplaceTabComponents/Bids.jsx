import React from 'react';
import './MarketplaceTabComponent.scss';
import icon1 from '../../assets/images/collection_img1.svg';
import icon2 from '../../assets/images/collection_img2.svg';
import icon3 from '../../assets/images/collection_img3.svg';
import icon4 from '../../assets/images/collection_img4.svg';
import icon5 from '../../assets/images/collection_img5.svg';

const Bids = () => (
  <div className="marketplace--bids">
    <div className="marketplace--switchbox">
      <label className="switch">
        <input
          type="checkbox"
          // checked={showSocial}
          // onChange={(e) => setShowSocial(e.target.checked)}
        />
        <span className="slider round" />
      </label>
      <h1>Display active only</h1>
    </div>
    <div className="bids--box">
      <div className="box--avatar">
        <img src={icon1} alt="icon1" />
        <div>
          <h1>
            <span>by</span> @dominixz
          </h1>
          <p>2 hours ago</p>
        </div>
      </div>
      <div className="bids--price">
        <h2>0,4 WETH</h2>
        <h3>$208.39</h3>
      </div>
    </div>
    <div className="bids--box box--selected">
      <div className="box--avatar">
        <img src={icon2} alt="icon2" />
        <div>
          <h1>
            <span>by</span> @dominixz
          </h1>
          <p>2 hours ago</p>
        </div>
      </div>
      <div className="bids--price">
        <h2>
          <span>0,37 WETH</span> expired
        </h2>
        <h3>$208.39</h3>
      </div>
    </div>
    <div className="bids--box">
      <div className="box--avatar">
        <img src={icon3} alt="icon3" />
        <div>
          <h1>
            <span>by</span> @Wunderking
          </h1>
          <p>2 hours ago</p>
        </div>
      </div>
      <div className="bids--price">
        <h2>0,4 WETH</h2>
        <h3>$208.39</h3>
      </div>
    </div>
    <div className="bids--box">
      <div className="box--avatar">
        <img src={icon4} alt="icon4" />
        <div>
          <h1>
            <span>by</span> @dominixz
          </h1>
          <p>2 hours ago</p>
        </div>
      </div>
      <div className="bids--price">
        <h2>0,4 WETH</h2>
        <h3>$208.39</h3>
      </div>
    </div>
    <div className="bids--box">
      <div className="box--avatar">
        <img src={icon5} alt="icon5" />
        <div>
          <h1>
            <span>by</span> @The Collector
          </h1>
          <p>2 hours ago</p>
        </div>
      </div>
      <div className="bids--price">
        <h2>0,4 WETH</h2>
        <h3>$208.39</h3>
      </div>
    </div>
  </div>
);
export default Bids;
