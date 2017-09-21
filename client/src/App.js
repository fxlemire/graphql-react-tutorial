import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface, toIdValue } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import ChannelDetails from './Components/ChannelDetails';
import ChannelsList from './Components/ChannelsList';
import NotFound from './Components/NotFound';
import './App.css';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const wsClient = new SubscriptionClient('ws://localhost:4000/subscriptions', { reconnect: true });
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

const dataIdFromObject = (result) => {
  const typename = result.__typename; // eslint-disable-line no-underscore-dangle

  if (typename && result.id !== undefined) {
    return `${typename}:${result.id}`;
  }

  return null;
};

const customResolvers = {
  Query: {
    channel: (_, { id }) => toIdValue(dataIdFromObject({ __typename: 'Channel', id })),
  },
};

const client = new ApolloClient({
  customResolvers,
  dataIdFromObject,
  networkInterface: networkInterfaceWithSubscriptions,
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Link to="/" className="navbar">Welcome to Apollo</Link>
        <Switch>
          <Route exact path="/" component={ChannelsList} />
          <Route path="/channel/:channelId" component={ChannelDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
