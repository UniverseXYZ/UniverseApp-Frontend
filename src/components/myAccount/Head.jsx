import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuctionContext } from '../../contexts/AuctionContext';

const Head = () => {
  const { loggedInArtist } = useAuthContext();
  const history = useHistory();

  const handlePublicPage = () => {
    if (
      loggedInArtist.name &&
      loggedInArtist.universePageAddress &&
      loggedInArtist.avatar &&
      loggedInArtist.about
    ) {
      history.push(`/${loggedInArtist.universePageAddress}`, { id: loggedInArtist.id });
    }
  };

  return (
    <div className="my-account-title container">
      <div>
        <h1>Edit my profile</h1>
      </div>
      <div className="button-section">
        <Button className="light-border-button public-button" onClick={handlePublicPage}>
          See public page
        </Button>
      </div>
      <p>
        You can set your preffered display name, create a branded profile URL and manage other
        personal settings.
      </p>
    </div>
  );
};
export default Head;
