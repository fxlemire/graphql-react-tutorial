import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
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
const dataIdFromObject = (result) => {
  const typename = result.__typename; // eslint-disable-line no-underscore-dangle

  if (typename && result.id !== undefined) {
    return `${typename}:${result.id}`;
  }

  return null;
};
const client = new ApolloClient({ dataIdFromObject, networkInterface });

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
