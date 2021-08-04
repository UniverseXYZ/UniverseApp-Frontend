import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';

const Head = () => {
  const { loggedInArtist } = useContext(AppContext);
  const history = useHistory();
  const [universePage, setUniversePage] = useState(true);

  useEffect(() => {
    if (loggedInArtist.name && loggedInArtist.universePageAddress && loggedInArtist.avatar) {
      setUniversePage(false);
    } else {
      setUniversePage(true);
    }
  }, []);

  const handlePreviewClick = () => {
    if (loggedInArtist.name && loggedInArtist.universePageAddress && loggedInArtist.avatar) {
      history.push(`/${loggedInArtist.universePageAddress}`, { id: loggedInArtist.id });
    } else {
      alert('Please first fill in all fields.');
    }
  };

  return (
    // <div className="my-account">
    <div className="my-account-title container">
      <h1>Edit my profile</h1>
      <Button className="light-button" onClick={handlePreviewClick} disabled={universePage}>
        Preview my Universe page
      </Button>
      <p>
        You can set your preffered display name, create a branded profile URL and manage other
        personal settings.
      </p>
    </div>
    // </div>
  );
};

export default Head;
