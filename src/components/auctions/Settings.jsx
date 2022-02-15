import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
import 'react-datepicker/dist/react-datepicker.css';
import { utils } from 'ethers';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import './AuctionSettings.scss';
import { formatISO } from 'date-fns';
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
import { parseDateForDatePicker } from '../calendar/utils';
import { useAuthContext } from '../../contexts/AuthContext';

const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
};

const INVALID_ADDRESS_TEXT = 'Please enter valid address or ENS';

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
  const { auction, setAuction, bidtype, setBidtype, options } = useAuctionContext();
  const [hideIcon1, setHideIcon1] = useState(false);
  const [royaltyValidAddress, setRoyaltyValidAddress] = useState(true);
  const [minBid, setMinBId] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [dropDown, setDropDown] = useState('');
  const { web3Provider } = useAuthContext();
  const [isValidFields, setIsValidFields] = useState({
    name: true,
    startDate: true,
    endDate: true,
    royalty: true,
  });

  const [bidValues, setBidValues] = useState([]);
  const [isBidTokenOpened, setIsBidTokenOpened] = useState(false);
  const [isStartDateOpened, setIsStartDateOpened] = useState(false);
  const [isEndDateOpened, setIsEndDateOpened] = useState(false);
  const isEditingAuction = location.state !== undefined;
  const [royaltyAddress, setRoyaltyAddress] = useState(
    auction && auction.royaltySplits ? [...auction.royaltySplits] : [{ address: '', amount: '' }]
  );
  const [royaltiesMapIndexes, setRoyaltiesMapIndexes] = useState({});
  const hasRoyalties =
    royaltyAddress && royaltyAddress.length && royaltyAddress[0].address.length > 0;
  const [royalities, useRoyalities] = useState(hasRoyalties);
  const parseDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();

    const formatedDate = parseDateForDatePicker(date);
    return formatedDate;
  };

  const startDate =
    isEditingAuction && auction.startDate ? parseDate(auction.startDate) : parseDate();

  const endDate = isEditingAuction && auction.startDate ? parseDate(auction.endDate) : parseDate();

  const [startDateTemp, setStartDateTemp] = useState({ ...startDate });
  const [endDateTemp, setEndDateTemp] = useState({ ...endDate });

  const [values, setValues] = useState({
    name: auction.name ? auction.name : '',
    startDate: auction.startDate ? auction.startDate : '',
    endDate: auction.endDate ? auction.endDate : '',
  });
  const [bidToken, setBidToken] = useState(null);
  const [bidTypeLocal, setBidTypeLocal] = useState(bidtype);
  const setToken = (key) => {
    const token = options.find((element) => element.value === key);
    setBidTypeLocal(key);
    setBidToken(token);
  };

  useEffect(() => {
    setToken(bidtype);
  }, []);

  const handleAddAuction = () => {
    setTimeout(() => {
      setIsValidFields((prevValues) => ({
        ...prevValues,
        startDate: values.startDate.length !== 0,
        endDate: values.endDate.length !== 0,
        name: values.name.trim().length !== 0,
        royaltySplits: royalities ? royaltyAddress : [{ address: '', amount: '' }],
      }));
    }, 2000);

    let auctionFieldsValid = false;
    let bidFieldsValid = false;
    setRoyaltyAddress(royalities ? royaltyAddress : [{ address: '', amount: '' }]);

    if (values.name && values.startDate && values.endDate) {
      if (isValidFields.startDate && isValidFields.endDate) {
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
          startDate: formatISO(values.startDate),
          endDate: formatISO(values.endDate),
          rewardTiers: minBid
            ? prevValue.rewardTiers.map((tier, idx) => ({ ...tier, minBid: bidValues[idx] }))
            : prevValue.rewardTiers,
          royaltySplits: royalities ? royaltyAddress : null,
        }));
        setBidtype(bidTypeLocal);
      } else {
        setAuction((prevValue) => ({
          ...prevValue,
          name: values.name,
          startDate: formatISO(values.startDate),
          endDate: formatISO(values.endDate),
          royaltySplits: royalities ? royaltyAddress : null,
          rewardTiers: minBid
            ? prevValue.rewardTiers.map((tier) => ({ ...tier, minBid: bidValues[tier.id] }))
            : prevValue.rewardTiers,
        }));
        setBidtype(bidTypeLocal);
      }
      history.push({
        pathname: '/setup-auction/reward-tiers',
        state: location.state === 'edit' ? location.state : true,
      });
    }
  };

  const hasAddressError = (royalty, index) => {
    if (royalty && royaltiesMapIndexes[royalty]) {
      const isRepeated = royaltiesMapIndexes[royalty].length > 1;
      if (!isRepeated) return '';
      const firstAppearenceIndex = royaltiesMapIndexes[royalty][0];
      if (index !== firstAppearenceIndex) return 'Duplicated address';
    }
    return '';
  };

  const handleOnChange = (event) => {
    setValues((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
  };

  const addProperty = () => {
    const prevProperties = [...royaltyAddress];
    const temp = { address: '', percentAmount: '' };
    prevProperties.push(temp);
    setRoyaltyAddress(prevProperties);
  };

  const propertyChangesAddress = async (index, val) => {
    const prevProperties = [...royaltyAddress];

    try {
      const ens = await web3Provider.resolveName(val);
      const ensToAddress = utils.isAddress(ens);
      prevProperties[index].address = ensToAddress ? ens.toLowerCase() : val;
      prevProperties[index].error = !ensToAddress ? INVALID_ADDRESS_TEXT : '';
    } catch (e) {
      prevProperties[index].address = val.toLowerCase();
      prevProperties[index].error = !utils.isAddress(val) ? INVALID_ADDRESS_TEXT : '';
    }

    const addressErrors = prevProperties.filter((prop) => prop.error);
    const lastAddress = prevProperties[index].address;

    const newRoyaltyMapIndexes = { ...royaltiesMapIndexes };
    // eslint-disable-next-line no-restricted-syntax
    for (const r in newRoyaltyMapIndexes) {
      if (newRoyaltyMapIndexes[r].includes(index)) {
        if (newRoyaltyMapIndexes[r].length > 1) {
          newRoyaltyMapIndexes[r].splice(newRoyaltyMapIndexes[r].indexOf(index), 1);
        } else {
          delete newRoyaltyMapIndexes[r];
        }
      }
    }

    if (newRoyaltyMapIndexes[lastAddress] && newRoyaltyMapIndexes[lastAddress].includes(index)) {
      if (newRoyaltyMapIndexes.length === 1) {
        delete newRoyaltyMapIndexes[lastAddress];
      } else {
        newRoyaltyMapIndexes[lastAddress].splice(newRoyaltyMapIndexes[r].indexOf(index), 1);
      }
    }
    const value = prevProperties[index].address;
    if (newRoyaltyMapIndexes[value] && !newRoyaltyMapIndexes[value].includes(index)) {
      newRoyaltyMapIndexes[value].push(index);
    } else {
      newRoyaltyMapIndexes[value] = [];
      newRoyaltyMapIndexes[value].push(index);
    }

    setRoyaltiesMapIndexes(newRoyaltyMapIndexes);
    setRoyaltyAddress(prevProperties);
    setRoyaltyValidAddress(!addressErrors.length);
  };

  const propertyChangesAmount = (index, val, inp) => {
    const newProperties = royaltyAddress.map((property, propertyIndex) => {
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
      setRoyaltyAddress(newProperties);
    }
  };

  const removeRoyaltyAddress = (index) => {
    const temp = [...royaltyAddress];
    const removed = temp.splice(index, 1)[0];
    setRoyaltyAddress(temp);

    const tempIndexes = { ...royaltiesMapIndexes };
    const occuranceArray = tempIndexes[removed.address];
    if (occuranceArray) occuranceArray?.pop();
    setRoyaltiesMapIndexes(tempIndexes);

    const addressErrors = temp.filter((prop) => prop.error && prop.error !== '');
    setRoyaltyValidAddress(!addressErrors.length);
  };

  useEffect(() => {
    if (isEditingAuction) {
      setValues({
        name: auction.name,
        startDate: auction.startDate ? new Date(auction.startDate) : '',
        endDate: auction.endDate ? new Date(auction.endDate) : '',
      });
    }
  }, []);

  useEffect(() => {
    if (isEditingAuction && royaltyAddress.length > 0) {
      const royaltiesMapIndexesValues = {};

      royaltyAddress.forEach((element, index) => {
        royaltiesMapIndexesValues[element.address] = [index];
      });
      setRoyaltiesMapIndexes(royaltiesMapIndexesValues);
    }
  }, []);

  const continueButtonDisabled =
    !values.startDate ||
    !values.endDate ||
    !values.name ||
    (royalities &&
      royaltyAddress.find(
        (el, i) =>
          el.address.trim().length === 0 ||
          !utils.isAddress(el.address) ||
          !+el.percentAmount ||
          hasAddressError(el.address, i)
      ));

  let disableClickOutsideClass = '';
  if (isBidTokenOpened || isStartDateOpened || isEndDateOpened) {
    disableClickOutsideClass = 'disabled-click-outside';
  }

  return (
    <div className={`${disableClickOutsideClass} auction-settings container`}>
      <div>
        <div className="head-part">
          <h5 className="tier-title">Auction settings</h5>
          <p className="tier-description">
            Start setting up your auction with filling out the name, bid token and schedule.
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
                  Characters: {values.name.length}/{MAX_FIELD_CHARS_LENGTH.name}
                </p>
              </div>
              <div className="starting-bid">
                <div className="title--section">
                  <h1>Bid token (ERC-20)</h1>
                </div>
                <div className="drop-down">
                  <Popup
                    nested
                    closeOnDocumentClick={false}
                    trigger={(opened) => {
                      if (opened) {
                        setIsBidTokenOpened(true);
                      } else {
                        setIsBidTokenOpened(false);
                      }
                      return (
                        <button type="button" className={dropDown}>
                          <div className="left--section">
                            {bidToken?.img && (
                              <img src={bidToken.img} className="token-logo" alt="icon" />
                            )}
                            <span className="button-name">{bidToken?.name}</span>
                          </div>
                          <div className="right--section">
                            <img src={arrowDown} alt="arrow" />
                          </div>
                        </button>
                      );
                    }}
                  >
                    {(close) => (
                      <SelectToken options={options} setBidToken={setToken} onClose={close} />
                    )}
                  </Popup>
                </div>
              </div>
            </div>
            <div className="infoDiv">
              <div className="date__input">
                <div style={{ position: 'relative' }}>
                  <Popup
                    closeOnDocumentClick={false}
                    trigger={(opened) => {
                      if (opened) {
                        setIsStartDateOpened(true);
                      } else {
                        setIsStartDateOpened(false);
                      }
                      return (
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
                              ${startDateTemp.timezone
                                ?.toString()
                                .split(' ')[0]
                                .replace('GMT', 'UTC')}`}
                            </p>
                          )}
                          <img
                            aria-hidden="true"
                            className="callendar__image"
                            src={callendarIcon}
                            alt="Callendar"
                          />
                        </div>
                      );
                    }}
                  >
                    {(close) => (
                      <StartDateCalendar
                        auction={auction}
                        ref={startDateRef}
                        monthNames={monthNames}
                        values={values}
                        setValues={setValues}
                        startDateTemp={startDateTemp}
                        setStartDateTemp={setStartDateTemp}
                        setEndDateTemp={setEndDateTemp}
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
                    trigger={(opened) => {
                      if (opened) {
                        setIsEndDateOpened(true);
                      } else {
                        setIsEndDateOpened(false);
                      }
                      return (
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
                              ${endDateTemp.timezone
                                ?.toString()
                                .split(' ')[0]
                                .replace('GMT', 'UTC')}`}
                            </p>
                          )}
                          <img
                            aria-hidden="true"
                            className="callendar__image"
                            src={callendarIcon}
                            alt="Callendar"
                          />
                        </div>
                      );
                    }}
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
                  Ending auction extension timer: 5 minutes
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
                        Any bid in the last 5 minutes of an auction will extend the auction for an
                        additional 5 minutes.
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
            {royaltyAddress.map((elm, i) => {
              const error = elm.error || hasAddressError(elm.address, i);

              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="properties" key={i}>
                  <div className="property-name">
                    <label className="inp-label">Wallet address</label>
                    <DebounceInput
                      debounceTimeout={150}
                      id="address"
                      placeholder="0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
                      className={`${error ? 'error-inp inp' : 'inp'}`}
                      value={elm.address}
                      hoverBoxShadowGradient
                      onChange={(e) => propertyChangesAddress(i, e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                  </div>
                  <div className="property-value">
                    <Input
                      id="amount"
                      label="Percent amount"
                      pattern="\d*"
                      placeholder="5"
                      className="amount-inp withsign"
                      value={elm.percentAmount}
                      hoverBoxShadowGradient
                      onChange={(e) => propertyChangesAmount(i, e.target.value, e.target)}
                    />
                    <span className="percent-sign">%</span>
                  </div>
                  {i > 0 && (
                    <>
                      <img
                        src={delateIcon}
                        alt="Delete"
                        className="remove-img"
                        onClick={() => removeRoyaltyAddress(i)}
                        aria-hidden="true"
                      />
                      <Button
                        className="light-border-button remove-btn"
                        onClick={() => removeRoyaltyAddress(i)}
                      >
                        <img src={delIcon} alt="Delete" aria-hidden="true" />
                        Remove
                      </Button>
                    </>
                  )}
                </div>
              );
            })}

            {royaltyAddress.length < 5 && (
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
      {!isValidFields.startDate || !isValidFields.endDate || errorArray.length > 0 ? (
        <div className="last-error">
          Something went wrong. Please, fix the errors in the fields above and try again
        </div>
      ) : (
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
        <Button
          disabled={continueButtonDisabled}
          className="light-button"
          onClick={handleAddAuction}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AuctionSettings;
