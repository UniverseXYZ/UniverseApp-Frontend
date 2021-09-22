const SAVE_PROFILE_INFO_URL = `${process.env.REACT_APP_API_BASE_URL}/api/user/save-profile-info`;
const UPLOAD_PROFILE_IMAGE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/user/upload-profile-image`;
const UPLOAD_LOGO_URL = `${process.env.REACT_APP_API_BASE_URL}/api/user/upload-logo-image`;
const GET_PROFILE_INFO_URL = `${process.env.REACT_APP_API_BASE_URL}/api/user/get-profile-info`;
const CHALLENGE_RUL = `${process.env.REACT_APP_API_BASE_URL}/api/auth/setChallenge`;
const LOGIN_URL = `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`;
const PROFILE_PAGE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/pages/user-profile`;

/**
 * @param {Object} loggedInArtist
 * @param {string} loggedInArtist.about
 * @param {string} loggedInArtist.avatar
 * @param {string} loggedInArtist.instagramLink
 * @param {string} loggedInArtist.name
 * @param {string} loggedInArtist.personalLogo
 * @param {string} loggedInArtist.twitterLink
 * @param {string} loggedInArtist.universePageAddress
 * @returns
 */
export const saveProfileInfo = async (loggedInArtist) => {
  // Construct it in order to match the expected object keys at the BE
  const requestData = {
    ...loggedInArtist,
    displayName: loggedInArtist.name,
    universePageUrl: loggedInArtist.universePageAddress,
    instagramUser: loggedInArtist.instagramLink,
    twitterUser: loggedInArtist.twitterLink,
  };

  const result = await fetch(SAVE_PROFILE_INFO_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({
      ...requestData,
    }),
  });

  if (!result.ok && result.status !== 201) {
    console.error(`Error while trying to save profile data: ${result.statusText}`);
  }

  return result;
};

/**
 * @param {Object} file image
 */
export const saveUserImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const request = await fetch(UPLOAD_PROFILE_IMAGE_URL, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: formData,
  });

  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

/**
 * @param {Object} file image
 */
export const saveUserLogo = async (file) => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const request = await fetch(UPLOAD_LOGO_URL, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: formData,
  });

  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

/**
 * @param {string} address user address
 * @returns {Object} result
 * @returns {string} result.about
 * @returns {string} result.address
 * @returns {string} result.createdAt
 * @returns {string} result.displayName
 * @returns {string} result.instagramUser
 * @returns {string} result.logoImageName
 * @returns {string} result.profileImageName
 * @returns {string} result.twitterUser
 * @returns {string} result.universePageUrl
 */
export const getProfileInfo = async (address) => {
  const request = await fetch(`${GET_PROFILE_INFO_URL}/${address}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to GET profile info: ${request.statusText}`);
  }
  const result = await request.text().then((data) => JSON.parse(data));
  console.log(result);
  return result;
};

/**
 * @returns {string} challenge
 */
export const setChallenge = async (challenge) => {
  const request = await fetch(CHALLENGE_RUL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      challenge,
    }),
  });
  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

/**
 * @param {Object} param
 * @param {string} param.address user address
 * @param {string} param.signedMessage user signed message
 * @returns {Object} result
 * @returns {string} result.access_token JWT of the user
 * @returns {string} result.user.about
 * @returns {string} result.user.address
 * @returns {string} result.user.createdAt
 * @returns {string} result.user.displayName
 * @returns {string} result.user.instagramUser
 * @returns {string} result.user.logoImageName
 * @returns {string} result.user.profileImageName
 * @returns {string} result.user.twitterUser
 * @returns {string} result.user.universePageUrl
 */
export const userAuthenticate = async ({ address, signedMessage, uuid }) => {
  const request = await fetch(LOGIN_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: `${address}`,
      signature: signedMessage,
      uuid,
    }),
  });
  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

export const getProfilePage = async (username) => {
  const request = await fetch(`${PROFILE_PAGE_URL}/${username}`);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};
