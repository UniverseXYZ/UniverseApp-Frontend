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
import { TIER_SETTINGS_LIMITATION } from '../../utils/config';

const ACTION_TYPES = {
  ADD: 'select-option',
  REMOVE_ALL: 'clear',
  REMOVE_SINGLE: 'remove-value',
  DESELECT_SINGLE: 'deselect-option',
};

const MAX_FIELD_CHARS_LENGTH = {
  name: 100,
};

const Create = () => {
  const { auction, setAuction, availableNFTs, setAvailableNFTs, getAvailableNFTs } =
    useAuctionContext();
  const history = useHistory();
  const location = useLocation();
  const tierId = location.state;
  const editedTier = auction?.rewardTiers?.find((element) => element.id === tierId);

  const [currentTierId, setCurrentTierId] = useState(null);
  const [showReservePrice, setShowReservePrice] = useState(false);

  const [offset, setOffset] = useState(0);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [values, setValues] = useState({
    name: '',
    numberOfWinners: 1,
  });
  const [tierNameError, setTierNameError] = useState('');

  // [{slot: int, minimumBid: int, nftIds: [44,56], nftsData: [{id, slot, url, artworkType, nftName, collectionName, collectionAddress, collectionUrl}]}]
  const [winnersData, setWinnersData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const perPage = 20;
  useEffect(async () => {
    setFetchingData(true);
    try {
      const id = typeof auction.id === 'string' ? '' : auction.id;
      const available = await getAvailableNFTs(offset, perPage, id);
      if (available?.nfts?.length) {
        const parsedForFilters = available.nfts.map((data) => ({ ...data, ...data.nfts }));

        setAvailableNFTs(parsedForFilters);
        setFilteredNFTs(parsedForFilters);
        setOffset(offset + perPage);
      }

      if (available.pagination?.hasNextPage) {
        setLoadMore(true);
      }
    } catch (error) {
      console.error(error);
    }

    setFetchingData(false);
  }, []);

  // Custom Slots distribution logic
  const [selectedWinner, setSelectedWinner] = useState(0);

  const onEditionClick = (data, actionMeta) => {
    if (!data) return;

    const winnersCopy = [...winnersData];

    if (actionMeta.action === ACTION_TYPES.ADD) {
      const winnerNFTsCount = winnersCopy[selectedWinner].nftIds.length;
      // Return if the user has reached max nfts count
      if (winnerNFTsCount === TIER_SETTINGS_LIMITATION.MAX_WINNER_NFT_COUNT) return;

      const leftNTFsCount = TIER_SETTINGS_LIMITATION.MAX_WINNER_NFT_COUNT - winnerNFTsCount;

      // If the option is select all, we will receive all the available editions to select in array
      const selectedValues =
        actionMeta.option?.label === 'Select all'
          ? actionMeta.option.value.selectValues
          : [actionMeta.option];

      // Loop only trough the available NFTs space to the winner
      selectedValues.slice(0, leftNTFsCount).forEach((d) => {
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
          collectionUrl: collectionUrl === 'null' ? JSON.parse('null') : collectionUrl,
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
      winners.push({ slot, nftsData: [], nftIds: [], minimumBid: 0 });
      slot += 1;
    }
    return winners;
  };

  const parseNFTsPerWinnerRange = (slots) => {
    const slotsNFTsCount = slots.map((s) => s.nftIds.length);
    const sortedAscending = slotsNFTsCount.sort();
    const singleWinner = sortedAscending.length === 1;

    if (singleWinner) {
      return sortedAscending[0].toString();
    }

    const uniques = [...new Set(sortedAscending)];
    const sameRange = uniques.length === 1;

    if (sameRange) {
      return sortedAscending[0].toString();
    }

    // Return range value here
    const min = sortedAscending[0];
    const max = sortedAscending[sortedAscending.length - 1];
    return `${min} - ${max}`;
  };

  const compareSlotMinBidValueWithExistingTiers = (slotValue) => {
    const slotNumericValue = Number(slotValue);
    const notRemovedTiers = auction.rewardTiers.filter((t) => !t.removed);
    const currentTierIndex = notRemovedTiers.findIndex((t) => t.id === currentTierId);
    let prevTier = null;

    if (currentTierIndex === -1) {
      // This means that this tier has not been saved into the local state yet aka is New
      // So we asume that the last tier is the prev one
      prevTier = auction.rewardTiers[auction.rewardTiers.length - 1];
    } else {
      // Else we search for the index before the current tier
      prevTier = auction.rewardTiers[currentTierIndex - 1];
    }

    if (!prevTier) {
      // There is no need of other tiers min bid comparisons
      return true;
    }

    const lastTierSlot = prevTier.nftSlots[prevTier.nftSlots.length - 1];
    const validBid = lastTierSlot.minimumBid >= slotNumericValue;
    return validBid;
  };

  const handleContinue = (winnersSlots) => {
    const nftSlots = winnersSlots.map((slot) => {
      const slotCopy = { ...slot };
      if (!showReservePrice) {
        slotCopy.minimumBid = '0';
      }
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
            id: currentTierId, // Tiers with 'new-tier' IDs attached to them indicates that those are new tiers, that needs to be added to the Auction
            name: values.name,
            winners: Number(values.numberOfWinners),
            nftSlots,
            nftsPerWinner: parseNFTsPerWinnerRange(nftSlots),
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
    // this means that this is the mount of the component;
    const currentWinnersCount = winnersData.length;
    if (!currentWinnersCount) {
      // If we are editing a tier, the data will be populated in the other useffect
      if (editedTier) return;

      const winners = prepareSlotsData(values.numberOfWinners);
      setWinnersData(winners);
    }

    const winnersCountChange = currentWinnersCount !== values.numberOfWinners;
    if (winnersCountChange) {
      let winnersCopy = [...winnersData];
      const shouldAddNewWinner = currentWinnersCount < values.numberOfWinners;

      if (shouldAddNewWinner) {
        const newWinner = prepareSlotsData(1)[0];
        newWinner.slot = winnersCopy.length;
        winnersCopy = [...winnersCopy, newWinner];
      } else {
        // Should remove winner
        winnersCopy.pop();
      }

      setWinnersData(winnersCopy);
    }

    if (selectedWinner + 1 > values.numberOfWinners) {
      setSelectedWinner(values.numberOfWinners - 1);
    }
  }, [values.numberOfWinners]);

  useEffect(async () => {
    // If we are editing Tier we will pass this if check and pre-populate the Data
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

      const hasReservedPrice = winnersDataCopy.some((w) => w.minimumBid > 0);
      setShowReservePrice(hasReservedPrice);
      setCurrentTierId(editedTier.id);
    } else if (!currentTierId) {
      // Create brand new ID, for the newly created Tier, so we can reference it upon min bid comparison
      const id = `new-tier-${uuid()}`;
      setCurrentTierId(id);
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

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const id = typeof auction.id === 'string' ? '' : auction.id;
      const available = await getAvailableNFTs(offset, perPage, id);
      if (available.nfts.length) {
        const parsedForFilters = available.nfts.map((data) => ({ ...data, ...data.nfts }));
        const updateAvailalbeNFTs = [...availableNFTs, ...parsedForFilters];
        setAvailableNFTs(updateAvailalbeNFTs);
        setFilteredNFTs(updateAvailalbeNFTs);
        setOffset(offset + perPage);
      }
      if (!available.pagination?.hasNextPage) {
        setLoadMore(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // TODO:: Update the follwoing text, based on the Limiations in the config

  return (
    <div className="create--reward--tiers--page">
      <div className="background-part">
        <div className="create-tiers">
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
              <h3 className="tier-title h3">Create reward tier</h3>
              <p className="create-p">
                Each reward tier can contain up to {TIER_SETTINGS_LIMITATION.MAX_WINNERS_COUNT}{' '}
                winners and up to {TIER_SETTINGS_LIMITATION.MAX_WINNER_NFT_COUNT} NFTs for each
                winner (total:{' '}
                {TIER_SETTINGS_LIMITATION.MAX_WINNERS_COUNT *
                  TIER_SETTINGS_LIMITATION.MAX_WINNER_NFT_COUNT}{' '}
                NFTs).
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
          <NumberOfWinners
            values={values}
            setValues={setValues}
            auction={auction}
            currentTierId={currentTierId}
          />
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
          compareSlotMinBidValueWithExistingTiers={compareSlotMinBidValueWithExistingTiers}
          currentTierId={currentTierId}
        />
      </div>
      <span className="hr-line" />
      <div className="selectNftPart container">
        <h1>Select NFTs for the Winner #{selectedWinner + 1}</h1>
        <p>
          You can only select minted NFTs from your wallet. If you want to create NFTs, go to&nbsp;
          <Link to="/my-nfts" target="_blank">
            Minting.
          </Link>
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
            availableNFTsTolist.map((data) => (
              <AvailabilityNFTCard
                key={data.nfts.id}
                data={data}
                onEditionClick={onEditionClick}
                canSelect={canSelectNFT}
                winnersData={winnersData}
                selectedWinner={selectedWinner}
                auction={auction}
                currentTierId={currentTierId}
              />
            ))
          ) : (
            <>
              <p>No Available NFTs found</p>
            </>
          )}
        </div>
        <div className="pagination__container">
          {!fetchingData && loadMore ? (
            <LoadMore disabled={loading} handleLoadMore={handleLoadMore} />
          ) : null}
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
    </div>
  );
};
export default Create;
