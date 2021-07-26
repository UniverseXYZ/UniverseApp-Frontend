import React from 'react';
import './MarketplaceTabComponent.scss';
import offers1 from '../../assets/images/offers1.svg';
import offers2 from '../../assets/images/offers2.svg';
import offers3 from '../../assets/images/offers3.svg';
import offers4 from '../../assets/images/offers4.svg';
import offers5 from '../../assets/images/offers5.svg';
import Button from '../button/Button';

const Offers = () => (
  <div className="marketplace--offers">
    <div className="offers--first--box">
      <div className="offers--first">
        <div className="box-offers-avatar">
          <img src={offers1} alt="icon1" />
          <div>
            <h1>
              <span>from</span> dominixz
            </h1>
            <p>Expires in 2 hours</p>
          </div>
        </div>
        <div className="offers--price">
          <h2>0,3 WETH</h2>
          <h3>$208.39</h3>
        </div>
      </div>
      <div className="offers--button--box">
        <button type="button" className="light-button">
          Accept
        </button>
      </div>
    </div>
    <div className="offers--box">
      <div className="box-offers-avatar">
        <img src={offers2} alt="icon2" />
        <div>
          <h1>
            <span>from</span> meemaster
          </h1>
          <p>Never expires</p>
        </div>
      </div>
      <div className="offers--price">
        <h2>0,2 WETH</h2>
        <h3>$208.39</h3>
      </div>
    </div>
    <div className="offers--box">
      <div className="box-offers-avatar">
        <img src={offers3} alt="icon3" />
        <div>
          <h1>
            <span>from</span> AFF40E
          </h1>
          <p>Expires in 2 hours</p>
        </div>
      </div>
      <div className="offers--price">
        <h2>0,09 WETH</h2>
        <h3>$208.39</h3>
      </div>
    </div>
    <div className="offers--box">
      <div className="box-offers-avatar">
        <img src={offers4} alt="icon4" />
        <div>
          <h1>
            <span>from</span> dominixz
          </h1>
          <p>Expires in 2 hours</p>
        </div>
      </div>
      <div className="offers--price">
        <h2>0,4 WETH</h2>
        <h3>$208.39</h3>
      </div>
    </div>
    <div className="offers--box">
      <div className="box-offers-avatar">
        <img src={offers5} alt="icon5" />
        <div>
          <h1>
            <span>from</span> dominixz
          </h1>
          <p className="red--title">Expired</p>
        </div>
      </div>
      <div className="offers--price">
        <h2>0,4 WETH</h2>
        <h3>$208.39</h3>
      </div>
    </div>
  </div>
);
export default Offers;
