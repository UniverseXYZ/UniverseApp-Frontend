import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Main from '../myAccount/Main.jsx';
import AppContext from '../../ContextAPI.js';
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
}) => {
  const { editProfileButtonClick } = useAuctionContext();
  // const [about, setAbout] = useState(loggedInArtist.about);
  // const [logo, setLogo] = useState(loggedInArtist.personalLogo);
  // const [twitterLink, setTwitterLink] = useState(loggedInArtist.twitterLink);
  // const [instagramLink, setInstagramLink] = useState(loggedInArtist.instagramLink);

  // const placeholderText = 'your-address';
  // const [accountName, setAccountName] = useState(loggedInArtist.name);
  // const [accountPage, setAccountPage] = useState(
  //   `universe.xyz/${loggedInArtist.universePageAddress || placeholderText}`
  // );
  // const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);
  // const [showSocial, setShowSocial] = useState(loggedInArtist.social);

  // const saveChanges = () => {
  //   setEditProfileButtonClick(true);
  //   let page = accountPage.substring(13);
  //   if (page === 'your-address') {
  //     page = '';
  //   }
  //   setAccountPage(page);
  //   setLoggedInArtist({
  //     ...loggedInArtist,
  //     name: accountName,
  //     universePageAddress: page,
  //     avatar: accountImage,
  //     about,
  //     personalLogo: logo,
  //     instagramLink,
  //     twitterLink,
  //     social: showSocial,
  //   });
  // };

  // const cancelChanges = () => {
  //   setAccountName(loggedInArtist.name);
  //   if (loggedInArtist.universePageAddress) {
  //     setAccountPage(`universe.xyz/${loggedInArtist.universePageAddress}`);
  //   } else {
  //     setAccountPage(`universe.xyz/your-address`);
  //   }
  //   setAccountImage(loggedInArtist.avatar);
  //   setAbout(loggedInArtist.about);
  //   // setLogo(loggedInArtist.personalLogo);
  //   setTwitterLink(loggedInArtist.twitterLink);
  //   setInstagramLink(loggedInArtist.instagramLink);
  // };

  return (
    <div className="about__artist">
      <div className="about__artist__header">
        <h3>About Artist</h3>
      </div>
      <div className="my-account">
        <Main
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
        />
      </div>
      {/* <About about={about} setAbout={setAbout} /> */}
      {/* <PersonalLogo logo={logo} setLogo={setLogo} /> */}
      {/* <Social
        twitterLink={twitterLink}
        setTwitterLink={setTwitterLink}
        instagramLink={instagramLink}
        setInstagramLink={setInstagramLink}
        showSocial={showSocial}
        setShowSocial={setShowSocial}
        saveChanges={saveChanges}
        cancelChanges={cancelChanges}
      /> */}
    </div>
  );
};

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
