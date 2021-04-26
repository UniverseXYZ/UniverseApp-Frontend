/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
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

const AuctionSettings = () => {
  const location = useLocation();
  const history = useHistory();
  const { auction, setAuction } = useContext(AppContext);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideIcon2, setHideIcon2] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [bidtype, setBidtype] = useState('');

  const options = [
    { value: 'eth', label: 'ETH', img: ethIcon },
    { value: 'dai', label: 'DAI' },
    { value: 'usdc', label: 'USDC' },
    { value: 'bond', label: 'BOND' },
    { value: 'snx', label: 'SNX' },
  ];

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
                <Select options={options} />
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
                  onMouseLeave={() => setHideIcon1(false)}
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
                  onMouseLeave={() => setHideIcon2(false)}
                />
                <label className="switch">
                  <input type="checkbox" />
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
              <div className="bid-text">
                <ul>
                  <li>You are able to set the minimum bid for each tier.</li>
                  <li className="min-li">
                    You are only able to set the minimum bid for the tier when the tier above has
                    equal or higher minimum bid.
                  </li>
                </ul>
              </div>
            </div>

            {auction.tiers.length > 0 &&
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
