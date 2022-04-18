import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export const transferLobsters = (ownerAddress) => `
  query Lobsters {
    transferEntities(first: 1000, where: { to: "${ownerAddress}" }) {
      from
      id
      to
      tokenId
    }
  }
`;

export const lobsterOwner = (tokenId) => `
  query Lobsters {
    transferEntities(where: { tokenId: "${tokenId}" }) {
      to,
      gene
    }
  }
`;

export const lobsterTraitRarity = (searchedId) => `
  query Lobsters {
    traits(where: {id: ${searchedId}}) {
      id
      rarity
    }
  }
`;

export const queryLobstersGraph = async (graphQuery) => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_LOBSTERS_GRAPH_URL,
    cache: new InMemoryCache(),
  });

  const graphData = await client.query({
    query: gql`
      ${graphQuery}
    `,
  });

  return graphData?.data;
};
