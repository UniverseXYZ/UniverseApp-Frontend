import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Artist.scss';
import ArtistDetails from '../../components/artist/ArtistDetails.jsx';
import ArtistPageTabs from '../../components/artist/tabs/Tabs.jsx';
import { PLACEHOLDER_ARTISTS } from '../../utils/fixtures/ArtistDummyData';
import AppContext from '../../ContextAPI';
import NotFound from '../../components/notFound/NotFound.jsx';

const Artist = () => {
  const location = useLocation();
  const { loggedInArtist, setDarkMode } = useContext(AppContext);
  const artist = location.state
    ? location.state.id === loggedInArtist.id
      ? loggedInArtist
      : PLACEHOLDER_ARTISTS.filter((a) => a.id === location.state.id)[0]
    : null;

  useEffect(() => {
    setDarkMode(false);
    document.title = `Universe Minting - Artist - ${artist?.name}`;
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  return artist ? (
    <div className="artist__page">
      <ArtistDetails onArtist={artist} />
      <ArtistPageTabs onArtist={artist} />
      {artist.personalLogo ? (
        <div className="artist__personal__logo">
          <img src={artist.personalLogo} alt="Artist personal logo" />
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <NotFound />
  );
};

export default Artist;
