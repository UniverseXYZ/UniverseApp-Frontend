export const validateUserProfile = (
  loggedInArtist,
  _accountName,
  _about,
  _instagramLink,
  _twitterLink,
  _accountPage
) => {
  const { name, about, instagramLink, twitterLink, universePageAddress } = loggedInArtist;
  const canEditUserInfo =
    name !== _accountName ||
    about !== _about ||
    instagramLink !== _instagramLink ||
    twitterLink !== _twitterLink ||
    universePageAddress !== _accountPage.split('universe.xyz/').pop();
  return canEditUserInfo;
};

export const validateUserAvatar = (accountImage) => {
  const canEditUserAvatar = typeof accountImage === 'object';
  return canEditUserAvatar;
};

export const validateAuctionData = (auction, domainAndBranding) => {
  const { headline, link, backgroundImageBlur } = auction;
  const canEditAuction =
    headline !== domainAndBranding.headline ||
    // TODO: handle link changes
    link !== domainAndBranding.link ||
    backgroundImageBlur !== domainAndBranding.backgroundImageBlur;
  return canEditAuction;
};

export const validateAuctionImages = (editedAuction, invalidPromoImage, invalidBackgroundImage) => {
  let canEditAuction = false;

  const promoImageEdited = editedAuction.promoImage && typeof editedAuction.promoImage === 'object';
  const backgroundImageEdited =
    editedAuction.backgroundImage && typeof editedAuction.backgroundImage === 'object';

  if (
    !invalidPromoImage &&
    !invalidBackgroundImage &&
    (promoImageEdited || backgroundImageEdited)
  ) {
    canEditAuction = true;
  }

  return canEditAuction;
};

export const validateRewardTierData = (auction, rewardTiersAuctionClone, invalidTierImageIds) => {
  const invalidImage = invalidTierImageIds.length;

  let canEditRewardTier = false;
  if (!invalidImage) {
    canEditRewardTier = rewardTiersAuctionClone.find((tier, index) => {
      const canEditTierInfo =
        auction.rewardTiers[index].description !== tier.description ||
        auction.rewardTiers[index].color !== tier.color;
      const canEditIterImage = auction.rewardTiers[index].imageUrl !== tier.imageUrl;

      return canEditTierInfo || canEditIterImage;
    });
  }

  return canEditRewardTier;
};
