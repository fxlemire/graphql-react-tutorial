import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { GraphQLSchema, execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { executableSchema } from './schema';

const PORT = 4000;
const server = express();
const schema = executableSchema as GraphQLSchema;

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
}));

const ws = createServer(server);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // tslint:disable-next-line no-unused-expression
  new SubscriptionServer({
    execute,
    schema,
    subscribe,
  } , {
    path: '/subscriptions',
    server: ws,
  });
});
