import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './Artist.scss';
import ArtistDetails from '../../components/artist/ArtistDetails.jsx';
import ArtistPageTabs from '../../components/artist/tabs/Tabs.jsx';
import { PLACEHOLDER_ARTISTS } from '../../utils/fixtures/ArtistDummyData';
import { PLACEHOLDER_PAST_AUCTIONS } from '../../utils/fixtures/PastAuctionsDummyData';
import { PLACEHOLDER_NFTS } from '../../utils/fixtures/NFTsDummyData';
import { PLACEHOLDER_FUTURE_AUCTIONS } from '../../utils/fixtures/FutureAuctionsDummyData';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../utils/fixtures/ActiveAuctionsDummyData';

import AppContext from '../../ContextAPI';
import NotFound from '../../components/notFound/NotFound.jsx';
import bubleIcon from '../../assets/images/text-bubble.png';
import Exclamation from '../../assets/images/Exclamation.svg';

const Artist = () => {
  const location = useLocation();
  const history = useHistory();

  const { loggedInArtist, setDarkMode, myNFTs, myAuctions } = useContext(AppContext);

  const artist = location.state
    ? location.state.id === loggedInArtist.id
      ? loggedInArtist
      : PLACEHOLDER_ARTISTS.filter((a) => a.id === location.state.id)[0]
    : null;

  // const artistPastAuctions = PLACEHOLDER_PAST_AUCTIONS.filter(
  //   (auction) => auction.artist.id === location.state.id
  // );

  const artistPastAuctions =
    loggedInArtist.id === artist?.id ? myAuctions : PLACEHOLDER_PAST_AUCTIONS;

  const artistNfts = loggedInArtist.id === artist?.id ? myNFTs : PLACEHOLDER_NFTS;

  const artistFutureAuctions =
    loggedInArtist.id === artist?.id ? myAuctions : PLACEHOLDER_FUTURE_AUCTIONS;

  const artistActiveAuctions =
    loggedInArtist.id === artist?.id ? myAuctions : PLACEHOLDER_ACTIVE_AUCTIONS;

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
      {!artistActiveAuctions.length &&
      !artistFutureAuctions.length &&
      !artistPastAuctions.length &&
      !artistNfts.length ? (
        <div className="empty__tabs">
          <img src={bubleIcon} alt="Buble" />
          <h3>No NFTs found</h3>
        </div>
      ) : (
        <ArtistPageTabs onArtist={artist} />
      )}
      {artist.personalLogo ? (
        <div className="artist__personal__logo">
          <div>
            <img
              src={
                typeof artist.personalLogo === 'string'
                  ? artist.personalLogo
                  : URL.createObjectURL(artist.personalLogo)
              }
              alt="Artist personal logo"
            />
          </div>
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
