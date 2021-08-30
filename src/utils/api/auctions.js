const CREATE_NEW_AUCTION_URL = `${process.env.REACT_APP_API_BASE_URL}/api/auctions`;
const GET_FUTURE_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/future`;
const GET_ACTIVE_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/active`;
const GET_PAST_AUCTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-auctions/past`;
const EDIT_AUCTION_URL = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/auctions/${id}`;
const UPLAD_IMAGES_FOR_LANDING_PAGE_URL = (id) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/auctions/${id}/landing-files`;
const EDIT_REWARD_TIER_URL = (id) => `${process.env.REACT_APP_API_BASE_URL}/api/reward-tiers/${id}`;

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
    royaltySplits,
    rewardTiers,
  };

  const requestOptions = {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(requestBody),
  };

  const request = await fetch(CREATE_NEW_AUCTION_URL, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const editAuction = async (
  {
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
  },
  id
) => {
  const requestBody = {
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
  };

  const requestOptions = {
    method: 'patch',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(requestBody),
  };

  const request = await fetch(EDIT_AUCTION_URL(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const uploadImagesForTheLandingPage = async (id) => {
  const requestBody = {};

  const requestOptions = {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(requestBody),
  };

  const request = await fetch(UPLAD_IMAGES_FOR_LANDING_PAGE_URL(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const editRewardTier = async (
  { name, numberOfWinners, nftsPerWinner, minimumBid, nftIds },
  id
) => {
  const requestBody = {
    name,
    numberOfWinners,
    nftsPerWinner,
    minimumBid,
    nftIds,
  };

  const requestOptions = {
    method: 'patch',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(requestBody),
  };

  const request = await fetch(EDIT_REWARD_TIER_URL(id), requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getFutureAuctions = async () => {
  const requestOptions = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  };

  const request = await fetch(GET_FUTURE_AUCTIONS, requestOptions);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};
