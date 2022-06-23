import { getArtistApi } from "@app/api";
import { OpenGraph } from "@app/components";
import { userKeys } from "@app/utils/query-keys";
import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NotFound from "pages/404";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useWindowSize } from "react-use";
import { MyNFTs } from "./components";
import { useStaticHeader } from '@app/hooks';
import { HeroSection } from "../../components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { artistUsername } = context.params as { artistUsername: string };

  await queryClient.prefetchQuery(userKeys.info(artistUsername), async () => {
    const result = await getArtistApi(artistUsername);
    // Dehydration will fail if there's a Date or undefined value in the data
    // This will strip any invalid values
    return JSON.parse(JSON.stringify(result));
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      artistUsername: artistUsername,
    },
  };
};
interface IUserProfilePage {
  artistUsername: string;
}

export const UserProfilePage: React.FC<IUserProfilePage> = ({
  artistUsername,
}) => {
  const windowSize = useWindowSize();

  useStaticHeader();

  const { data, isLoading, isError } = useQuery<any>(
    userKeys.info(artistUsername),
    () => getArtistApi(artistUsername),
    {
      refetchOnMount: "always",
    }
  );

  if (isError || !data) {
    return <NotFound />;
  }

  const { artist, address } = data;

  const openGraph = (
    <OpenGraph
      title={`${artist?.name || address || ""} – Profile`}
      description={artist?.about || undefined}
      image={artist?.avatar || undefined}
    />
  );

  let content = (
    <>
      {openGraph}
      <div className="artist__details__section">
        <div
          style={{ marginTop: 60, marginBottom: 60 }}
          className="artist__page"
        >
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
          <Box sx={{ img: { display: "inline" } }}>
            <HeroSection
              walletAddress={address}
              user={artist}
            />
          </Box>
          <MyNFTs />
          {artist && artist.personalLogo && (
            <div className="artist__personal__logo">
              <img src={artist.personalLogo} alt="Artist personal logo" />
            </div>
          )}
        </div>
      </>
    );
  }

  return content;
};
