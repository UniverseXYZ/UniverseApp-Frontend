import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/andonmitev/auctions',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
