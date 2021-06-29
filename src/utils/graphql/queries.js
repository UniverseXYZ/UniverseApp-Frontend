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
      gene
      priceForGenomeChange
    }
  }
`;
