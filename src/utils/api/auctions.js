/* eslint-disable no-unused-expressions */
const CREATE_NEW_AUCTION_URL = `${process.env.REACT_APP_API_BASE_URL}/api/auctions`;
const GET_FUTURE_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/future`;
const GET_ACTIVE_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/active`;
const GET_ALL_ACTIVE_AUCTIONS = (offset, limit) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/pages/auctions/active?offset=${offset}&limit=${limit}`;
const GET_ALL_FUTURE_AUCTIONS = (offset, limit) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/pages/auctions/future?offset=${offset}&limit=${limit}`;
const GET_AUCTION_DATA = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/pages/auctions/${id}`;
const GET_PAST_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/past`;
const EDIT_AUCTION_URL = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/auctions/${id}`;
const DELETE_FUTURE_AUCTION = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/auctions/${id}`;
const CANCEL_AUCTION = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/auctions/cancel/${id}`;
const UPLAD_IMAGES_FOR_LANDING_PAGE_URL = (id) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/auctions/${id}/landing-files`;
const EDIT_REWARD_TIER_URL = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/reward-tiers/${id}`;
const EDIT_REWARD_TIER_IMAGE = (id) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/reward-tiers/${id}/image`;
const GET_AVAILABLE_NFTS = (offset, limit) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/nfts/my-nfts/availability?offset=${offset}&limit=${limit}`;
const ADD_DEPLOY_INFO = `${process.env.REACT_APP_API_BASE_URL}/api/auctions/deploy`;
const DEPOSIT_NFTS_TO_AUCTION = `${process.env.REACT_APP_API_BASE_URL}/api/auctions/depositNfts`;
const WITHDRAW_NFTS_FROM_AUCTION = `${process.env.REACT_APP_API_BASE_URL}/api/auctions/withdrawNfts`;
const GET_AUCTION_LANDING_PAGE = (username, auctionName) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/pages/auctions/${username}/${auctionName}`;
const PLACE_AUCTION_BID = `${process.env.REACT_APP_API_BASE_URL}/api/auction/placeBid`;
const ADD_REWARD_TIER_TO_AUCTION = `${process.env.REACT_APP_API_BASE_URL}/api/add-reward-tier`;
const GET_MY_BIDS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-bids`;
const REMOVE_REWARD_TIER_FROM_AUCTION = `${process.env.REACT_APP_API_BASE_URL}/api/reward-tiers/`;
const CANCEL_AUCTION_BID = (id) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/auction/${id}/cancelBid`;
const CHANGE_AUCTION_STATUS = `${process.env.REACT_APP_API_BASE_URL}/api/auction/status`;
const CLAIM_AUCTION_FUNDS = `${process.env.REACT_APP_API_BASE_URL}/api/auction/claimFunds`;

