import { Contract } from "ethers";
import create from "zustand";
import Contracts from '../contracts/contracts.json';

interface IContracts {
  polymorphContract: Contract | null;
  lobsterContract:  Contract | null;
  universeERC721CoreContract: Contract | null;
  universeERC721FactoryContract: Contract | null;
}

interface IContractsStore extends IContracts {
  setContracts: (signer: any, network: any) => void;
  clearContracts: () => void;
}

export const useContractsStore = create<IContractsStore>((set, get) => ({
  polymorphContract: null,
  lobsterContract: null,
  universeERC721CoreContract: null,
  universeERC721FactoryContract: null,
  setContracts: (signer, network) => {
    const { contracts: contractsData } = (Contracts as any)[network.chainId];

    // Minting
    const universeERC721CoreContractResult = new Contract(
      process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS as any,
      contractsData.UniverseERC721Core.abi,
      signer
      
    );
    const universeERC721FactoryContractResult = new Contract(
      process.env.REACT_APP_UNIVERSE_ERC_721_FACTORY_ADDRESS as any,
      contractsData.UniverseERC721Factory.abi,
      signer
    );


    const polymorphContractInstance = new Contract(
      process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS as any,
      contractsData.PolymorphWithGeneChanger?.abi,
      signer
    );

    const lobsterContractInstance = new Contract(
      process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS as any,
      contractsData.Lobster?.abi,
      signer
    );

    set(state => ({
      ...state,
      polymorphContract: polymorphContractInstance,
      lobsterContract: lobsterContractInstance,
      universeERC721CoreContract: universeERC721CoreContractResult,
      universeERC721FactoryContract: universeERC721FactoryContractResult
    }))
  },
  clearContracts: () => {
    set(() => ({
      polymorphContract: null,
      lobsterContract: null,
      universeERC721CoreContract: null,
      universeERC721FactoryContract: null,
    }))
  }
}))