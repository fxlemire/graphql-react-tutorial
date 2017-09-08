import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import React from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import ChannelsList from './ChannelsList';
import logo from './logo.svg';
import { typeDefs } from './schema';
import './App.css';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const networkInterface = mockNetworkInterfaceWithSchema({ schema });
const client = new ApolloClient({ networkInterface });

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Apollo</h2>
      </div>
      <ChannelsList />
    </div>
  </ApolloProvider>
);

export default App;
