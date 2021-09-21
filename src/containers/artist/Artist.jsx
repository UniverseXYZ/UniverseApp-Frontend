import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './Artist.scss';
import ArtistDetails from '../../components/artist/ArtistDetails.jsx';
import ArtistPageTabs from '../../components/artist/tabs/Tabs.jsx';
import { PLACEHOLDER_ARTISTS } from '../../utils/fixtures/ArtistDummyData';
import AppContext from '../../ContextAPI';
import NotFound from '../../components/notFound/NotFound.jsx';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { getProfilePage } from '../../utils/api/profile';
import { mapUserData } from '../../utils/helpers';

const Artist = () => {
  const location = useLocation();
  const { loggedInArtist } = useAuthContext();
  const { setDarkMode } = useThemeContext();
  const { artist: artistUsername } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  // const artist = location.state
  //   ? location.state.id === loggedInArtist.id
  //     ? loggedInArtist
  //     : PLACEHOLDER_ARTISTS.filter((a) => a.id === location.state.id)[0]
  //   : null;

  useEffect(() => {
    setDarkMode(false);
    document.title = `Universe Minting - Artist - ${artist?.name}`;
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const artistInfo = await getProfilePage(artistUsername);
        if (!artistInfo.error) {
          const mappedArtist = mapUserData(artistInfo);
          setArtist(mappedArtist);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getInfo();
    setLoading(false);
  }, []);

  return loading ? (
    <></>
  ) : artist ? (
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
