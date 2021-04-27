import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Animated } from 'react-animated-css';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import arrow from '../../assets/images/arrow.svg';
import AppContext from '../../ContextAPI';
import Input from '../input/Input';
import infoIcon from '../../assets/images/icon.svg';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../button/Button';
import ethIcon from '../../assets/images/bid_icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';
import arrowDown from '../../assets/images/arrow-down.svg';

const AuctionSettings = () => {
  const location = useLocation();
  const history = useHistory();
  const { auction, setAuction } = useContext(AppContext);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideIcon2, setHideIcon2] = useState(false);
  const [openList, setOpenList] = useState(true);
  const [minBid, setMinBId] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [bidtype, setBidtype] = useState('eth');

  const options = [
    {
      value: 'eth',
      name: 'ETH',
      img: ethIcon,
      subtitle: 'Ether',
    },
    {
      value: 'dai',
      name: 'DAI',
      img: daiIcon,
      subtitle: 'DAI Stablecoin',
    },
    {
      value: 'usdc',
      name: 'USDC',
      img: usdcIcon,
      subtitle: 'USD Coin',
    },
    {
      value: 'bond',
      name: 'BOND',
      img: bondIcon,
      subtitle: 'BarnBridge Governance Token',
    },
    {
      value: 'snx',
      name: 'SNX',
      img: snxIcon,
      subtitle: 'Synthetix Network Token',
    },
  ];
  const handleShow = () => {
    setOpenList(!openList);
  };
  const handleChange = (key) => {
    setBidtype(key);
    setOpenList(true);
  };
  const handeClick = (e) => {
    setMinBId(e.target.checked);
  };
  console.log(minBid);
  const bid = options.find((element) => element.value === bidtype);
  console.log(bid);
  console.log(bidtype);
  return (
    <div className="auction-settings container">
      <div className="back-rew" onClick={() => history.push('/reward-tiers')} aria-hidden="true">
        <img src={arrow} alt="back" />
        <span>My Auctions</span>
      </div>
      <div>
        <div className="head-part">
          <h2 className="tier-title">Auction Settings</h2>
        </div>
        <div className="setting-form">
          <div className="up-side">
            <div className="infoDiv">
              <Input label="Auction name" />
              <Input label="Starting bid" />
              <div className="drop-down">
                <button type="button" onClick={() => handleShow()}>
                  <img src={bid.img} alt="icon" />
                  <spam className="button-name">{bid.name}</spam>
                  <img src={arrowDown} alt="arrow" />
                </button>
                <ul className="option-list" hidden={openList}>
                  <li className="searchDiv">
                    <div>
                      <h1>Select bid token (ERC-20)</h1>
                      <Input
                        placeholder="Search name or paste ERC-20 contract address"
                        className="searchInp"
                      />
                    </div>
                  </li>
                  {options.map((item) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <li
                      key={item.value}
                      onClick={() => handleChange(item.value)}
                      onKeyPress={() => handleChange(item.value)}
                      onKeyDown={() => handleChange(item.value)}
                    >
                      <div className="img-name">
                        <img src={item.img} alt="icon" />
                        <spam className="dai-name">{item.name}</spam>
                      </div>
                      {item.subtitle && <spam className="subtitle">{item.subtitle}</spam>}
                    </li>
                  ))}
                  <div className="token-div">
                    <Button className="light-border-button add-token">Add token</Button>
                  </div>
                </ul>
              </div>
            </div>
            <div className="infoDiv">
              <Input label="Start date" />
              {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
              <Input label="End date" />
              <span className="auction-ext">
                Ending auction extension timer: 3 minutes
                <img
                  src={infoIcon}
                  alt="Info Icon"
                  onMouseOver={() => setHideIcon1(true)}
                  onFocus={() => setHideIcon1(true)}
                  onMouseLeave={() => setHideIcon1(false)}
                  onBlur={() => setHideIcon(false)}
                />
              </span>
              {hideIcon1 && (
                <Animated animationIn="zoomIn">
                  <div className="info-text">
                    <p>
                      Any bid in the last 3 minutes of an auction will extend the auction for an
                      additional 3 minutes.
                    </p>
                  </div>
                </Animated>
              )}
            </div>
          </div>
          <div className="down-side">
            <div className="bid-part">
              <div className="bid-info">
                <h1>Minimum bid per tier</h1>
                <img
                  src={infoIcon}
                  alt="Info Icon"
                  onMouseOver={() => setHideIcon2(true)}
                  onFocus={() => setHideIcon2(true)}
                  onMouseLeave={() => setHideIcon2(false)}
                  onBlur={() => setHideIcon2(false)}
                />
                <label className="switch">
                  <input type="checkbox" checked={minBid} onChange={handeClick} />
                  <span className="slider round" />
                </label>
              </div>
              {hideIcon2 && (
                <Animated animationIn="zoomIn">
                  <div className="info-text">
                    <p>
                      Any bid in the last 3 minutes of an auction will extend the auction for an
                      additional 3 minutes.
                    </p>
                  </div>
                </Animated>
              )}
              {minBid === true && (
                <div className="bid-text">
                  <ul>
                    <li>You are able to set the minimum bid for each tier.</li>
                    <li className="min-li">
                      You are only able to set the minimum bid for the tier when the tier above has
                      equal or higher minimum bid.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {auction.tiers.length > 0 &&
              minBid === true &&
              auction.tiers.map((tier, index) => (
                <div className="tiers-part">
                  <Input label={tier.name} placeholder="0.1" />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Button className="light-button">Review auction</Button>
    </div>
  );
};

export default AuctionSettings;
