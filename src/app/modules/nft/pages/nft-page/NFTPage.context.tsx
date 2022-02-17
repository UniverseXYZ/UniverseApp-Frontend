import { FC, createContext, useContext, useEffect } from 'react';
import { request } from "graphql-request";
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

import { INft } from '../../types';
import {useQuery} from "react-query";
import {getNftData} from "../../../../../utils/api/mintNFT";
import {useParams} from "react-router-dom";

export interface INFTPageContext {
  NFT: INft;
  isLoading: boolean;
  isPolymorph: boolean;
}

export const NFTPageContext = createContext<INFTPageContext>({} as INFTPageContext);

export function useNFTPageData(): INFTPageContext {
  return useContext(NFTPageContext);
}

const NFTPageProvider: FC = ({ children }) => {
  // @ts-ignore
  const { collectionAddress, tokenId } = useParams();
  // TODO: change cache key getNftData --> nft / id
  // @ts-ignore
  const { isLoading, data, error } = useQuery('getNftData', () => getNftData(collectionAddress, tokenId))

  const { data: subgraphsData } =  useQuery("subgraphs", async () => {
    const { orderMatchEntities } = await request(
      'https://api.thegraph.com/subgraphs/name/kunone/marketplace-rinkeby-v2',
      gql`
          query {
              orderMatchEntities(first: 1, orderBy: blockNumber, orderDirection: asc, where: {blockNumber_gte: 0}) {
                  id
                  txFrom
                  txValue
                  blockNumber
                  blockTimestamp
                  leftOrderHash
                  rightOrderHash
                  leftMaker
                  rightMaker
                  newLeftFill
                  newRightFill
                  leftAssetClass
                  rightAssetClass
                  leftAssetData
                  rightAssetData
              }
          }
      `
    );
    return orderMatchEntities;
  });

  console.log('subgraphsData', subgraphsData)

  const value: INFTPageContext = {
    NFT: data,
    isLoading,
    isPolymorph: false
  };

  return (
    <NFTPageContext.Provider value={value}>
      {children}
    </NFTPageContext.Provider>
  );
};

export default NFTPageProvider;
