import { gql } from '@apollo/client';

export const morphedPolymorphs = gql`
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
    transferEntities(first: 1000, where: { to: "${ownerAddress}" }) {
      from
      id
      to
      tokenId
    }
  }
`;

export const polymorphOwner = (tokenId) => gql`
  query Polymorphs {
    transferEntities(where: { tokenId: "${tokenId}" }) {
      to
    }
    tokenMorphedEntities(where: {tokenId: ${tokenId}, eventType_not: 2}, orderBy: timestamp, orderDirection: asc) {
      priceForGenomeChange
      newGene
    }
  }
`;

export const polymorphScrambleHistory = (tokenId) => gql`
  query Polymorphs {
    tokenMorphedEntities(where: {tokenId: ${tokenId}, eventType_not: 2}, orderBy: timestamp, orderDirection: asc) {
      tokenId
      oldGene
      newGene
      timestamp
      price
    }
  }
`;
