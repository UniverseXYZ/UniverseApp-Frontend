/// <reference types="react-scripts" />
declare namespace NodeJS {
interface ProcessEnv {
        REACT_APP_API_BASE_URL: string;
        REACT_APP_NETWORK_CHAIN_ID: string;
        REACT_APP_NETWORK_NAME: string;
        REACT_APP_BATCH_MINTING_CHUNK_SIZE: string;
        REACT_APP_POLYMORPHS_GRAPH_URL: string;
        REACT_APP_LOBSTERS_GRAPH_URL: string;
        REACT_APP_POLYMORPHS_CONTRACT_ADDRESS: string;
        REACT_APP_LOBSTERS_CONTRACT_ADDRESS: string;
        REACT_APP_RARITY_METADATA_URL: string;
        REACT_APP_POLYMORPHS_IMAGES_URL: string;
        REACT_APP_LOBSTER_IMAGES_URL: string;
        REACT_APP_ETHERSCAN_URL: string;
        REACT_APP_UNIVERSE_ERC_721_ADDRESS: string;
        REACT_APP_UNIVERSE_ERC_721_FACTORY_ADDRESS: string;
        REACT_APP_DATASCRAPER_BACKEND: string;
        REACT_APP_MARKETPLACE_BACKEND: string;
        REACT_APP_MARKETPLACE_CONTRACT: string;
        REACT_APP_ROYALTY_REGISTRY_CONTRACT: string;
        REACT_APP_FACEBOOK_APP_ID: string;
        REACT_APP_CAPTCHA_ID: string;
    }
}