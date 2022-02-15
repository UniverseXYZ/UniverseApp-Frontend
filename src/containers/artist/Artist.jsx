import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Artist.scss';
import { utils } from 'ethers';
import Skeleton from 'react-loading-skeleton';
import { Helmet } from 'react-helmet';
import ArtistDetails from '../../components/artist/ArtistDetails.jsx';
import ArtistPageTabs from '../../components/artist/tabs/Tabs.jsx';
import NotFound from '../../components/notFound/NotFound.jsx';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getProfileInfo, getProfilePage } from '../../utils/api/profile';
import { mapUserData } from '../../utils/helpers';
import { getUserNfts } from '../../utils/api/mintNFT';

const Artist = () => {
  const { setDarkMode } = useThemeContext();
  const { artistUsername } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [artistAddress, setArtistAddress] = useState('');

  useEffect(() => {
    setDarkMode(false);
  }, [artist]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        let artistInfo = null;

        if (utils.isAddress(artistUsername)) {
          artistInfo = await getProfileInfo(artistUsername.toLowerCase());
        } else {
          artistInfo = await getProfilePage(artistUsername);
        }
        if (artistInfo && !artistInfo.error) {
          const mappedArtist = mapUserData(artistInfo);
          setArtist(mappedArtist);
          setArtistAddress(artistInfo.address.toLowerCase());
        } else {
          setNotFound(true);
        }
      } catch (err) {
        setNotFound(true);
        console.log(err);
      }

      setLoading(false);
    };
    getInfo();
  }, []);

  return loading ? (
    <div className="artist__details__section">
      <div style={{ marginTop: 60, marginBottom: 60 }} className="artist__page">
        <div className="artist__details__section__container">
          <div className="avatar">
            <Skeleton
              height={window.innerWidth > 576 ? 280 : 90}
              width={window.innerWidth > 576 ? 280 : 90}
              circle
            />
            <h2 className="show__on__mobile">
              <Skeleton width={200} />
            </h2>
          </div>
          <div className="info">
            <h1 className="title">
              <Skeleton width={200} />
            </h1>
            <p className="desc">
              <Skeleton height={200} />
            </p>
            <div className="social__links">
              <Skeleton width={300} height={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : notFound ? (
    <NotFound />
  ) : (
    <>
      <Helmet>
        <title>Universe Artist {artist?.name || artistUsername.toLowerCase()}</title>
      </Helmet>
      <div className="artist__page">
        <ArtistDetails
          artistAddress={artistUsername.toLowerCase()}
          onArtist={artist}
          loading={loading}
        />
        <ArtistPageTabs
          artistId={artist ? artist.id : 0}
          artistAddress={artistAddress || ''}
          username={artistUsername.toLowerCase()}
        />
        {artist && artist.personalLogo ? (
          <div className="artist__personal__logo">
            <img src={artist.personalLogo} alt="Artist personal logo" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Artist;
