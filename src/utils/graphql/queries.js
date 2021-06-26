import { gql } from '@apollo/client';

export const queryAuctions = gql`
  query Polymorphs {
    tokenMorphedEntities(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      newGene
      oldGene
      tokenId
      eventType
      price
    }
  }
`;

export const transferPolymorphs = (ownerAddress) => gql`
  query Polymorphs {
    transferEntities(where: { to: "${ownerAddress}" }) {
      from
      id
      to
      tokenId
    }
  }
`;
