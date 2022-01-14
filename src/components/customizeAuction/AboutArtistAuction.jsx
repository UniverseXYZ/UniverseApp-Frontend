import React from 'react';
import PropTypes from 'prop-types';
import ProfileForm from '../myAccount/ProfileForm.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';

const AboutArtistAuction = ({
  accountName,
  setAccountName,
  accountPage,
  setAccountPage,
  accountImage,
  setAccountImage,
  about,
  setAbout,
  twitterLink,
  setTwitterLink,
  instagramLink,
  setInstagramLink,
  editProfileButtonClick,
  accountNameExists,
  accountPageExists,
}) => (
  <div className="about__artist">
    <div className="about__artist__header">
      <h3>About Artist</h3>
    </div>
    <div className="my-account">
      <ProfileForm
        accountName={accountName}
        setAccountName={setAccountName}
        accountPage={accountPage}
        setAccountPage={setAccountPage}
        accountImage={accountImage}
        setAccountImage={setAccountImage}
        about={about}
        setAbout={setAbout}
        twitterLink={twitterLink}
        setTwitterLink={setTwitterLink}
        instagramLink={instagramLink}
        setInstagramLink={setInstagramLink}
        editProfileButtonClick={editProfileButtonClick}
        accountNameExists={accountNameExists}
        accountPageExists={accountPageExists}
      />
    </div>
  </div>
);

AboutArtistAuction.propTypes = {
  accountName: PropTypes.string,
  setAccountName: PropTypes.func,
  accountPage: PropTypes.string,
  setAccountPage: PropTypes.func,
  accountImage: PropTypes.oneOfType([PropTypes.any]),
  setAccountImage: PropTypes.func,
  about: PropTypes.string,
  setAbout: PropTypes.func,
  twitterLink: PropTypes.string,
  setTwitterLink: PropTypes.func,
  instagramLink: PropTypes.string,
  setInstagramLink: PropTypes.func,
  editProfileButtonClick: PropTypes.bool.isRequired,
  accountNameExists: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  accountPageExists: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};
AboutArtistAuction.defaultProps = {
  accountName: '',
  setAccountName: () => {},
  accountPage: '',
  setAccountPage: () => {},
  accountImage: null,
  setAccountImage: () => {},
  about: '',
  setAbout: () => {},
  twitterLink: '',
  setTwitterLink: () => {},
  instagramLink: '',
  setInstagramLink: () => {},
};
export default AboutArtistAuction;
