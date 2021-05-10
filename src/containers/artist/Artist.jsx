import React, { useContext, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import './Artist.scss';
import ArtistDetails from '../../components/artist/ArtistDetails';
import ArtistPageTabs from '../../components/artist/tabs/Tabs';
import { PLACEHOLDER_ARTISTS } from '../../utils/fixtures/ArtistDummyData';
import AppContext from '../../ContextAPI';

const Artist = () => {
  const location = useLocation();
  const { loggedInArtist } = useContext(AppContext);
  const artist = location.state
    ? location.state.id === loggedInArtist.id
      ? loggedInArtist
      : PLACEHOLDER_ARTISTS.filter((a) => a.id === location.state.id)[0]
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Universe Minting - Artist - ${artist?.name}`;
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  return artist ? (
    <div className="artist__page">
      <ArtistDetails onArtist={artist} />
      <ArtistPageTabs onArtist={artist} />
      <div className="artist__personal__logo">
        <img src={artist.personalLogo} alt="Artist personal logo" />
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Artist;
