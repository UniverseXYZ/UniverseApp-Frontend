import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Popup from 'reactjs-popup';
import moment from 'moment';
import uuid from 'react-uuid';
import './AuctionSettings.scss';
import EthereumAddress from 'ethereum-address';
import callendarIcon from '../../assets/images/calendar.svg';
import delateIcon from '../../assets/images/RemoveBtn.svg';
import delIcon from '../../assets/images/red-delete.svg';
import Input from '../input/Input.jsx';
import infoIcon from '../../assets/images/icon.svg';
import Button from '../button/Button.jsx';
import arrowDown from '../../assets/images/arrow-down.svg';
import SelectToken from '../popups/SelectTokenPopup.jsx';
import addIcon from '../../assets/images/Add.svg';
import StartDateCalendar from '../calendar/StartDateCalendar.jsx';
import EndDateCalendar from '../calendar/EndDateCalendar.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext';

const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
};

const AuctionSettings = () => {
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
  const [hideIcon, setHideIcon] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { auction, setAuction, bidtype, setBidtype, options, setAuctionSetupState } =
    useAuctionContext();
  const [hideIcon1, setHideIcon1] = useState(false);
  const [royaltyValidAddress, setRoyaltyValidAddress] = useState(true);
  const [minBid, setMinBId] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [dropDown, setDropDown] = useState('');

  const [isValidFields, setIsValidFields] = useState({
    name: true,
    startingBid: true,
    startDate: true,
    endDate: true,
    royalty: true,
  });

  const [bidValues, setBidValues] = useState([]);
  const isEditingAuction = location.state !== undefined;

  const [properties, setProperties] = useState(
    auction && auction.properties ? [...auction.properties] : [{ address: '', amount: '' }]
  );

  const hasRoyalties = properties[0].address.length > 0;
  const [royalities, useRoyalities] = useState(hasRoyalties);
  const parseDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();

    return {
      month: monthNames[date.getMonth()],
      day: date.getDate(),
      year: date.getFullYear(),
      hours: date.getHours(),
      minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
      timezone: 'GMT +04:00', // // TODO:: this shoud be dynamic ?
      format: 'AM',
    };
  };

  const startDate =
    isEditingAuction && auction.startDate ? parseDate(auction.startDate) : parseDate();

  const endDate = isEditingAuction && auction.startDate ? parseDate(auction.endDate) : parseDate();

  const [startDateTemp, setStartDateTemp] = useState({ ...startDate });
  const [endDateTemp, setEndDateTemp] = useState({ ...endDate });

  const [values, setValues] = useState({
    name: auction && auction.name ? auction.name : '',
    startingBid: auction && auction.startingBid ? auction.startingBid : '',
    startDate: auction.startDate ? auction.startDate : '',
    endDate: auction.endDate ? auction.endDate : '',
  });

  useEffect(() => {
    if (
      values.name ||
      values.startingBid ||
      values.startDate ||
      values.endDate ||
      properties[0].address ||
      properties[0].amount ||
      properties[1]
    ) {
      setAuctionSetupState(true);
    }
  }, [values, properties]);

  const bid = options.find((element) => element.value === bidtype);

  const handleAddAuction = () => {
    setTimeout(() => {
      setIsValidFields((prevValues) => ({
        ...prevValues,
        startingBid: values.startingBid.trim().length !== 0,
        startDate: values.startDate.length !== 0,
        endDate: values.endDate.length !== 0,
        name: values.name.trim().length !== 0,
        properties: royalities ? properties : [{ address: '', amount: '' }],
      }));
    }, 2000);

    let auctionFieldsValid = false;
    let bidFieldsValid = false;
    setProperties(royalities ? properties : [{ address: '', amount: '' }]);

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
          rewardTiers: minBid
            ? prevValue.rewardTiers.map((tier, idx) => ({ ...tier, minBid: bidValues[idx] }))
            : prevValue.rewardTiers,
          properties: royalities ? properties : null,
        }));
      } else {
        setAuction((prevValue) => ({
          ...prevValue,
          name: values.name,
          startingBid: values.startingBid,
          startDate: moment(values.startDate).format(),
          endDate: moment(values.endDate).format(),
          properties: royalities ? properties : null,
          rewardTiers: minBid
            ? prevValue.rewardTiers.map((tier) => ({ ...tier, minBid: bidValues[tier.id] }))
            : prevValue.rewardTiers,
        }));
      }
      history.push({
        pathname: '/setup-auction/reward-tiers',
        state: location.state === 'edit' ? location.state : true,
      });
    }
  };

  const handleOnChange = (event) => {
    setValues((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
  };

  const addProperty = () => {
    const prevProperties = [...properties];
    const temp = { address: '', percentAmount: '' };
    prevProperties.push(temp);
    setProperties(prevProperties);
  };

  const propertyChangesAddress = (index, val) => {
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
    const newProperties = properties.map((property, propertyIndex) => {
      if (propertyIndex === index) {
        return {
          ...property,
          percentAmount: val,
        };
      }
      return property;
    });
    const result = newProperties.reduce(
      (accumulator, current) => accumulator + Number(current.percentAmount),
      0
    );
    if (result <= 100 && val >= 0) {
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
        startDate: auction.startDate ? new Date(auction.startDate) : '',
        endDate: auction.endDate ? new Date(auction.endDate) : '',
      });
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
                  label="Auction name"
                  value={values.name}
                  hoverBoxShadowGradient
                  onChange={(e) => {
                    if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.name) return;
                    handleOnChange(e);
                  }}
                  error={
                    isValidFields.name ? undefined : '"Auction name" is not allowed to be empty!'
                  }
                />
                <p className="input-max-chars">
                  Characters: {values.name && values.name.length}/{MAX_FIELD_CHARS_LENGTH.name}
                </p>
              </div>
              <div className="starting-bid">
                <Input
                  id="startingBid"
                  type="number"
                  onChange={(e) => {
                    if (e.target.value && Number(e.target.value) < 0) e.target.value = '';
                    handleOnChange(e);
                  }}
                  label="Starting bid"
                  value={values.startingBid}
                  hoverBoxShadowGradient
                  error={isValidFields.startingBid ? undefined : '"Starting bid" is required!'}
                />

                <div className="drop-down">
                  <Popup
                    nested
                    handleEdit
                    closeOnDocumentClick={false}
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
                    closeOnDocumentClick={false}
                    trigger={
                      <div>
                        <Input
                          type="text"
                          readOnly
                          id="startDate"
                          label="Start date"
                          autoComplete="off"
                          hoverBoxShadowGradient
                          value={`${startDateTemp.month} ${startDateTemp.day}, ${startDateTemp.year}, ${startDateTemp.hours} ${startDateTemp.minutes}`}
                          error={isValidFields.startDate ? undefined : 'Start date is required!'}
                        />
                        {values.startDate && (
                          <p className="date--input--value">
                            <b>
                              {`${startDateTemp.month} ${startDateTemp.day}, ${startDateTemp.year}, `}
                            </b>
                            {`${startDateTemp.hours}:${startDateTemp.minutes}
                              ${startDateTemp.timezone?.toString().split(' ')[0]}`}
                          </p>
                        )}
                        <img
                          aria-hidden="true"
                          className="callendar__image"
                          src={callendarIcon}
                          alt="Callendar"
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
                    closeOnDocumentClick={false}
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
                          value={`${endDateTemp.month} ${endDateTemp.day}, ${endDateTemp.year}, ${endDateTemp.hours} ${endDateTemp.minutes}`}
                          error={isValidFields.endDate ? undefined : 'End date is required!'}
                        />
                        {values.endDate && (
                          <p className="date--input--value">
                            <b>
                              {`${endDateTemp.month} ${endDateTemp.day}, ${endDateTemp.year}, `}
                            </b>
                            {`${endDateTemp.hours}:${endDateTemp.minutes}
                              ${endDateTemp.timezone?.toString().split(' ')[0]}`}
                          </p>
                        )}
                        <img
                          aria-hidden="true"
                          className="callendar__image"
                          src={callendarIcon}
                          alt="Callendar"
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
            Revenue splits <img src={infoIcon} alt="Info Icon" className="info-icon" />
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
              onChange={(e) => {
                useRoyalities(e.target.checked);
              }}
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
                    pattern="\d*"
                    placeholder="5%"
                    className="amount-inp"
                    value={elm.percentAmount}
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
                  <img src={delIcon} alt="Delete" aria-hidden="true" />
                  Remove
                </Button>
              </div>
            ))}

            {properties.length < 5 && (
              <div className="property-add" onClick={() => addProperty()} aria-hidden="true">
                <h5>
                  <img src={addIcon} alt="Add" />
                  Add wallet
                </h5>
              </div>
            )}
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
