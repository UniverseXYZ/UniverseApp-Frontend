import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import uuid from 'react-uuid';
import './CreateTiers.scss';
import '../auctions/Tiers.scss';
import '../myNFTs/MyNFTs.scss';
import Input from '../input/Input.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext';
import AvailabilityNFTCard from '../availableNFTCard';
import SearchFilters from '../nft/SearchFilters';
import CreatTiersStickyBar from '../CreateTiersStickyBar';
import AvailableNFTCardSkeleton from '../availableNFTCard/skeleton/AvailableNFTCardSkeleton';
import LoadMore from '../pagination/LoadMore';
import NumberOfWinners from './NumberOfWinners';
import arrow from '../../assets/images/arrow.svg';
import IncludeReservePrice from './IncludeReservePrice';
import WinnersList from './winners/WinnersList';

const ACTION_TYPES = {
  ADD: 'select-option',
  REMOVE_ALL: 'clear',
  REMOVE_SINGLE: 'remove-value',
  DESELECT_SINGLE: 'deselect-option',
};

const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
};

const LOAD_NFTS_COUNT = 8;

const Create = () => {
  const { auction, setAuction, availableNFTs, setAvailableNFTs, getAvailableNFTs } =
    useAuctionContext();

  const history = useHistory();
  const location = useLocation();
  const tierId = location.state;
  const editedTier = auction?.rewardTiers?.find((element) => element.id === tierId);

  const [showReservePrice, setShowReservePrice] = useState(false);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [values, setValues] = useState({
    name: '',
    numberOfWinners: 1,
  });
  const [tierNameError, setTierNameError] = useState('');

  // [{slot: int, nftIds: [44,56], nftsData: [{id, slot, url, artworkType, nftName, collectionName, collectionAddress, collectionUrl}]}]
  const [winnersData, setWinnersData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    if (values.name) {
      if (!tierNameError) {
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
  }, [tierNameError]);

  const handleTierNameChange = (value) => {
    if (value.length <= MAX_FIELD_CHARS_LENGTH.name) {
      setValues((prevValues) => ({ ...prevValues, name: value }));
      if (!value) {
        setTierNameError('This field is not allowed to be empty');
      } else {
        setTierNameError('');
      }
    }
  };

  useEffect(async () => {
    setFetchingData(true);
    const available = await getAvailableNFTs();
    if (available.nfts.length) {
      const parsedForFilters = available.nfts.map((data) => ({ ...data, ...data.nfts }));

      setAvailableNFTs(parsedForFilters);
      setFilteredNFTs(parsedForFilters);
    }

    setFetchingData(false);
  }, []);

  // Custom Slots distribution logic
  const [selectedWinner, setSelectedWinner] = useState(0);

  const onEditionClick = (data, actionMeta) => {
    if (!data) return;

    const winnersCopy = [...winnersData];

    if (actionMeta.action === ACTION_TYPES.ADD) {
      // If the option is select all, we will receive all the available editions to select in array
      const selectedValues =
        actionMeta.option?.label === 'Select all'
          ? actionMeta.option.value.selectValues
          : [actionMeta.option];

      selectedValues.forEach((d) => {
        const [
          edition,
          id,
          url,
          artworkType,
          name,
          collectioName,
          collectionAddress,
          collectionUrl,
        ] = d.value.split('||');

        winnersCopy[selectedWinner].nftsData.push({
          slot: selectedWinner,
          id: parseInt(id, 10),
          url,
          artworkType,
          name,
          collectioName,
          collectionAddress,
          collectionUrl,
          tokenId: parseInt(edition, 10),
        });

        winnersCopy[selectedWinner].nftIds.push(parseInt(id, 10));
      });
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
      const deselectedValues =
        actionMeta.option?.label === 'Select all'
          ? actionMeta.option.value.deselectValues
          : [actionMeta.option];

      const delesectIds = deselectedValues.map((option) => {
        const [edition, id, url, artworkType] = option.value.split('||');
        return parseInt(id, 10);
      });

      winnersCopy[selectedWinner].nftsData = winnersCopy[selectedWinner].nftsData.filter(
        (nft) => !delesectIds.includes(parseInt(nft.id, 10))
      );

      winnersCopy[selectedWinner].nftIds = winnersCopy[selectedWinner].nftIds.filter(
        (_id) => !delesectIds.includes(parseInt(_id, 10))
      );
    }

    setWinnersData(winnersCopy);
  };

  const onRemoveEdition = (editions) => {
    const winnersCopy = [...winnersData];
    winnersCopy.forEach((winner) => {
      const { nftsData } = winner;
      const updatedNftsData = nftsData.filter((nft) => editions.indexOf(nft.tokenId) === -1);
      const updatedNftIds = updatedNftsData.map((nft) => nft.id);
      winner.nftsData = updatedNftsData;
      winner.nftIds = updatedNftIds;
    });

    setWinnersData(winnersCopy);
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
            id: `new-tier-${uuid()}`, // Tiers with 'new-tier' IDs attached to them indicates that those are new tiers, that needs to be added to the Auction
            name: values.name,
            winners: Number(values.numberOfWinners),
            nftSlots,
          },
        ],
      };

      setAuction(auctionUpdated);
    } else {
      // Create auction copy and update the reward tier
      const auctionCopy = { ...auction };

      // Mutate the edited tier
      auctionCopy?.rewardTiers?.forEach((tier) => {
        if (tier.id === editedTier.id) {
          tier.name = values.name;
          tier.winners = values.numberOfWinners;
          tier.nftSlots = nftSlots;
        }
      });

      // Update the auction
      setAuction(auctionCopy);
    }
    history.push('/setup-auction/reward-tiers');
  };

  useEffect(() => {
    const winners = prepareSlotsData(values.numberOfWinners);
    setWinnersData(winners);
    if (selectedWinner + 1 > values.numberOfWinners) {
      setSelectedWinner(values.numberOfWinners - 1);
    }
  }, [values.numberOfWinners]);

  useEffect(async () => {
    // Const if we are editing Tier we will pass this if check and pre-populate the Data
    if (editedTier) {
      const { name, numberOfWinners, winners } = editedTier;

      setValues({
        name,
        numberOfWinners: numberOfWinners || winners,
      });

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

  const canSelectNFT = values.numberOfWinners;
  const canContinue = winnersData.every((data) => data.nftsData?.length > 0) && values.name;

  // Map the rewardAndTokenIds to return only those who doesn't have slot attached to them or the rewardTiers is from this auction
  let availableNFTsTolist = [...filteredNFTs];
  availableNFTsTolist.forEach((data) => {
    const updatedRewardAndTokenIds = data.nfts.rewardAndTokenIds.filter((token) => {
      const { rewardTierId, slot } = token;
      const inSameAuction = auction.rewardTiers.find((t) => t.id === rewardTierId);
      const notAttachedToSlot = slot !== 0 && !slot;
      return inSameAuction || notAttachedToSlot;
    });

    data.nfts.rewardAndTokenIds = updatedRewardAndTokenIds;
  });
  availableNFTsTolist = availableNFTsTolist.filter((nft) => nft.nfts.rewardAndTokenIds.length);

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
      <div className="tier--info container">
        <div className="tier--name--and--number--of--winners">
          <div className="tier--name">
            <Input
              id="name"
              error={tierNameError}
              label="Tier name"
              placeholder="Tier name"
              className="inp"
              hoverBoxShadowGradient
              value={values.name}
              onChange={(e) => {
                handleTierNameChange(e.target.value);
              }}
            />
            <p className="input-max-chars">
              {values.name.length}/{MAX_FIELD_CHARS_LENGTH.name}
            </p>
          </div>
          <NumberOfWinners values={values} setValues={setValues} />
        </div>
        <IncludeReservePrice
          showReservePrice={showReservePrice}
          setShowReservePrice={setShowReservePrice}
        />
        <WinnersList
          winnersData={winnersData}
          setWinnersData={setWinnersData}
          selectedWinner={selectedWinner}
          setSelectedWinner={setSelectedWinner}
          showReservePrice={showReservePrice}
        />
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
        <SearchFilters data={availableNFTs} setData={setFilteredNFTs} setOffset={() => {}} />
        <div className="nfts__lists">
          {fetchingData ? (
            <>
              <AvailableNFTCardSkeleton />
              <AvailableNFTCardSkeleton />
              <AvailableNFTCardSkeleton />
            </>
          ) : availableNFTsTolist.length ? (
            availableNFTsTolist
              .slice(offset, offset + perPage)
              .map((data, index) => (
                <AvailabilityNFTCard
                  key={data.nfts.id}
                  data={data}
                  onEditionClick={onEditionClick}
                  canSelect={canSelectNFT}
                  winnersData={winnersData}
                  selectedWinner={selectedWinner}
                  auction={auction}
                />
              ))
          ) : (
            <>
              <p>No Available NFTs found</p>
            </>
          )}
        </div>
        <div className="pagination__container">
          {availableNFTsTolist.length > perPage && (
            <LoadMore quantity={perPage} setQuantity={setPerPage} perPage={LOAD_NFTS_COUNT} />
          )}
        </div>
        <CreatTiersStickyBar
          onRemoveEdition={onRemoveEdition}
          winnersData={winnersData}
          selectedWinner={selectedWinner}
          setSelectedWinner={setSelectedWinner}
          tierSettings={values}
          handleContinue={handleContinue}
          disabled={canContinue}
        />
      </div>
    </>
  );
};
export default Create;
