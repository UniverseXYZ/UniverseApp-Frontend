import { useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../../ContextAPI';
import Button from '../button/Button';

const Head = () => {
  const { loggedInArtist, setLoggedInArtist } = useContext(AppContext);
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
        <div className="my-account-description">
          <h1>My Profile</h1>
          <p>
            You can set preffered display name, create your branded profile URL and manage other
            personal settings
          </p>
        </div>
        <Button className="light-button" onClick={handlePreviewClick}>
          Preview my Universe Page
        </Button>
      </div>
    </div>
  );
};

export default Head;
