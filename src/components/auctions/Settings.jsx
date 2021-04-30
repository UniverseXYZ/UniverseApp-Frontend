import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import { Animated } from 'react-animated-css';
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
import AddToken from '../popups/AddTokenPopup';
import StartDateCalendar from '../calendar/StartDateCalendar';
import EndDateCalendar from '../calendar/EndDateCalendar';

const AuctionSettings = () => {
  const d = new Date();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const location = useLocation();
  const history = useHistory();
  const { auction, setAuction, bidtype, setBidtype } = useContext(AppContext);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideIcon2, setHideIcon2] = useState(false);
  const [openList, setOpenList] = useState(true);
  const [minBid, setMinBId] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const [isValidFields, setIsValidFields] = useState({
    name: true,
    startingBid: true,
    startDate: true,
    endDate: true,
  });

  const [bidValues, setBidValues] = useState({});
  const [values, setValues] = useState({
    name: '',
    startingBid: '',
    startDate: '',
    endDate: '',
  });

  const [startDateTemp, setStartDateTemp] = useState({
    month: monthNames[d.getMonth()],
    day: d.getDate(),
    year: d.getFullYear(),
    hours: '12',
    minutes: '00',
    timezone: 'GMT +04:00',
    format: 'AM',
  });

  const [endDateTemp, setEndDateTemp] = useState({
    month: monthNames[d.getMonth()],
    day: d.getDate(),
    year: d.getFullYear(),
    hours: '12',
    minutes: '00',
    timezone: 'GMT +04:00',
    format: 'AM',
  });

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
  const handleClose = () => {
    setShowAddToken(false);
  };
  const bid = options.find((element) => element.value === bidtype);

  const handleAddAuction = () => {
    setIsValidFields((prevValues) => ({
      ...prevValues,
      startingBid: values.startingBid.trim().length !== 0,
      startDate: values.startDate.trim().length !== 0,
      endDate: values.endDate.trim().length !== 0,
      name: values.name.trim().length !== 0,
    }));

    let auctionFieldsValid = false;
    let bidFieldsValid = false;

    if (values.name && values.startingBid && values.startDate && values.endDate) {
      if (isValidFields.startingBid && isValidFields.startDate && isValidFields.endDate) {
        if (auction.tiers.length > 0) {
          auctionFieldsValid = true;
        }
      }
    }

    if (minBid === true) {
      let currentMinBid = 0;
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in bidValues) {
        if (currentMinBid < bidValues[key]) {
          currentMinBid = bidValues[key];
          setErrorArray((prevValue) => prevValue.filter((tierId) => tierId !== key));
        } else {
          setErrorArray((prevValue) => [...prevValue, key]);
          return;
        }
      }
      setErrorArray([]);
      bidFieldsValid = true;
    } else {
      bidFieldsValid = true;
    }

    if (auctionFieldsValid && bidFieldsValid) {
      setAuction((prevValue) => ({
        ...prevValue,
        name: values.name,
        startingBid: values.startingBid,
        startDate: values.startDate,
        endDate: values.endDate,
        tiers: minBid
          ? prevValue.tiers.map((tier) => ({ ...tier, minBid: bidValues[tier.id] }))
          : prevValues.tiers,
      }));
      history.push('/auction-review', location.pathname);
    }
  };

  const handleOnChange = (event) => {
    setValues((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
  };

  const handleBidChange = (event) => {
    setBidValues((prevValue) => ({
      ...prevValue,
      [event.target.id]: event.target.value,
    }));
  };

  const handleClickOutside = (event) => {
    if (startDateRef.current && !startDateRef.current.contains(event.target)) {
      setShowStartDate(false);
    }
    if (endDateRef.current && !endDateRef.current.contains(event.target)) {
      setShowEndDate(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

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
              <Input
                id="name"
                onChange={handleOnChange}
                label="Auction name"
                value={values.name}
                error={
                  isValidFields.name ? undefined : '"Auction name" is not allowed to be empty!'
                }
              />
              <Input
                id="startingBid"
                type="number"
                onChange={handleOnChange}
                label="Starting bid"
                value={values.startingBid}
                error={isValidFields.startingBid ? undefined : '"Starting bid" is required!'}
              />
              <div className="drop-down">
                <button type="button" onClick={() => handleShow()}>
                  <img src={bid.img} alt="icon" />
                  <span className="button-name">{bid.name}</span>
                  <img src={arrowDown} alt="arrow" />
                </button>
                <ul className="option-list" hidden={openList}>
                  <li className="searchDiv">
                    <div>
                      <h1>Select bid token (ERC-20)</h1>
                      <Input
                        type="number"
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
                        <span className="dai-name">{item.name}</span>
                      </div>
                      {item.subtitle && <span className="subtitle">{item.subtitle}</span>}
                    </li>
                  ))}
                  <div className="token-div">
                    <Popup
                      trigger={
                        <button type="button" className="light-border-button add-token">
                          Add token
                        </button>
                      }
                    >
                      {(close) => <AddToken onClose={close} />}
                    </Popup>
                  </div>
                </ul>
              </div>
            </div>
            <div className="infoDiv">
              <div className="date__input">
                <Input
                  type="text"
                  onChange={handleOnChange}
                  onClick={() => setShowStartDate(true)}
                  id="startDate"
                  label="Start Date"
                  autoComplete="off"
                  value={
                    values.startDate
                      ? `${values.startDate.toString().split(' ')[1]} ${
                          values.startDate.toString().split(' ')[2]
                        }, ${
                          values.startDate.toString().split(' ')[3]
                        }, ${values.startDate.toString().split(' ')[4].substring(0, 5)} ${
                          startDateTemp.timezone
                        }`
                      : ''
                  }
                  error={isValidFields.startDate ? undefined : 'Start date is required!'}
                />
                {showStartDate && (
                  <StartDateCalendar
                    ref={startDateRef}
                    monthNames={monthNames}
                    values={values}
                    setValues={setValues}
                    startDateTemp={startDateTemp}
                    setStartDateTemp={setStartDateTemp}
                    setShowStartDate={setShowStartDate}
                  />
                )}
              </div>
              <div className="date__input">
                <Input
                  type="text"
                  onChange={handleOnChange}
                  onClick={() => setShowEndDate(true)}
                  id="endDate"
                  label="End date"
                  autoComplete="off"
                  value={
                    values.endDate
                      ? `${values.endDate.toString().split(' ')[1]} ${
                          values.endDate.toString().split(' ')[2]
                        }, ${
                          values.endDate.toString().split(' ')[3]
                        }, ${values.endDate.toString().split(' ')[4].substring(0, 5)} ${
                          endDateTemp.timezone
                        }`
                      : ''
                  }
                  error={isValidFields.endDate ? undefined : 'End date is required!'}
                />
                <span className="auction-ext">
                  Ending auction extension timer: 3 minutes
                  <img
                    src={infoIcon}
                    alt="Info Icon"
                    onMouseOver={() => setHideIcon1(true)}
                    onFocus={() => setHideIcon1(true)}
                    onMouseLeave={() => setHideIcon1(false)}
                    onBlur={() => setHideIcon1(false)}
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
                {showEndDate && (
                  <EndDateCalendar
                    ref={endDateRef}
                    monthNames={monthNames}
                    values={values}
                    setValues={setValues}
                    endDateTemp={endDateTemp}
                    setEndDateTemp={setEndDateTemp}
                    setShowEndDate={setShowEndDate}
                  />
                )}
              </div>
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
            <div className="tiers-inp">
              {auction.tiers.length > 0 &&
                minBid === true &&
                auction.tiers.map((tier, _index) => (
                  <div className="tiers-part">
                    <span className="bid-type">
                      <img src={bid.img} alt="icon" />
                      <spam className="button-name">{bid.name}</spam>
                    </span>
                    <Input
                      type="number"
                      name="tierBid"
                      label={tier.name}
                      error={
                        errorArray.includes(tier.id)
                          ? 'The minimum bid for this tier cannot be lower than for the tier below'
                          : undefined
                      }
                      onChange={handleBidChange}
                      id={tier.id}
                      placeholder="0.1"
                      value={bidValues[tier.id]}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {(!isValidFields.startingBid ||
        !isValidFields.startDate ||
        !isValidFields.endDate ||
        errorArray.length > 0) && (
        <div className="last-error">
          Something went wrong. Please, fix the errors in the fields above and try again
        </div>
      )}
      <Button className="light-button" onClick={handleAddAuction}>
        Review auction
      </Button>
    </div>
  );
};

export default AuctionSettings;
