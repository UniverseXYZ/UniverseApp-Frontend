import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Artist.scss';
import ArtistDetails from '../../components/artist/ArtistDetails.jsx';
import ArtistPageTabs from '../../components/artist/tabs/Tabs.jsx';
import NotFound from '../../components/notFound/NotFound.jsx';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getProfilePage } from '../../utils/api/profile';
import { mapUserData } from '../../utils/helpers';
import { getUserNfts } from '../../utils/api/mintNFT';

const Artist = () => {
  const { setDarkMode } = useThemeContext();
  const { artistUsername } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artistNFTs, setArtistNFTs] = useState([]);

  useEffect(() => {
    setDarkMode(false);
    document.title = `Universe Minting - Artist - ${artist?.name}`;
    return () => {
      document.title = 'Universe Minting';
    };
  }, [artist]);

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

      try {
        const artistNftsInfo = await getUserNfts(artistUsername);
        if (!artistNftsInfo.error) {
          setArtistNFTs(artistNftsInfo.nfts);
        }
      } catch (err) {
        console.log(err);
      }

      // TODO: Add more requests for past/active/future auction, append results to state
      setLoading(false);
    };
    getInfo();
  }, []);

  return !loading && !artist ? (
    <NotFound />
  ) : artist ? (
    <div className="artist__page">
      <ArtistDetails onArtist={artist} loading={loading} />
      <ArtistPageTabs nfts={artistNFTs} />
      {artist.personalLogo ? (
        <div className="artist__personal__logo">
          <img src={artist.personalLogo} alt="Artist personal logo" />
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Artist;
