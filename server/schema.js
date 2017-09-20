// eslint-disable-next-line import/prefer-default-export
export const typeDefs = `
type Channel {
  id: ID!                # "!" denotes a required field
  name: String
  messages: [Message]!
}

type Message {
  id: ID!
  text: String
}

type MessageInput {
  channelId: ID!
  text: String
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
  allChannels: [Channel]    # "[]" means this is a list of channels
  Channel(id: ID!): Channel
}

# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  createChannel(name: String!): Channel
  createMessage(message: MessageInput!): Message
}
`;
