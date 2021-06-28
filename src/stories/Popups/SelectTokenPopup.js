import React from 'react';
import Input from '../../components/input/Input';
import closeIcon from '../../assets/images/cross.svg';
import './RemovePopup.scss';
import icon from '../../assets/images/ethereum.svg';
import dai from '../../assets/images/dai.svg';
import usdc from '../../assets/images/usdc.svg';
import bond from '../../assets/images/bond.svg';
import snx from '../../assets/images/snx.svg';

const SelectTokenPopup = () => (
  <div className="select-token">
    <img className="close" src={closeIcon} alt="Close" aria-hidden="true" />
    <ul className="option-list">
      <li className="searchDiv">
        <div>
          <h1>Select a token</h1>
          <Input placeholder="Search name or paste address" className="searchInp" />
        </div>
      </li>
      <li aria-hidden="true">
        <div className="img-name">
          <img alt="icon" src={icon} />
          <span className="dai-name">ETH</span>
        </div>
        <span className="subtitle">Ether</span>
      </li>
      <li aria-hidden="true">
        <div className="img-name">
          <img alt="dai" src={dai} />
          <span className="dai-name">DAI</span>
        </div>
        <span className="subtitle">DAI Stablecoin</span>
      </li>
      <li aria-hidden="true">
        <div className="img-name">
          <img alt="usdc" src={usdc} />
          <span className="dai-name">USDC</span>
        </div>
        <span className="subtitle">USD Coin</span>
      </li>
      <li aria-hidden="true">
        <div className="img-name">
          <img alt="bond" src={bond} />
          <span className="dai-name">BOND</span>
        </div>
        <span className="subtitle">BarnBridge Governance Token</span>
      </li>
      <li aria-hidden="true">
        <div className="img-name">
          <img alt="snx" src={snx} />
          <span className="dai-name">SNX</span>
        </div>
        <span className="subtitle">Synthetix Network Token</span>
      </li>
      <div className="token-div">
        <button type="button" className="light-border-button add-token">
          Add token
        </button>
      </div>
    </ul>
  </div>
);
export default SelectTokenPopup;
