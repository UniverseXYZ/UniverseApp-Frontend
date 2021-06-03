import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import './CreateTiers.scss';
import '../auctions/Tiers.scss';
import arrow from '../../assets/images/arrow.svg';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import infoIcon from '../../assets/images/icon.svg';

const Create = () => {
  const history = useHistory();
  const [hideIcon, setHideIcon] = useState(false);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideIcon2, setHideIcon2] = useState(false);
  const { auction, setAuction, bidtype, setBidtype, options } = useContext(AppContext);
  const [minBid, setMinBId] = useState(false);
  const bid = options.find((element) => element.value === bidtype);

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

  const handeClick = (e) => {
    setMinBId(e.target.checked);
  };
  const location = useLocation();
  const tierId = location.state;
  const tierById = auction.tiers.find((element) => element.id === tierId);
  console.log(auction);
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
    const value = event.target.value.replace(/[^\d]/, '');
    if (event.target.id === 'winners') {
      if (parseInt(value, 10) !== 0 && (parseInt(value, 10) < 21 || !value)) {
        setValues((prevValues) => ({ ...prevValues, [event.target.id]: value }));
      }
    } else if (event.target.id === 'nftsPerWinner') {
      if (parseInt(value, 10) !== 0 && (parseInt(value, 10) < 6 || !value)) {
        setValues((prevValues) => ({ ...prevValues, [event.target.id]: value }));
      }
    } else {
      setValues((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
    }
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
    <>
      <div className="background-part">
        <div className="container create-tiers">
          <div
            className="back-rew"
            onClick={() => {
              history.push('/setup-auction/reward-tiers');
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
                Each reward tier can contain up to 20 winners and up to 5 NFTs for each winner
                (total: 100 NFTs).
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="tier-info container">
        <p className="tier-setting">Tier settings</p>
        <div className="tiersInp">
          <div>
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
              type="text"
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
              type="text"
              error={isValidFields.nftsPerWinner ? undefined : 'NFTs per winner is required!'}
              className="inp"
              value={values.nftsPerWinner}
              onChange={handleChange}
            />
          </div>
          <div className="minBidPart">
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
              <div className="tiers-part">
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <span className="bid-type">
                    {bid.img && <img src={bid.img} alt="icon" />}
                    <span className="button-name">{bid.name}</span>
                  </span>

                  <Input type="number" name="tierBid" placeholder="0.1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Create;