export const createAuction = async ({
  name,
  startingBid,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  startDate,
  endDate,
  royaltySplits,
  rewardTiers,
}) => {
  const requestBody = {
    name,
    startingBid,
    tokenAddress,
    tokenSymbol,
    tokenDecimals,
    startDate,
    endDate,
    royaltySplits: royaltySplits && royaltySplits.length ? royaltySplits : null,
    rewardTiers,
  };

  const requestOptions = {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(requestBody),
  };

  const request = await fetch(CREATE_NEW_AUCTION_URL, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const editAuction = async ({
  id,
  name,
  startingBid,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  startDate,
  endDate,
  royaltySplits,
  headline,
  link,
  backgroundImageBlur,
}) => {
  const requestBody = {
    id,
    name,
    startingBid: Number(startingBid) || 0,
    tokenAddress,
    tokenSymbol,
    tokenDecimals,
    startDate: startDate.toISOString ? startDate.toISOString() : startDate,
    endDate: endDate.toISOString ? endDate.toISOString() : endDate,
    royaltySplits: royaltySplits && royaltySplits.length ? royaltySplits : null,
    headline,
    link,
    backgroundImageBlur,
  };

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(requestBody),
  };

  const request = await fetch(EDIT_AUCTION_URL(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const deleteFutureAuction = async (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(DELETE_FUTURE_AUCTION(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

export const editRewardTier = async (
  { name, numberOfWinners, nftsPerWinner, minimumBid, nftIds, color, description, nftSlots },
  id
) => {
  const requestBody = {
    name,
    numberOfWinners,
    nftsPerWinner,
    minimumBid,
    nftIds,
    color,
    description,
  };

  if (nftSlots) {
    requestBody.nftSlots = nftSlots;
  }

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(requestBody),
  };

  const request = await fetch(EDIT_REWARD_TIER_URL(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const editRewardTierImage = async (image = null, id) => {
  if (!id) {
    console.error('Missing id, please provide it !');
    return false;
  }
  const formData = new FormData();

  image && formData.append('image', image);

  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: formData,
  };

  const request = await fetch(EDIT_REWARD_TIER_IMAGE(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getFutureAuctions = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_FUTURE_AUCTIONS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getAllFutureAuctions = async (offset, limit) => {
  const request = await fetch(GET_ALL_FUTURE_AUCTIONS(offset, limit));

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getActiveAuctions = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_ACTIVE_AUCTIONS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getAllActiveAuctions = async (offset, limit) => {
  const request = await fetch(GET_ALL_ACTIVE_AUCTIONS(offset, limit));

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getAuctionData = async (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_ACTIVE_AUCTIONS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getPastAuctions = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_PAST_AUCTIONS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getMyBids = async () => {
  const requestOptions = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_MY_BIDS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

// Customise Auction Landing Page

export const uploadImagesForTheLandingPage = async (
  promoImage = null,
  bgImage = null,
  id = null
) => {
  if (!id) {
    console.error('Missing id, please provide it !');
    return false;
  }

  const formData = new FormData();
  promoImage && formData.append('promo-image', promoImage);
  bgImage && formData.append('background-image', bgImage);

  const requestOptions = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: formData,
  };

  const request = await fetch(UPLAD_IMAGES_FOR_LANDING_PAGE_URL(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

// Create Auction Tier
export const getAvailableNFTs = async (offset, limit) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  // TODO:: Discuss how much NFTS needs to fetch
  const request = await fetch(`${GET_AVAILABLE_NFTS(offset, limit)}`, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const addDeployInfoToAuction = async (body) => {
  const requestOptions = {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(body),
  };

  const request = await fetch(ADD_DEPLOY_INFO, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const depositNfts = async (body) => {
  const requestOptions = {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(body),
  };

  const request = await fetch(DEPOSIT_NFTS_TO_AUCTION, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const withdrawNfts = async (body) => {
  const requestOptions = {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(body),
  };

  const request = await fetch(WITHDRAW_NFTS_FROM_AUCTION, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getAuctionLandingPage = async (username, auctionName) => {
  const requestOptions = {
    method: 'GET',
  };

  const url = GET_AUCTION_LANDING_PAGE(username, auctionName);
  const request = await fetch(url, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const placeAuctionBid = async (body) => {
  const requestOptions = {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(body),
  };

  const request = await fetch(PLACE_AUCTION_BID, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const cancelAuctionBid = async (auctionId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(CANCEL_AUCTION_BID(auctionId), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const changeAuctionStatus = async (body) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(body),
  };

  const request = await fetch(CHANGE_AUCTION_STATUS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const removeRewardTier = async (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(`${REMOVE_REWARD_TIER_FROM_AUCTION}${id}`, requestOptions);
  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

export const addRewardTier = async (body) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(body),
  };

  const request = await fetch(ADD_REWARD_TIER_TO_AUCTION, requestOptions);
  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

export const claimAuctionFunds = async (body) => {
  const requestOptions = {
    method: 'PATCH',
    body: JSON.stringify(body),
  };

  const request = await fetch(CLAIM_AUCTION_FUNDS, requestOptions);
  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

export const cancelAuction = async (id) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(CANCEL_AUCTION(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};
