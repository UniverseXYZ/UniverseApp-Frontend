/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import uuid from 'react-uuid';
import './CreateTiers.scss';
import '../auctions/Tiers.scss';
import Wallet from '../myNFTs/Wallet';
import '../myNFTs/MyNFTs.scss';
import arrow from '../../assets/images/arrow.svg';
import Input from '../input/Input.jsx';
import infoIcon from '../../assets/images/icon.svg';
import WinnerIcon from '../../assets/images/winner-icon.svg';
import { useAuctionContext } from '../../contexts/AuctionContext';
import CustomNftsSection from '../customNfts/CustomNftsSection';
import AvailabilityNFTCard from '../availableNFTCard';
import SearchFilters from '../nft/SearchFilters';
import SimplePagination from '../pagination/SimplePaginations';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown.jsx';
import CreatTiersStickyBar from '../CreateTiersStickyBar';

const ACTION_TYPES = {
  ADD: 'select-option',
  REMOVE_ALL: 'clear',
  REMOVE_SINGLE: 'remove-value',
  DESELECT_SINGLE: 'deselect-option',
};

const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
};

const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
};

const Create = () => {
  const history = useHistory();
  const [hideIcon, setHideIcon] = useState(false);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideIcon2, setHideIcon2] = useState(false);
  const {
    auction,
    setAuction,
    bidtype,
    setBidtype,
    options,
    availableNFTs,
    setAvailableNFTs,
    getAvailableNFTs,
  } = useAuctionContext();

  const [minBid, setMinBId] = useState(false);
  const [custom, setCustom] = useState(false);
  const [minBidValue, setMinBidValue] = useState('');
  const bid = options.find((element) => element.value === bidtype);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(8);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [values, setValues] = useState({
    name: '',
    numberOfWinners: 1,
    nftsPerWinner: null,
  });
  const [isValidFields, setIsValidFields] = useState({
    name: true,
    numberOfWinners: true,
    nftsPerWinner: true,
  });
  const [selectAll, setSelectAll] = useState(false);

  const handeClick = (e) => {
    setMinBId(e.target.checked);
  };

  const location = useLocation();
  const tierId = location.state;
  const editedTier = auction?.rewardTiers?.find((element) => element.id === tierId);
  const maxWinner = 11; // TODO:: where the heck this came from ?

  useEffect(() => {
    if (values.name) {
      if (isValidFields.name && isValidFields.numberOfWinners && isValidFields.nftsPerWinner) {
        if (tierId) {
          setAuction({
            ...auction,
            rewardTiers: [
              ...auction?.rewardTiers?.filter((tier) => tier.id !== tierId),
              { ...editedTier, ...values },
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

  const handleChange = (event) => {
    const value = event.target.value.replace(/[^\d]/, '');
    if (event.target.id === 'numberOfWinners') {
      // If the input is cleared reassign the value to 0 instead of empty string
      const v = (value && parseInt(value, 10)) || 0;
      if (parseInt(value, 10) !== 0 && (parseInt(value, 10) < maxWinner || !value)) {
        setValues((prevValues) => ({ ...prevValues, [event.target.id]: v }));
      }
    } else if (event.target.id === 'nftsPerWinner') {
      const v = (value && parseInt(value, 10)) || 0;
      if (parseInt(value, 10) !== 0 && (parseInt(value, 10) < 6 || !value)) {
        setValues((prevValues) => ({ ...prevValues, [event.target.id]: v }));
      }
    } else {
      setValues((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
    }
  };

  useEffect(async () => {
    const available = await getAvailableNFTs();
    if (available.nfts.length) {
      const parsedForFilters = available.nfts.map((data) => ({ ...data, ...data.nfts }));

      setAvailableNFTs(parsedForFilters);
      setFilteredNFTs(parsedForFilters);
    }
  }, []);

  // Custom Slots distribution logic
  const [selectedWinner, setSelectedWinner] = useState(0);

  // [{slot: int, nftIds: [44,56], nftsData: [{id, slot, url, artworkType, nftName, collectionName, collectionAddress, collectionUrl}]}]
  const [winnersData, setWinnersData] = useState([]);

  const onEditionClick = (data, actionMeta) => {
    if (!data) return;

    if (custom) {
      const winnersCopy = [...winnersData];

      if (actionMeta.action === ACTION_TYPES.ADD) {
        const [
          edition,
          id,
          url,
          artworkType,
          nftName,
          collectioName,
          collectionAddress,
          collectionUrl,
        ] = actionMeta.option.value.split('||');

        winnersCopy[selectedWinner].nftsData.push({
          slot: selectedWinner,
          id: parseInt(id, 10),
          url,
          artworkType,
          nftName,
          collectioName,
          collectionAddress,
          collectionUrl,
        });

        if (actionMeta.option?.value === 'select-all') {
          setSelectAll(true);
          return;
        }

        winnersCopy[selectedWinner].nftIds.push(parseInt(id, 10));
      }

      if (actionMeta.action === ACTION_TYPES.REMOVE_ALL) {
        const removedIds = actionMeta.removedValues.map(({ value }) => value.split('||')[1]);
        winnersCopy[selectedWinner].nftsData = winnersCopy[selectedWinner].nftsData.filter(
          (nft) => !removedIds.includes(nft.id)
        );
      }

      if (actionMeta.action === ACTION_TYPES.REMOVE_SINGLE) {
        const removedId = actionMeta.removedValue.value.split('||')[1];
        winnersCopy[selectedWinner].nftsData = winnersCopy[selectedWinner].nftsData.filter(
          (nft) => nft.id !== removedId
        );
      }
      if (actionMeta.action === ACTION_TYPES.DESELECT_SINGLE) {
        const [edition, id, url, artworkType] = actionMeta.option.value.split('||');
        winnersCopy[selectedWinner].nftsData = winnersCopy[selectedWinner].nftsData.filter(
          (nft) => nft.id !== parseInt(id, 10)
        );
      }

      setWinnersData(winnersCopy);
    }
  };

  const prepareSlotsData = (n) => {
    let slot = 0;
    const winners = [];

    while (slot < n) {
      winners.push({ slot, nftsData: [], nftIds: [] });
      slot += 1;
    }

    return winners;
  };

  const handleContinue = (winnersSlots) => {
    const nftSlots = winnersSlots.map((slot) => {
      const slotCopy = { ...slot };
      slotCopy.nftIds = slot.nftsData.map((data) => {
        const id = typeof data === 'object' ? data.id : data;
        return id;
      });
      return slotCopy;
    });

    if (!editedTier) {
      const auctionUpdated = {
        ...auction,
        rewardTiers: [
          ...auction?.rewardTiers,
          {
            id: uuid(),
            name: values.name,
            winners: Number(values.numberOfWinners),
            nftsPerWinner: values.nftsPerWinner || 0,
            minBidValue,
            nftSlots,
            customNFTsPerWinner: custom,
          },
        ],
      };

      setAuction(auctionUpdated);
    } else {
      // Create auction copy and update the reward tier
      const auctionCopy = { ...auction };

      // Mutate the edited tear
      auctionCopy?.rewardTiers?.forEach((tier) => {
        if (tier.id === editedTier.id) {
          tier.name = values.name;
          tier.winners = values.numberOfWinners;
          tier.nftsPerWinner = values.nftsPerWinner;
          tier.minBidValue = minBidValue;
          tier.nftSlots = nftSlots;
        }
      });

      // Update the auction
      setAuction(auctionCopy);
    }
    history.push('/setup-auction/reward-tiers');
  };

  useEffect(() => {
    if (custom) {
      const winners = prepareSlotsData(values.numberOfWinners);
      setWinnersData(winners);
    } else setWinnersData([]);
  }, [custom]);

  useEffect(async () => {
    // Const if we are editing Tier we will pass this if check and pre-populate the Data
    if (editedTier) {
      const { name, numberOfWinners, winners, customNFTsPerWinner, nftsPerWinner } = editedTier;

      const minAuctionBid = editedTier.bidValue || editedTier.minimumBid;

      const isCustom = customNFTsPerWinner || parseInt(nftsPerWinner, 10) === 0;
      await setCustom(isCustom);
      setValues({
        name,
        numberOfWinners: numberOfWinners || winners,
        nftsPerWinner,
      });

      if (minAuctionBid) {
        setMinBidValue(minAuctionBid);
        setMinBId(true);
      }

      // We must populate Winners Data, we have prepared nftSlots in the NewTabs.jsx component
      // We have already prepared the winnersData object to be ready to accept the data upon triggering the custom watcher useEffect
      const winnersDataCopy = [...winnersData];

      if (editedTier.nftSlots) {
        editedTier.nftSlots.forEach((slotInfo) => {
          winnersDataCopy[slotInfo.slot] = slotInfo;
        });
      }

      setWinnersData([...winnersDataCopy]);
    }
  }, [editedTier]);

  const canSelectNFT = values.numberOfWinners && (values.nftsPerWinner || custom);
  const canContinue = winnersData.every((data) => data.nftsData.length > 0) && custom;
  const availableNFTsTolist = filteredNFTs.filter(
    ({ nfts }) => nfts.rewardAndTokenIds.filter((nft) => nft.slot !== 0 && !nft.slot).length > 0
  );

  // End Custom Slots distribution logic

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
                Each reward tier can contain up to 10 winners and up to 5 NFTs for each winner
                (total: 50 NFTs).
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
              onChange={(e) => {
                if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.name) return;
                handleChange(e);
              }}
            />
            <p className="input-max-chars">
              Characters: {values.name.length}/{MAX_FIELD_CHARS_LENGTH.name}
            </p>
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
              id="numberOfWinners"
              type="text"
              hoverBoxShadowGradient
              error={isValidFields.numberOfWinners ? undefined : 'Number of winners is required!'}
              className="inp"
              value={values.numberOfWinners}
              disabled={custom}
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
              <CustomNftsSection
                custom={custom}
                setCustom={setCustom}
                values={values}
                setValues={setValues}
              />
            </div>
            <Input
              id="nftsPerWinner"
              type="text"
              hoverBoxShadowGradient
              error={isValidFields.nftsPerWinner ? undefined : 'NFTs per winner is required!'}
              disabled={custom}
              placeholder={custom && 'Custom'}
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
                      onChange={(e) => {
                        if (e.target.value && Number(e.target.value) < 0) e.target.value = '';
                        setMinBidValue(e.target.value);
                      }}
                      hoverBoxShadowGradient
                      onWheel={(e) => e.target.blur()}
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
        {custom && (
          <div className="winner__lists">
            {values.numberOfWinners &&
              winnersData.map((data, i) => {
                const winnerNumber = i + 1;
                return (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div
                    className={selectedWinner === i ? 'winner-box selected' : 'winner-box'}
                    key={uuid()}
                    onClick={() => setSelectedWinner(i)}
                  >
                    <img src={WinnerIcon} alt="winner-icon" />
                    <p>Winner #{winnerNumber}</p>
                    <span>
                      {data.nftsData.length}
                      NFTs
                    </span>
                    <div className="box--shadow--effect--block" />
                  </div>
                );
              })}
          </div>
        )}
        {
          // ----- Custom distribution -----
          // TODO:: When an edition dropdown is opened, if you click eslwhere on the page, close the dropdown
          // TODO:: Make the whole dropdown button click to open the menu
          // ----- Stick menu -----
          // TODO:: Sticky menu css and component dev -> Ping Dima when the time comes
          // TODO:: Sticky menu, delete functionality
          // ----- Default Distribution ----
          // TODO:: Upon default distribution - attach selected nfts & editions to all winners based on slot sequence
          // TODO:: Upon Default Distribution if the user enters nfts per winner number, we should fetch all user nfts applicable to this editions number
        }
        <SearchFilters data={availableNFTs} setData={setFilteredNFTs} setOffset={() => {}} />
        <div className="nfts__lists">
          {availableNFTsTolist.slice(offset, offset + perPage).map((data) => (
            <AvailabilityNFTCard
              key={data.nfts.id}
              data={data}
              selectAll={selectAll}
              onEditionClick={onEditionClick}
              canSelect={canSelectNFT}
              winnersData={winnersData}
              selectedWinner={selectedWinner}
              auction={auction}
            />
          ))}
        </div>
        <div className="pagination__container">
          <SimplePagination
            data={availableNFTs}
            perPage={perPage}
            setOffset={setOffset}
            setPage={setPage}
            page={page}
          />
          <ItemsPerPageDropdown
            perPage={perPage}
            setPerPage={setPerPage}
            itemsPerPage={[8, 16, 32]}
          />
        </div>
        <CreatTiersStickyBar
          winnersData={winnersData}
          tierSettings={values}
          handleContinue={handleContinue}
          disabled={canContinue}
        />
      </div>
    </>
  );
};
export default Create;
