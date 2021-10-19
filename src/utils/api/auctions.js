/* eslint-disable no-unused-expressions */
const CREATE_NEW_AUCTION_URL = `${process.env.REACT_APP_API_BASE_URL}/api/auctions`;
const GET_FUTURE_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/future`;
const GET_ACTIVE_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/active`;
const GET_PAST_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/past`;
const EDIT_AUCTION_URL = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/auctions/${id}`;
const UPLAD_IMAGES_FOR_LANDING_PAGE_URL = (id) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/auctions/${id}/landing-files`;
const EDIT_REWARD_TIER_URL = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/reward-tiers/${id}`;
const EDIT_REWARD_TIER_IMAGE = (id) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/reward-tiers/${id}/image`;

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
    startingBid: startingBid ? parseInt(startingBid, 2) : null,
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

export const editRewardTier = async (
  { name, numberOfWinners, nftsPerWinner, minimumBid, nftIds, color, description },
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
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_FUTURE_AUCTIONS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getActiveAuctions = async () => {
  const requestOptions = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_FUTURE_AUCTIONS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getPastAuctions = async () => {
  const requestOptions = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_FUTURE_AUCTIONS, requestOptions);

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
