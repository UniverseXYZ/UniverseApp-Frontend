import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import Button from '../button/Button';

const Head = () => {
  const { loggedInArtist } = useContext(AppContext);
  const history = useHistory();

  const handlePreviewClick = () => {
    if (
      loggedInArtist.name &&
      loggedInArtist.universePageAddress &&
      loggedInArtist.avatar &&
      loggedInArtist.about &&
      loggedInArtist.personalLogo &&
      loggedInArtist.instagramLink &&
      loggedInArtist.twitterLink
    ) {
      history.push(`/${loggedInArtist.name.split(' ')[0]}`, { id: loggedInArtist.id });
    } else {
      alert('Please first fill in all fields.');
    }
  };

  return (
    <div className="my-account container">
      <div className="my-account-title">
        <h1>My Profile</h1>
        <Button className="light-button" onClick={handlePreviewClick}>
          Preview my Universe Page
        </Button>
        <p>
          You can set your preffered display name, create a branded URL and manage other personal
          settings.
        </p>
      </div>
    </div>
  );
};

export default Head;
