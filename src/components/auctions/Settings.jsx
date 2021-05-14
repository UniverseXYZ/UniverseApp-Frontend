import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import { Animated } from 'react-animated-css';
import Select from 'react-select';
import moment from 'moment';
import uuid from 'react-uuid';
import arrow from '../../assets/images/arrow.svg';
import AppContext from '../../ContextAPI';
import Input from '../input/Input';
import infoIcon from '../../assets/images/icon.svg';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../button/Button';
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
  const [searchByNameAndAddress, setsearchByNameAndAddress] = useState('');

  const location = useLocation();
  const history = useHistory();
  const {
    auction,
    setAuction,
    myAuctions,
    setMyAuctions,
    bidtype,
    setBidtype,
    options,
  } = useContext(AppContext);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideIcon2, setHideIcon2] = useState(false);
  const [openList, setOpenList] = useState(true);
  const [minBid, setMinBId] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleSearch = (value) => {
    setsearchByNameAndAddress(value);
  };

  const [isValidFields, setIsValidFields] = useState({
    name: true,
    startingBid: true,
    startDate: true,
    endDate: true,
  });

  const [bidValues, setBidValues] = useState([]);
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
  const isEditingAuction = location.state !== undefined;
  // const isEditingAuction = location.state === '/auction-review';

  const handleAddAuction = () => {
    setIsValidFields((prevValues) => ({
      ...prevValues,
      startingBid: values.startingBid.trim().length !== 0,
      startDate: values.startDate.length !== 0,
      endDate: values.endDate.length !== 0,
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
      let isValid = true;
      setErrorArray([]);
      // eslint-disable-next-line consistent-return
      bidValues.forEach((item, index) => {
        if (index < bidValues.length - 1 && bidValues[index + 1] > bidValues[index]) {
          console.log(index + 1);
          setErrorArray((prevValue) => [...prevValue, index + 1]);
          isValid = false;
          return isValid;
        }
      });
      if (isValid) {
        bidFieldsValid = true;
      }
    } else {
      bidFieldsValid = true;
    }

    if (auctionFieldsValid && bidFieldsValid) {
      if (!auction.id) {
        setAuction((prevValue) => ({
          ...prevValue,
          id: uuid(),
          launch: false,
          name: values.name,
          startingBid: values.startingBid,
          startDate: moment(values.startDate).format(),
          endDate: moment(values.endDate).format(),
          tiers: minBid
            ? prevValue.tiers.map((tier, idx) => ({ ...tier, minBid: bidValues[idx] }))
            : prevValue.tiers,
        }));
      } else {
        setAuction((prevValue) => ({
          ...prevValue,
          name: values.name,
          startingBid: values.startingBid,
          startDate: moment(values.startDate).format(),
          endDate: moment(values.endDate).format(),
          tiers: minBid
            ? prevValue.tiers.map((tier) => ({ ...tier, minBid: bidValues[tier.id] }))
            : prevValue.tiers,
        }));
      }
      history.push('/auction-review', location.pathname);
    }
  };

  const handleOnChange = (event) => {
    setValues((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
  };

  const handleBidChange = (event, index) => {
    bidValues[index] = +event.target.value;
    setBidValues(bidValues);
  };

  useEffect(() => {
    if (auction.id || isEditingAuction) {
      setValues({
        name: auction.name,
        startingBid: auction.startingBid,
        startDate: new Date(auction.startDate),
        endDate: new Date(auction.endDate),
      });
      // setBidValues(
      //   auction.tiers.reduce((acc, currentTier) => {
      //     console.log(currentTier);
      //     acc[currentTier.id] = currentTier.minBid;
      //     return acc;
      //   }),
      //   {}
      // );
    }
  }, [auction.id]);
  return (
    <div className="auction-settings container">
      <div className="back-rew" onClick={() => history.push('/reward-tiers')} aria-hidden="true">
        <img src={arrow} alt="back" />
        <span>My auctions</span>
      </div>

      <div>
        <div className="head-part">
          <h2 className="tier-title">Auction settings</h2>
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
              <div className="starting-bid">
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
                    {bid.img && <img src={bid.img} alt="icon" />}
                    <span className="button-name">{bid.name}</span>
                    <img src={arrowDown} alt="arrow" />
                  </button>
                  <ul className="option-list" hidden={openList}>
                    <li className="searchDiv">
                      <div>
                        <h1>Select bid token (ERC-20)</h1>
                        <Input
                          onChange={(e) => handleSearch(e.target.value)}
                          value={searchByNameAndAddress}
                          placeholder="Search name or paste ERC-20 contract address"
                          className="searchInp"
                        />
                      </div>
                    </li>
                    {options
                      .filter(
                        (item) =>
                          item.name.toLowerCase().includes(searchByNameAndAddress.toLowerCase()) ||
                          item.address.toLowerCase().includes(searchByNameAndAddress.toLowerCase())
                      )
                      .map((item) => (
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                        <li
                          key={item.value ? item.value : item.name}
                          onClick={() => handleChange(item.value)}
                          onKeyPress={() => handleChange(item.value)}
                          onKeyDown={() => handleChange(item.value)}
                        >
                          <div className="img-name">
                            {item.img ? (
                              <img src={item.img} alt="icon" />
                            ) : (
                              <span className="imgDefSpan" />
                            )}
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
            </div>
            <div className="infoDiv">
              <div className="date__input">
                <Popup
                  trigger={
                    <Input
                      type="text"
                      readOnly
                      id="startDate"
                      label="Start date"
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
                  }
                >
                  {(close) => (
                    <StartDateCalendar
                      ref={startDateRef}
                      monthNames={monthNames}
                      values={values}
                      setValues={setValues}
                      startDateTemp={startDateTemp}
                      setStartDateTemp={setStartDateTemp}
                      onClose={close}
                    />
                  )}
                </Popup>
                {/* {showStartDate && (    )} */}
              </div>
              <div className="date__input">
                <Popup
                  trigger={
                    <Input
                      type="text"
                      readOnly
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
                  }
                >
                  {(close) => (
                    <EndDateCalendar
                      ref={endDateRef}
                      monthNames={monthNames}
                      values={values}
                      setValues={setValues}
                      endDateTemp={endDateTemp}
                      setEndDateTemp={setEndDateTemp}
                      setShowEndDate={setShowEndDate}
                      onClose={close}
                    />
                  )}
                </Popup>
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
                  <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                    <div className="info-text">
                      <p>
                        Any bid in the last 3 minutes of an auction will extend the auction for an
                        additional 3 minutes.
                      </p>
                    </div>
                  </Animated>
                )}
                {/* {showEndDate && (   )} */}
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
                {hideIcon2 && (
                  <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                    <div className="info-text">
                      <p>
                        Minimum bid parameter may be used to make sure that NFTs from the tier will
                        not be sold under the target price value.
                      </p>
                    </div>
                  </Animated>
                )}
              </div>

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
                auction.tiers.map((tier, index) => (
                  <div className="tiers-part">
                    <span className="bid-type">
                      {bid.img && <img src={bid.img} alt="icon" />}
                      <span className="button-name">{bid.name}</span>
                    </span>
                    <Input
                      type="number"
                      name="tierBid"
                      label={tier.name}
                      error={
                        errorArray.includes(index)
                          ? 'The minimum bid for this tier cannot be lower than for the tier below'
                          : undefined
                      }
                      onChange={(e) => handleBidChange(e, index)}
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
