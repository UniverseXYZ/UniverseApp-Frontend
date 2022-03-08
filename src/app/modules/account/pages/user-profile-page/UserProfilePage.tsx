import { useTitle } from 'react-use';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';

import NotFound from '../../../../../components/notFound/NotFound';
import ArtistDetails from '../../../../../components/artist/ArtistDetails';
import { getArtistApi } from '../../../../api';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ArtistNFTsTab } from './components';
import { TabLabel } from '../../../../components';

export const UserProfilePage = () => {

  const { artistUsername } = useParams<{ artistUsername: string; }>();

  const [artist, setArtist] = useState<any>();
  const [artistAddress, setArtistAddress] = useState('');

  const [totalNFTs, setTotalNFTs] = useState<number>();

  const { isLoading, isError } = useQuery<any>(
    ['artist', artistUsername],
    () => getArtistApi(artistUsername),
    {
      onSuccess: (data) => {
        setArtist(data.artist);
        setArtistAddress(data.address)
      },
      refetchOnMount: 'always'
    },
  );

  useTitle(`Universe Minting - Artist - ${artist?.name}`, { restoreOnUnmount: true });

  if(isError) {
    return (
      <NotFound />
    )
  }

  let content = (
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
  );

    if(artist) {
        content = (
            <div className="artist__page">
              <Box sx={{ 'img': { display: 'inline' } }}>
                <ArtistDetails artistAddress={artistUsername} onArtist={artist} loading={isLoading} />
              </Box>
              <Container maxW={'1110px'}>
                <Tabs>
                  <TabList>
                    <Tab>NFTs <TabLabel>{totalNFTs}</TabLabel></Tab>
                    {/*<Tab>Active auctions</Tab>*/}
                    {/*<Tab>Future auctions</Tab>*/}
                    {/*<Tab>Past auctions</Tab>*/}
                  </TabList>

                  <TabPanels>
                    <TabPanel p={0} pt={'30px'}>
                      <ArtistNFTsTab artistAddress={artistAddress} onTotalLoad={(total) => setTotalNFTs(total)} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Container>
              {artist && artist.personalLogo && (
                <div className="artist__personal__logo">
                  <img src={artist.personalLogo} alt="Artist personal logo" />
                </div>
              )}
            </div>
        )
  }

  return content;

};
