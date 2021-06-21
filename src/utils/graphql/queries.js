import { gql } from '@apollo/client';

export const queryAuctions = gql`
  query Polymorphs {
    tokenMorphedEntities {
      id
      newGene
      oldGene
      tokenId
      eventType
      price
    }
  }
`;

export const transferPolymorphs = gql`
  query Polymorphs {
    transferEntities {
      from
      id
      to
      tokenId
    }
  }
`;
