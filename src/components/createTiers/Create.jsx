import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import arrow from '../../assets/images/arrow.svg';
import AppContext from '../../ContextAPI';
import Button from '../button/Button';
import Input from '../input/Input';
import infoIcon from '../../assets/images/icon.svg';

const Create = () => {
  const history = useHistory();
  const [hideIcon, setHideIcon] = useState(false);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideIcon2, setHideIcon2] = useState(false);
  const { auction, setAuction } = useContext(AppContext);

  const [values, setValues] = useState({
    name: '',
    winners: '',
    nftsPerWinner: '',
  });

  const [isValidFields, setIsValidFields] = useState({
    name: true,
    winners: true,
    nftsPerWinner: true,
  });

  const location = useLocation();
  const tierId = location.state;
  const tierById = auction.tiers.find((element) => element.id === tierId);

  useEffect(() => {
    if (values.name) {
      if (isValidFields.name && isValidFields.winners && isValidFields.nftsPerWinner) {
        if (tierId) {
          setAuction({
            ...auction,
            tiers: [
              ...auction.tiers.filter((tier) => tier.id !== tierId),
              { ...tierById, ...values },
            ],
          });
          history.push('/select-nfts', tierId);
        } else {
          const createdTierId = uuid();
          setAuction({
            ...auction,
            tiers: [...auction.tiers, { ...values, id: createdTierId, nfts: [], minBid: '' }],
          });
          history.push('/select-nfts', createdTierId);
        }
      }
    }
  }, [isValidFields]);

  useEffect(() => {
    if (tierById) {
      setValues({
        name: tierById.name,
        winners: tierById.winners,
        nftsPerWinner: tierById.nftsPerWinner,
      });
    }
  }, [tierById]);

  const handleChange = (event) => {
    setValues((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
  };

  const handleClick = () => {
    setIsValidFields((prevValues) => ({ ...prevValues, name: values.name.trim().length !== 0 }));
    setIsValidFields((prevValues) => ({
      ...prevValues,
      winners: values.winners.trim().length !== 0,
    }));
    setIsValidFields((prevValues) => ({
      ...prevValues,
      nftsPerWinner: values.nftsPerWinner.trim().length !== 0,
    }));
  };

  return (
    <div className="container create-tiers">
      <div
        className="back-rew"
        onClick={() => {
          history.push('/reward-tiers');
        }}
        aria-hidden="true"
      >
        <img src={arrow} alt="back" />
        <span>Reward tiers</span>
      </div>
      <div>
        <div className="head-part">
          <h2 className="tier-title">Create reward tier</h2>
          <p className="create-p">
            Each reward tier can contain up to 20 winners and up to 5 NFTs for each winner (total:
            100 NFTs).
          </p>
        </div>
        <div className="tier-info">
          <Input
            id="name"
            error={isValidFields.name ? undefined : 'Tier name is required!'}
            label="Tier name"
            className="inp"
            value={values.name}
            onChange={handleChange}
          />

          <div className="tier-info_icon">
            <span
              className="inp-label"
              onMouseOver={() => setHideIcon1(true)}
              onFocus={() => setHideIcon1(true)}
              onMouseLeave={() => setHideIcon1(false)}
              onBlur={() => setHideIcon1(false)}
            >
              <span>
                Number of winners <img src={infoIcon} alt="Info Icon" />
              </span>
              {hideIcon1 && (
                <Animated animationIn="zoomIn">
                  <div className="info-text t1">
                    <p>Amount of people who will get NFTs from the current reward tier.</p>
                  </div>
                </Animated>
              )}
            </span>
          </div>
          <Input
            id="winners"
            type="number"
            error={isValidFields.winners ? undefined : 'Number of winners is required!'}
            className="inp"
            value={values.winners}
            onChange={handleChange}
          />

          <div className="tier-info_icon">
            <span
              className="inp-label"
              onMouseOver={() => setHideIcon2(true)}
              onFocus={() => setHideIcon2(true)}
              onMouseLeave={() => setHideIcon2(false)}
              onBlur={() => setHideIcon2(false)}
            >
              <span>
                NFTs per winner <img src={infoIcon} alt="Info Icon" />
              </span>
              {hideIcon2 && (
                <Animated animationIn="zoomIn">
                  <div className="info-text t2">
                    <p>Amount of NFTs each winner of this reward tier is going to get.</p>
                  </div>
                </Animated>
              )}
            </span>
          </div>
          <Input
            id="nftsPerWinner"
            type="number"
            error={isValidFields.nftsPerWinner ? undefined : 'NFTs per winner is required!'}
            className="inp"
            value={values.nftsPerWinner}
            onChange={handleChange}
          />
        </div>
        <div className="button-div">
          <div className="btns">
            <Button
              className="light-border-button"
              onClick={() => {
                history.push('/reward-tiers');
              }}
            >
              Cancel
            </Button>
            <Button className="light-button" onClick={handleClick}>
              Continue
            </Button>
          </div>
          <div className="total-num">
            {hideIcon && (
              <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                <div className="info-text">
                  <p>
                    Total amount of NFTs that will be distributed to the current reward tier
                    winners.
                  </p>
                </div>
              </Animated>
            )}
            Total NTF: <b>{values.winners * values.nftsPerWinner}</b>
            <img
              src={infoIcon}
              alt="Info Icon"
              onMouseOver={() => setHideIcon(true)}
              onFocus={() => setHideIcon(true)}
              onMouseLeave={() => setHideIcon(false)}
              onBlur={() => setHideIcon(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Create;
