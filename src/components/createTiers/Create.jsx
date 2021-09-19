import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import './CreateTiers.scss';
import '../auctions/Tiers.scss';
import Wallet from '../myNFTs/Wallet';
import '../myNFTs/MyNFTs.scss';
import arrow from '../../assets/images/arrow.svg';
import AppContext from '../../ContextAPI';
import Input from '../input/Input.jsx';
import infoIcon from '../../assets/images/icon.svg';
import { useAuctionContext } from '../../contexts/AuctionContext';
// import UniverseNFTs from '../myNFTs/UniverseNFTs';

const Create = () => {
  const history = useHistory();
  const [hideIcon, setHideIcon] = useState(false);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideIcon2, setHideIcon2] = useState(false);
  const { auction, setAuction, bidtype, setBidtype, options } = useAuctionContext();
  const [minBid, setMinBId] = useState(false);
  const [minBidValue, setMinBidValue] = useState('');
  const bid = options.find((element) => element.value === bidtype);

  const [selectedNFTIds, setSelectedNFTIds] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);

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
  const tierById = auction?.rewardTiers?.find((element) => element.id === tierId);

  useEffect(() => {
    if (values.name) {
      if (isValidFields.name && isValidFields.winners && isValidFields.nftsPerWinner) {
        if (tierId) {
          setAuction({
            ...auction,
            rewardTiers: [
              ...auction?.rewardTiers?.filter((tier) => tier.id !== tierId),
              { ...tierById, ...values },
            ],
          });
        } else {
          const createdTierId = uuid();
          setAuction({
            ...auction,
            rewardTiers: [
              ...auction.rewardTiers,
              { ...values, id: createdTierId, nfts: [], minBid: '' },
            ],
          });
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
      if (tierById.minBidValue) {
        setMinBidValue(tierById.minBidValue);
        setMinBId(true);
      }
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
          <div className="inps">
            <Input
              id="name"
              error={isValidFields.name ? undefined : 'Tier name is required!'}
              label="Tier name"
              className="inp"
              hoverBoxShadowGradient
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
                  <div className="info-text t1">
                    <p>Amount of people who will get NFTs from the current reward tier.</p>
                  </div>
                )}
              </span>
            </div>
            <Input
              id="winners"
              type="text"
              hoverBoxShadowGradient
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
                  <div className="info-text t2">
                    <p>Amount of NFTs each winner of this reward tier is going to get.</p>
                  </div>
                )}
              </span>
            </div>
            <Input
              id="nftsPerWinner"
              type="text"
              hoverBoxShadowGradient
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
                  onMouseOver={() => setHideIcon(true)}
                  onFocus={() => setHideIcon(true)}
                  onMouseLeave={() => setHideIcon(false)}
                  onBlur={() => setHideIcon(false)}
                />
                <label className="switch">
                  <input type="checkbox" value={minBid} checked={minBid} onChange={handeClick} />
                  <span className="slider round" />
                </label>
                {hideIcon && (
                  <div className="info-text">
                    <p>
                      Minimum bid parameter may be used to make sure that NFTs from the tier will
                      not be sold under the target price value.
                    </p>
                  </div>
                )}
              </div>

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
            <div className="tiers-inp">
              <div className="tiers-part">
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <span className={minBid === true ? 'bid-type' : 'bid-type disabled'}>
                    {bid.img && <img src={bid.img} alt="icon" />}
                    <span className="button-name">{bid.name}</span>
                  </span>
                  {minBid === true ? (
                    <Input
                      type="number"
                      name="tierBid"
                      placeholder="0.1"
                      value={minBidValue}
                      onChange={(e) => setMinBidValue(e.target.value)}
                      hoverBoxShadowGradient
                    />
                  ) : (
                    <Input type="number" name="tierBid" placeholder="0.1" disabled />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="hr-line" />
      <div className="selectNftPart container">
        <h1>Select NFTs</h1>
        <p>
          You can only select minted NFTs from your wallet. If you want to create NFTs, go to&nbsp;
          <Link to="/my-nfts">Minting.</Link>
          <p className="second-line">
            Your progress with the current auction will be automatically saved.
          </p>
        </p>
        <Wallet
          filteredNFTs={filteredNFTs}
          setFilteredNFTs={setFilteredNFTs}
          selectedNFTIds={selectedNFTIds}
          setSelectedNFTIds={setSelectedNFTIds}
          tierName={values.name}
          winners={Number(values.winners)}
          nftsPerWinner={Number(values.nftsPerWinner)}
          minBidValue={minBidValue}
        />
        {/* <UniverseNFTs
          filteredNFTs={filteredNFTs}
          setFilteredNFTs={setFilteredNFTs}
          selectedNFTIds={selectedNFTIds}
          setSelectedNFTIds={setSelectedNFTIds}
          tierName={values.name}
          winners={Number(values.winners)}
          nftsPerWinner={Number(values.nftsPerWinner)}
          minBidValue={minBidValue}
        /> */}
      </div>
    </>
  );
};
export default Create;
