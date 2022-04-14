import { fetchTokensMetadataJson } from "@legacy/api/lobsters";
import { queryLobstersGraph, transferLobsters } from "@legacy/graphql/lobsterQueries";
import { convertLobsterObjects } from "@legacy/helpers/lobsters";
import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { useAuthStore } from "./authStore";

type ILobsterStore = { 
  // Getters
  userLobsters: [],
  userLobstersWithMetadata: [],
  userLobstersLoaded: boolean,
  

  // Setters
  setUserLobsters: (userLobsters: []) => void,
  setUserLobstersWithMetadata: (userLobstersWithMetadata: []) => void,
  setUserLobstersLoaded: (userLobsterLoaded: boolean) => void,

  // Helpers
  fetchUserLobstersTheGraph: (newAddress: string) => Promise<void>
  loadLobsterMetadata: () => Promise<void>
}

export const useLobsterStore = create<ILobsterStore>(subscribeWithSelector((set, get) => ({
  userLobsters: [],
  userLobstersWithMetadata: [],
  userLobstersLoaded: false,
  setUserLobsters: (userLobsters) => {
    set(state => ({
      ...state,
      userLobsters
    }))
  },
  setUserLobstersLoaded: (userLobsterLoaded) => {
    set(state => ({
      ...state,
      userLobsterLoaded
    }))
  },
  setUserLobstersWithMetadata: (userLobstersWithMetadata) => {
    set(state => ({
      ...state,
      userLobstersWithMetadata
    }))
  },
  fetchUserLobstersTheGraph: async (newAddress) => {
    set(state => ({
      ...state,
      userLobstersLoaded: false
    }))
    const lobsters = await queryLobstersGraph(transferLobsters(newAddress));
    const userNftIds = lobsters?.transferEntities.map((nft: any) => ({
      tokenId: nft.tokenId,
      id: parseInt(nft.id, 16),
    }));

    set(state => ({
      ...state,
      userLobsters: userNftIds || [],
      userLobstersLoaded: true
    }))
  },
  // This is a new function for loading the metadata of the lobsters
  // This previously was inside fetchUserLobstersTheGraph
  // but polymorph metadata isn't used anywhere currently so I'm splitting
  // the function into two pieces so we don't make unnecessary calls to the cloud function
  // and we can load the metadata on demand when needed
  loadLobsterMetadata: async () => {
    const userNftIds = get().userLobsters.map((nft: any) => nft.tokenId);
    const metadataURIs = userNftIds?.map(
      (id) => `${process.env.REACT_APP_LOBSTER_IMAGES_URL}${id}`
    );
    const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);
    const lobsterNFTs = convertLobsterObjects(nftMetadataObjects);
    if (lobsterNFTs) {
      set(state => ({
        ...state,
        userLobstersWithMetadata: lobsterNFTs,
      }))
    }
  }
})))

// Fetch lobsters when address changes
useAuthStore.subscribe(s => s.address, () => {
  const address = useAuthStore.getState().address;
  useLobsterStore.getState().setUserLobsters([]);
  useLobsterStore.getState().fetchUserLobstersTheGraph(address);
})