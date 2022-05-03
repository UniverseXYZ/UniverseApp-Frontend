import { useTitle, useWindowSize } from 'react-use';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';

import ArtistDetails from '../../../../../components/artist/ArtistDetails';
import { getArtistApi } from '../../../../api';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ArtistNFTsTab } from './components';
import { TabLabel } from '../../../../components';
import FiltersContextProvider from '../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

export const UserProfilePage = () => {

  // const { artistUsername } = useParams<{ artistUsername: string; }>();
  const windowSize = useWindowSize();
  const router = useRouter();

  const { artistUsername } = router.query as { artistUsername: string; };

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
      onError: () => {
        try {
          const checked = ethers.utils.getAddress(artistUsername);
          setArtistAddress(checked);
        } catch (e) {
          console.log(e);
        }
      },
      refetchOnMount: 'always'
    },
  );

  useTitle(`Universe Minting - Artist - ${artist?.name}`, { restoreOnUnmount: true });

  let content = (
    <div className="artist__details__section">
      <div style={{ marginTop: 60, marginBottom: 60 }} className="artist__page">
        <div className="artist__details__section__container">
          <div className="avatar">
            <Skeleton
              height={windowSize?.width > 576 ? 280 : 90}
              width={windowSize?.width > 576 ? 280 : 90}
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

    if (!isLoading) {
      content = (
        <div className="artist__page">
          <Box sx={{ 'img': { display: 'inline' } }}>
            <ArtistDetails artistAddress={artistUsername} onArtist={artist} loading={isLoading} />
          </Box>
          <Tabs padding={{ sm: '10px' }}>
            <TabList maxW={'1110px'} m={'auto'}>
              <Tab>NFTs {totalNFTs && (<TabLabel>{totalNFTs}</TabLabel>)}</Tab>
              {/*<Tab>Active auctions</Tab>*/}
              {/*<Tab>Future auctions</Tab>*/}
              {/*<Tab>Past auctions</Tab>*/}
            </TabList>

            <TabPanels>
              <TabPanel p={0} pt={'30px'}>
                <FiltersContextProvider defaultSorting={0}>
                  <ArtistNFTsTab artistAddress={artistAddress} onTotalLoad={(total) => setTotalNFTs(total)} />
                </FiltersContextProvider>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {artist && artist?.personalLogo && (
            <div className="artist__personal__logo">
              <img src={artist?.personalLogo} alt="Artist personal logo" />
            </div>
          )}
        </div>
      )
  }

  return content;
};
