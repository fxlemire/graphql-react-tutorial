import React from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import ChannelsList from './Components/ChannelsList';
import './App.css';

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/graphql-tutorial' });
const client = new ApolloClient({ networkInterface });

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <div className="navbar">
        <h2>Welcome to Apollo</h2>
      </div>
      <ChannelsList />
    </div>
  </ApolloProvider>
);

export default App;
