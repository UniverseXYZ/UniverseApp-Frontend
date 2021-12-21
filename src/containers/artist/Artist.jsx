import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Artist.scss';
import { utils } from 'ethers';
import Skeleton from 'react-loading-skeleton';
import ArtistDetails from '../../components/artist/ArtistDetails.jsx';
import ArtistPageTabs from '../../components/artist/tabs/Tabs.jsx';
import NotFound from '../../components/notFound/NotFound.jsx';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getProfilePage } from '../../utils/api/profile';
import { mapUserData } from '../../utils/helpers';
import { getUserNfts } from '../../utils/api/mintNFT';
import {
  initiateAuctionSocket,
  disconnectAuctionSocket,
} from '../../utils/websockets/auctionEvents';

const Artist = () => {
  const { setDarkMode } = useThemeContext();
  const { artistUsername } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artistNFTs, setArtistNFTs] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setDarkMode(false);
    document.title = `Universe Minting - Artist - ${artist?.name}`;
    return () => {
      document.title = 'Universe Minting';
    };
  }, [artist]);

  useEffect(() => {
    initiateAuctionSocket();

    const getInfo = async () => {
      try {
        if (!utils.isAddress(artistUsername)) {
          const artistInfo = await getProfilePage(artistUsername);
          if (!artistInfo.error) {
            const mappedArtist = mapUserData(artistInfo);
            setArtist(mappedArtist);
          } else {
            setNotFound(true);
          }
        }
      } catch (err) {
        setNotFound(true);
        console.log(err);
      }

      try {
        const artistNftsInfo = await getUserNfts(artistUsername);
        if (!artistNftsInfo.error) {
          setArtistNFTs(artistNftsInfo.nfts);
          console.log(artistNftsInfo.nfts);
        }
      } catch (err) {
        console.log(err);
      }

      // TODO: Add more requests for past/active/future auction, append results to state
      setLoading(false);
    };
    getInfo();
    return () => disconnectAuctionSocket();
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
    <div className="artist__page">
      <ArtistDetails artistAddress={artistUsername} onArtist={artist} loading={loading} />
      <ArtistPageTabs artistId={artist.id || 0} nfts={artistNFTs} />
      {artist && artist.personalLogo ? (
        <div className="artist__personal__logo">
          <img src={artist.personalLogo} alt="Artist personal logo" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Artist;
