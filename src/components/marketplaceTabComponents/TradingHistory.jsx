import React from 'react';
import './MarketplaceTabComponent.scss';
import icon1 from '../../assets/images/Sales.svg';
import icon2 from '../../assets/images/Bid.svg';
import icon3 from '../../assets/images/Mint.svg';
import icon4 from '../../assets/images/Sales2.svg';
import icon5 from '../../assets/images/Listing.svg';
import share from '../../assets/images/etherscanicon.svg';

const TradingHistory = () => (
  <div className="trading">
    <div className="trading--box">
      <div className="trading--avatar">
        <img src={icon1} alt="icon1" />
        <div>
          <h1>
            <span> Put on sale by</span> @Cryptopo...
          </h1>
          <p>2 days ago</p>
        </div>
      </div>
      <div className="tradinghistory--price">
        <div className="price">
          <h2>0,05 WETH</h2>
          <h3>$208.39</h3>
        </div>
        <div className="shareicon">
          <img src={share} alt="share1" />
          <span className="tooltiptext">View on Etherscan</span>
        </div>
      </div>
    </div>
    <div className="trading--box">
      <div className="trading--avatar">
        <img src={icon2} alt="icon2" />
        <div>
          <h1>
            <span> Bought by </span>@dominixz
          </h1>
          <p>2 days ago</p>
        </div>
      </div>
      <div className="tradinghistory--price">
        <div className="price">
          <h2>0,05 WETH</h2>
          <h3>$208.39</h3>
        </div>
        <div className="shareicon">
          <img src={share} alt="share" />
          <span className="tooltiptext">View on Etherscan</span>
        </div>
      </div>
    </div>
    <div className="trading--box">
      <div className="trading--avatar">
        <img src={icon3} alt="icon3" />
        <div>
          <h1>
            <span>Minted by</span> @CryptoX
          </h1>
          <p>2 days ago</p>
        </div>
      </div>
      <div className="tradinghistory--price">
        <div className="price">
          <h2>0,05 WETH</h2>
          <h3>$208.39</h3>
        </div>
        <div className="shareicon">
          <img src={share} alt="share" />
          <span className="tooltiptext">View on Etherscan</span>
        </div>
      </div>
    </div>
    <div className="trading--box">
      <div className="trading--avatar">
        <img src={icon4} alt="icon4" />
        <div>
          <h1>
            <span>Listed by</span> @CryptoCartel
          </h1>
          <p>2 days ago</p>
        </div>
      </div>
      <div className="tradinghistory--price">
        <div className="price">
          <h2>0,05 WETH</h2>
          <h3>$208.39</h3>
        </div>
        <div className="shareicon">
          <img src={share} alt="share" />
          <span className="tooltiptext">View on Etherscan</span>
        </div>
      </div>
    </div>
    <div className="trading--box">
      <div className="trading--avatar">
        <img src={icon5} alt="icon5" />
        <div>
          <h1>
            <span>Put on sale by</span> @Cryptopo...
          </h1>
          <p>
            2 days ago <span>(expired)</span>
          </p>
        </div>
      </div>
      <div className="tradinghistory--price">
        <div className="price">
          <h2>0,05 WETH</h2>
          <h3>$208.39</h3>
        </div>
        <div className="shareicon">
          <img src={share} alt="share" />
          <span className="tooltiptext">View on Etherscan</span>
        </div>
      </div>
    </div>
  </div>
);
export default TradingHistory;
