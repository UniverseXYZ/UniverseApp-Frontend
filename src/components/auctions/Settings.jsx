import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Animated } from 'react-animated-css';
import Popup from 'reactjs-popup';
import moment from 'moment';
import uuid from 'react-uuid';
import './AuctionSettings.scss';
import EthereumAddress from 'ethereum-address';
import arrow from '../../assets/images/arrow.svg';
import callendarIcon from '../../assets/images/calendar.svg';
import delateIcon from '../../assets/images/inactive.svg';
import delIcon from '../../assets/images/del-icon.svg';
import AppContext from '../../ContextAPI';
import Input from '../input/Input.jsx';
import infoIcon from '../../assets/images/icon.svg';
import Button from '../button/Button.jsx';
import arrowDown from '../../assets/images/arrow-down.svg';
import SelectToken from '../popups/SelectTokenPopup.jsx';
import addIcon from '../../assets/images/Add.svg';
import StartDateCalendar from '../calendar/StartDateCalendar.jsx';
import EndDateCalendar from '../calendar/EndDateCalendar.jsx';

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
  const [properties, setProperties] = useState([{ address: '', amount: '' }]);
  const [hideIcon, setHideIcon] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { auction, setAuction, myAuctions, setMyAuctions, bidtype, setBidtype, options } =
    useContext(AppContext);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [royalities, setRoyalities] = useState(true);
  const [royaltyValidAddress, setRoyaltyValidAddress] = useState(true);
  const [hideIcon2, setHideIcon2] = useState(false);
  const [openList, setOpenList] = useState(true);
  const [minBid, setMinBId] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [dropDown, setDropDown] = useState('');
  const [auctionNameFocusField, setAuctionNameFocusField] = useState('');
  const [startingBidFocusField, setStartingBidFocusField] = useState('');
  const [walletAddressFocusField, setWalletAddressFocusField] = useState('');
  const [percentAmountFocusField, setPercentAmountFocusField] = useState('');
  const [focusField, setFocusField] = useState('');

  const handleSearch = (value) => {
    setsearchByNameAndAddress(value);
  };

  const handleEdit = () => {
    document.body.classList.add('no__scroll');
  };

  const [isValidFields, setIsValidFields] = useState({
    name: true,
    startingBid: true,
    startDate: true,
    endDate: true,
    royalty: true,
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
    hours: new Date().getHours(),
    minutes: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes(),
    timezone: 'GMT +04:00',
    format: 'AM',
  });

  const [endDateTemp, setEndDateTemp] = useState({
    month: monthNames[d.getMonth()],
    day: d.getDate(),
    year: d.getFullYear(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes(),
    timezone: 'GMT +04:00',
    format: 'AM',
  });
  const handleShow = () => {
    setOpenList(!openList);
    if (openList) {
      setDropDown('active');
    } else {
      setDropDown('');
    }
  };
  const handleChange = (key) => {
    setBidtype(key);
    setOpenList(true);
  };
  const handeClick = (e) => {
    setMinBId(e.target.checked);
  };
  const bid = options.find((element) => element.value === bidtype);
  const isEditingAuction = location.state !== undefined;
  const handleAddAuction = () => {
    setTimeout(() => {
      setIsValidFields((prevValues) => ({
        ...prevValues,
        startingBid: values.startingBid.trim().length !== 0,
        startDate: values.startDate.length !== 0,
        endDate: values.endDate.length !== 0,
        name: values.name.trim().length !== 0,
      }));
    }, 2000);

    let auctionFieldsValid = false;
    let bidFieldsValid = false;

    if (values.name && values.startingBid && values.startDate && values.endDate) {
      if (isValidFields.startingBid && isValidFields.startDate && isValidFields.endDate) {
        auctionFieldsValid = true;
      }
    }
    if (minBid === true) {
      let isValid = true;
      setErrorArray([]);
      // eslint-disable-next-line consistent-return
      bidValues.forEach((item, index) => {
        if (index < bidValues.length - 1 && bidValues[index + 1] > bidValues[index]) {
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

    if (auctionFieldsValid && bidFieldsValid && royaltyValidAddress) {
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
          properties,
        }));
      } else {
        setAuction((prevValue) => ({
          ...prevValue,
          name: values.name,
          startingBid: values.startingBid,
          startDate: moment(values.startDate).format(),
          endDate: moment(values.endDate).format(),
          properties,
          // tiers: minBid
          //   ? prevValue.tiers.map((tier) => ({ ...tier, minBid: bidValues[tier.id] }))
          //   : prevValue.tiers,
        }));
      }
      history.push('/setup-auction/reward-tiers', location.pathname);
    }
  };

  const handleOnChange = (event) => {
    setValues((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
  };

  const handleBidChange = (event, index) => {
    bidValues[index] = +event.target.value;
    setBidValues(bidValues);
  };

  const addProperty = () => {
    const prevProperties = [...properties];
    const temp = { address: '', amount: '' };
    prevProperties.push(temp);
    setProperties(prevProperties);
  };

  const propertyChangesAddress = (index, val) => {
    // token.address.trim().length !== 0 && EthereumAddress.isAddress(token.address),
    const prevProperties = [...properties];
    prevProperties[index].address = val;
    setProperties(prevProperties);
  };

  const propertyChangesAmount = (index, val, inp) => {
    if (val) {
      inp.classList.add('withsign');
    } else {
      inp.classList.remove('withsign');
    }
    const result = properties.reduce(
      (accumulator, current) => accumulator + Number(current.amount),
      0
    );
    if (result + Number(val) <= 100 && val >= 0) {
      const newProperties = properties.map((property, propertyIndex) => {
        if (propertyIndex === index) {
          return {
            ...property,
            amount: val,
          };
        }

        return property;
      });
      setProperties(newProperties);
    }
  };

  const removeProperty = (index) => {
    const temp = [...properties];
    temp.splice(index, 1);
    setProperties(temp);
  };

  useEffect(() => {
    if (isEditingAuction) {
      setValues({
        name: auction.name,
        startingBid: auction.startingBid,
        startDate: new Date(auction.startDate),
        endDate: new Date(auction.endDate),
      });
      // setBidValues(
      //   auction.tiers.reduce((acc, currentTier) => {
      //     acc[currentTier.id] = currentTier.minBid;
      //     return acc;
      //   }),
      //   {}
      // );
    } else if (!isEditingAuction && auction.id) {
      setAuction({ tiers: [] });
    }
  }, []);

  useEffect(() => {
    const notValidAddress = properties.find(
      (el) => el.address.trim().length !== 0 && EthereumAddress.isAddress(el.address) === false
    );
    if (notValidAddress) {
      setRoyaltyValidAddress(false);
    } else {
      setRoyaltyValidAddress(true);
    }
  }, [handleAddAuction]);

  return (
    <div className="auction-settings container">
      {/* <div className="back-rew" onClick={() => history.push('/reward-tiers')} aria-hidden="true">
        <img src={arrow} alt="back" />
        <span>My auctions</span>
      </div> */}

      <div>
        <div className="head-part">
          <h2 className="tier-title">Auction settings</h2>
          <p className="tier-description">
            Start setting up your auction with filling out the name, starting bid and schedule.
          </p>
        </div>
        <div className="setting-form">
          <div className="up-side">
            <div className="infoDiv">
              <div className="auction-name">
                <Input
                  id="name"
                  onChange={handleOnChange}
                  label="Auction name"
                  value={values.name}
                  hoverBoxShadowGradient
                  error={
                    isValidFields.name ? undefined : '"Auction name" is not allowed to be empty!'
                  }
                />
              </div>
              <div className="starting-bid">
                <Input
                  id="startingBid"
                  type="number"
                  onChange={handleOnChange}
                  label="Starting bid"
                  value={values.startingBid}
                  hoverBoxShadowGradient
                  error={isValidFields.startingBid ? undefined : '"Starting bid" is required!'}
                />

                <div className="drop-down">
                  {/* <button type="button" className={dropDown} onClick={() => handleShow()}>
                    {bid.img && <img src={bid.img} alt="icon" />}
                    <span className="button-name">{bid.name}</span>
                    <img src={arrowDown} alt="arrow" />
                  </button> */}
                  <Popup
                    nested
                    handleEdit
                    trigger={
                      <button type="button" className={dropDown}>
                        {bid.img && <img src={bid.img} alt="icon" />}
                        <span className="button-name">{bid.name}</span>
                        <img src={arrowDown} alt="arrow" />
                      </button>
                    }
                  >
                    {(close) => <SelectToken onClose={close} />}
                  </Popup>
                </div>
              </div>
            </div>
            <div className="infoDiv">
              <div className="date__input">
                <div style={{ position: 'relative' }}>
                  <Popup
                    trigger={
                      <div>
                        <Input
                          type="text"
                          readOnly
                          id="startDate"
                          label="Start date"
                          autoComplete="off"
                          hoverBoxShadowGradient
                          value={
                            values.startDate
                              ? `${values.startDate.toString().split(' ')[1]} ${
                                  values.startDate.toString().split(' ')[2]
                                }, ${values.startDate.toString().split(' ')[3]}, ${values.startDate
                                  .toString()
                                  .split(' ')[4]
                                  .substring(0, 5)} ${startDateTemp.timezone}`
                              : ''
                          }
                          error={isValidFields.startDate ? undefined : 'Start date is required!'}
                        />
                        <img
                          aria-hidden="true"
                          className="callendar__image"
                          src={callendarIcon}
                          alt="Callendar"
                          // onClick={() => setShowStartDate(true)}
                        />
                      </div>
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
                </div>
              </div>
              <div className="date__input">
                <div style={{ position: 'relative' }}>
                  <Popup
                    trigger={
                      <div>
                        <Input
                          type="text"
                          readOnly
                          onClick={() => setShowEndDate(true)}
                          id="endDate"
                          label="End date"
                          autoComplete="off"
                          hoverBoxShadowGradient
                          value={
                            values.endDate
                              ? `${values.endDate.toString().split(' ')[1]} ${
                                  values.endDate.toString().split(' ')[2]
                                }, ${values.endDate.toString().split(' ')[3]}, ${values.endDate
                                  .toString()
                                  .split(' ')[4]
                                  .substring(0, 5)} ${endDateTemp.timezone}`
                              : ''
                          }
                          error={isValidFields.endDate ? undefined : 'End date is required!'}
                        />
                        <img
                          aria-hidden="true"
                          className="callendar__image"
                          src={callendarIcon}
                          alt="Callendar"
                          // onClick={() => setShowStartDate(true)}
                        />
                      </div>
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
                </div>
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
                  {hideIcon1 && (
                    <div className="info-text">
                      <p>
                        Any bid in the last 3 minutes of an auction will extend the auction for an
                        additional 3 minutes.
                      </p>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="royalty-part">
          <h2
            onMouseOver={() => setHideIcon(true)}
            onFocus={() => setHideIcon(true)}
            onMouseLeave={() => setHideIcon(false)}
            onBlur={() => setHideIcon(false)}
            className="royalty-title"
          >
            Royalty splits <img src={infoIcon} alt="Info Icon" className="info-icon" />
          </h2>
          <span className="info">
            {hideIcon && (
              <div className="info-text">
                <p>Add addresses to share your auction’s profit with.</p>
              </div>
            )}
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={royalities}
              onChange={(e) => setRoyalities(e.target.checked)}
            />
            <span className="slider round" />
          </label>
        </div>
        {royalities && (
          <div className="royalty-form">
            {properties.map((elm, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="properties" key={i}>
                <div className="property-name">
                  <Input
                    id="address"
                    label="Wallet address"
                    placeholder="0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
                    className="address-inp"
                    value={elm.address}
                    hoverBoxShadowGradient
                    onChange={(e) => propertyChangesAddress(i, e.target.value)}
                  />
                </div>
                <div className="property-value">
                  <span className="percent-sign">%</span>
                  <Input
                    id="amount"
                    type="number"
                    label="Percent amount"
                    placeholder="5%"
                    pattern="[0-9]"
                    className="amount-inp"
                    value={elm.amount}
                    hoverBoxShadowGradient
                    onChange={(e) => propertyChangesAmount(i, e.target.value, e.target)}
                  />
                </div>
                <img
                  src={delateIcon}
                  alt="Delete"
                  className="remove-img"
                  onClick={() => removeProperty(i)}
                  aria-hidden="true"
                />
                <Button
                  className="light-border-button remove-btn"
                  onClick={() => removeProperty(i)}
                >
                  Remove
                  <img src={delIcon} alt="Delete" aria-hidden="true" />
                </Button>
              </div>
            ))}

            <div className="property-add" onClick={() => addProperty()} aria-hidden="true">
              <h5>
                <img src={addIcon} alt="Add" />
                Add property
              </h5>
            </div>
          </div>
        )}
      </div>
      {!isValidFields.startingBid ||
      !isValidFields.startDate ||
      !isValidFields.endDate ||
      errorArray.length > 0 ? (
        <div className="last-error">
          Something went wrong. Please, fix the errors in the fields above and try again
        </div>
      ) : (
        isValidFields.startingBid &&
        isValidFields.startDate &&
        isValidFields.endDate &&
        !royaltyValidAddress && (
          <div className="last-error">Something went wrong. Wallet address is not valid.</div>
        )
      )}
      <div className="btn-div">
        <Button className="light-border-button" onClick={() => history.push('/my-auctions')}>
          Back
        </Button>
        <Button className="light-button" onClick={handleAddAuction}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AuctionSettings;
