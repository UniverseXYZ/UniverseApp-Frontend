import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { utils } from 'ethers';
import PropTypes from 'prop-types';
import './RevenueSplits.scss';
import Input from '../../input/Input.jsx';
import Button from '../../button/Button.jsx';
import { ReactComponent as InfoIcon } from '../../../assets/images/info-icon.svg';
import deleteIcon from '../../../assets/images/delred-icon.svg';
import smallDeleteIcon from '../../../assets/images/del-icon.svg';
import addIcon from '../../../assets/images/Add.svg';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';

const REVENUE_SPLITS_COUNT = 5;

const ADDRESS_PLACEHOLDER = '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7';

const MAX_REVENUE_SPLITS_PERCENT = 20;

const INVALID_ADDRESS_TEXT = 'Please enter valid address or ENS';

const RevenueSplits = (props) => {
  const { address, web3Provider } = useAuthContext();
  const {
    showRevenueSplits,
    setShowRevenueSplits,
    revenueSplits,
    setRevenueSplits,
    revenueSplitsValidAddress,
    setRevenueSplitsValidAddress,
  } = props;

  const [revenueSplitsMapIndexes, setRevenueSplitsMapIndexes] = useState(
    Object.defineProperty({}, `${address}`, {
      value: [0],
      writable: true,
      configurable: true,
      enumerable: true,
    })
  );

  const hasAddressError = (revenueSplit, index) => {
    if (revenueSplit && revenueSplitsMapIndexes[revenueSplit]) {
      const isRepeated = revenueSplitsMapIndexes[revenueSplit].length > 1;
      if (!isRepeated) return '';
      const firstAppearenceIndex = revenueSplitsMapIndexes[revenueSplit][0];
      if (index !== firstAppearenceIndex) return 'Duplicated address';
    }
    return '';
  };

  const handleWalletAddressChange = async (index, val) => {
    const prevProperties = [...revenueSplits];

    try {
      const ens = await web3Provider.resolveName(val);
      const ensToAddress = utils.isAddress(ens);
      prevProperties[index].walletAddress = ensToAddress ? ens.toLowerCase() : val;
      prevProperties[index].error = !ensToAddress ? INVALID_ADDRESS_TEXT : '';
    } catch (e) {
      prevProperties[index].walletAddress = val.toLowerCase();
      prevProperties[index].error = !utils.isAddress(val) ? INVALID_ADDRESS_TEXT : '';
    }

    const addressErrors = prevProperties.filter((prop) => prop.error);
    const lastAddress = prevProperties[index].walletAddress;

    // eslint-disable-next-line no-restricted-syntax
    for (const r in revenueSplitsMapIndexes) {
      if (revenueSplitsMapIndexes[r].includes(index)) {
        if (revenueSplitsMapIndexes[r].length > 1) {
          revenueSplitsMapIndexes[r].splice(revenueSplitsMapIndexes[r].indexOf(index), 1);
        } else {
          delete revenueSplitsMapIndexes[r];
        }
      }
    }

    if (
      revenueSplitsMapIndexes[lastAddress] &&
      revenueSplitsMapIndexes[lastAddress].includes(index)
    ) {
      if (revenueSplitsMapIndexes.length === 1) {
        delete revenueSplitsMapIndexes[lastAddress];
      } else {
        revenueSplitsMapIndexes[lastAddress].splice(revenueSplitsMapIndexes[r].indexOf(index), 1);
      }
    }
    const value = prevProperties[index].walletAddress;
    if (revenueSplitsMapIndexes[value] && !revenueSplitsMapIndexes[value].includes(index)) {
      revenueSplitsMapIndexes[value].push(index);
    } else {
      revenueSplitsMapIndexes[value] = [];
      revenueSplitsMapIndexes[value].push(index);
    }

    setRevenueSplitsMapIndexes(revenueSplitsMapIndexes);
    setRevenueSplits(prevProperties);
    setRevenueSplitsValidAddress(!addressErrors.length);
  };

  const handleAmountChange = (index, val, inp) => {
    if (val) {
      inp.classList.add('withsign');
    } else {
      inp.classList.remove('withsign');
    }

    const newRevenueSplits = revenueSplits.map((revenueSplit, revenueSplitIndex) => {
      if (revenueSplitIndex === index) {
        return {
          ...revenueSplit,
          amount: val,
        };
      }
      return revenueSplit;
    });
    const result = newRevenueSplits.reduce(
      (accumulator, current) => accumulator + Number(current.amount),
      0
    );
    if (result <= MAX_REVENUE_SPLITS_PERCENT && val >= 0) {
      setRevenueSplits(newRevenueSplits);
    }
  };

  const removeRevenueSplit = (index) => {
    const temp = [...revenueSplits];
    const removed = temp.splice(index, 1)[0];
    setRevenueSplits(temp);

    const tempIndexes = { ...revenueSplitsMapIndexes };
    const occuranceArray = tempIndexes[removed.walletAddress];
    if (occuranceArray) occuranceArray?.pop();
    setRevenueSplitsMapIndexes(tempIndexes);

    const addressErrors = temp.filter((prop) => prop.error && prop.error !== '');
    setRevenueSplitsValidAddress(!addressErrors.length);

    if (!temp.length) {
      setShowRevenueSplits(false);
    }
  };

  const addRevenueSplit = () => {
    const newRevenueSplit = [...revenueSplits];
    const temp = { walletAddress: '', amount: '' };
    newRevenueSplit.push(temp);
    setRevenueSplits(newRevenueSplit);
  };

  return (
    <div className="revenue--splits">
      <div className="title">
        <h4>Revenue splits</h4>
        <InfoIcon />
        <div className="revenue--splits--info--text">
          <p>
            Add addresses you want resale royalties to go to. Each address receives the percent you
            choose. Suggested percent amount: 2.5%.
          </p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={showRevenueSplits}
            onChange={(e) => setShowRevenueSplits(e.target.checked)}
          />
          <span className="slider round" />
        </label>
      </div>
      {showRevenueSplits &&
        revenueSplits.map((elm, i) => {
          const error = elm.error || hasAddressError(elm.walletAddress, i);

          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="revenue--split--row">
              <div className="revenue--split--wallet--address">
                <h5>Wallet address</h5>
                <DebounceInput
                  debounceTimeout={150}
                  className={`${error ? 'error-inp inp' : 'inp'}`}
                  placeholder={ADDRESS_PLACEHOLDER}
                  value={elm.walletAddress}
                  onChange={(e) => handleWalletAddressChange(i, e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
              </div>
              <div className="revenue--split--amount">
                <h5>Percent amount</h5>
                <Input
                  className="percent--inp"
                  placeholder="2.5%"
                  value={elm.amount}
                  onChange={(e) => handleAmountChange(i, e.target.value, e.target)}
                  onWheel={(e) => e.target.blur()}
                  hoverBoxShadowGradient
                />
                <span className="percent--sign">%</span>
              </div>
              <img
                src={deleteIcon}
                alt="Delete"
                className="delete--img"
                onClick={() => removeRevenueSplit(i)}
                aria-hidden="true"
              />
              <Button className="light-border-button red" onClick={() => removeRevenueSplit(i)}>
                <img src={smallDeleteIcon} className="del--icon" alt="Delete" aria-hidden="true" />
                Remove
              </Button>
            </div>
          );
        })}
      {showRevenueSplits && (
        <div
          className="property--add"
          onClick={() => {
            if (revenueSplits.length >= REVENUE_SPLITS_COUNT) return;
            addRevenueSplit();
          }}
          aria-hidden="true"
        >
          <h5>
            <img src={addIcon} alt="Add" />
            Add wallet
          </h5>
        </div>
      )}
    </div>
  );
};

RevenueSplits.propTypes = {
  showRevenueSplits: PropTypes.bool.isRequired,
  setShowRevenueSplits: PropTypes.func.isRequired,
  revenueSplits: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setRevenueSplits: PropTypes.func.isRequired,
  revenueSplitsValidAddress: PropTypes.bool.isRequired,
  setRevenueSplitsValidAddress: PropTypes.func.isRequired,
};

export default RevenueSplits;
