const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withVideos = require('next-videos')

/** @type {import('next').NextConfig} */
module.exports = withPlugins(
  [
    withVideos,
    withImages,
  ],
  {
    trailingSlash: true,
    reactStrictMode: false,
    images: {
      disableStaticImages: true
    },
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
        },
      });
      return config;
    },
    env: {
      REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
      REACT_APP_NETWORK_CHAIN_ID: process.env.REACT_APP_NETWORK_CHAIN_ID,
      REACT_APP_NETWORK_NAME: process.env.REACT_APP_NETWORK_NAME,
      REACT_APP_BATCH_MINTING_CHUNK_SIZE: process.env.REACT_APP_BATCH_MINTING_CHUNK_SIZE,
      REACT_APP_POLYMORPHS_GRAPH_URL: process.env.REACT_APP_POLYMORPHS_GRAPH_URL,
      REACT_APP_LOBSTERS_GRAPH_URL: process.env.REACT_APP_LOBSTERS_GRAPH_URL,
      REACT_APP_POLYMORPHS_CONTRACT_ADDRESS: process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS,
      REACT_APP_LOBSTERS_CONTRACT_ADDRESS: process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS,
      REACT_APP_RARITY_METADATA_URL: process.env.REACT_APP_RARITY_METADATA_URL,
      REACT_APP_POLYMORPHS_IMAGES_URL: process.env.REACT_APP_POLYMORPHS_IMAGES_URL,
      REACT_APP_LOBSTER_IMAGES_URL: process.env.REACT_APP_LOBSTER_IMAGES_URL,
      REACT_APP_ETHERSCAN_URL: process.env.REACT_APP_ETHERSCAN_URL,
      REACT_APP_UNIVERSE_ERC_721_ADDRESS: process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS,
      REACT_APP_UNIVERSE_ERC_721_FACTORY_ADDRESS: process.env.REACT_APP_UNIVERSE_ERC_721_FACTORY_ADDRESS,
    },
  }
);
