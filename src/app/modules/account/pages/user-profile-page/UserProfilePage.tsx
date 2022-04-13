import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useSearchParam, useWindowSize } from 'react-use';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { userKeys } from '@app/utils/query-keys';
import { getArtistApi } from '@app/api';
import { OpenGraph, TabLabel } from '@app/components';

import ArtistDetails from '../../../../../components/artist/ArtistDetails';
import { ArtistNFTsTab } from './components';
import FiltersContextProvider from '../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import NotFound from '../../../../../components/notFound/NotFound';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { artistUsername } = context.params as { artistUsername: string;  };
  
  await queryClient.prefetchQuery(userKeys.info(artistUsername), async () => {
    const result = await getArtistApi(artistUsername);
    // Dehydration will fail if there's a Date or undefined value in the data
    // This will strip any invalid values
    return JSON.parse(JSON.stringify(result))
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      artistUsername: artistUsername
    }
  };
}
interface IUserProfilePage {
  artistUsername: string
}

export const UserProfilePage: React.FC<IUserProfilePage> = ({ artistUsername }) => {
  const windowSize = useWindowSize();
  
  const [totalNFTs, setTotalNFTs] = useState<number>();
  
  const { data: { artist, address }, isLoading, isError } = useQuery<any>(
    userKeys.info(artistUsername),
    () => getArtistApi(artistUsername),
    {
      refetchOnMount: 'always'
    },
  );

  const collectionSearchParam = useSearchParam('collection');

  if (isError) {
    return (<NotFound />);
  }

  const openGraph = (
    <OpenGraph
      title={`${artist?.name || address || ''} – Profile`}
      description={artist?.about || undefined}
      image={artist?.avatar || undefined}
    />
  );

  let content = (
    <>
      {openGraph}
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
    </>
  );

  if (!isLoading) {
    content = (
      <>
        {openGraph}
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
                <FiltersContextProvider defaultSorting={0} initialCollection={`${collectionSearchParam}`}>
                  <ArtistNFTsTab artistAddress={address} onTotalLoad={(total) => setTotalNFTs(total)} />
                </FiltersContextProvider>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {artist && artist.personalLogo && (
            <div className="artist__personal__logo">
              <img src={artist.personalLogo} alt="Artist personal logo" />
            </div>
          )}
        </div>
      </>
    )
  }

  return content;
};
