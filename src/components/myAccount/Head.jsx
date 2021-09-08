import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';

const Head = () => {
  const { loggedInArtist } = useContext(AppContext);

  return (
    // <div className="my-account">
    <div className="my-account-title container">
      <div>
        <h1>Edit my profile</h1>
      </div>
      <div className="button-section">
        <Button className="light-border-button public-button">See public page</Button>
      </div>
      <p>
        You can set your preffered display name, create a branded profile URL and manage other
        personal settings.
      </p>
    </div>
    // </div>
  );
};
export default Head;
