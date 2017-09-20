const channels = [
  {
    id: '1',
    messages: [
      {
        id: '1',
        text: 'soccer is football',
      },
      {
        id: '2',
        text: 'hello soccer world cup',
      },
    ],
    name: 'soccer',
  },
  {
    id: '2',
    messages: [
      {
        id: '3',
        text: 'baseball is life',
      },
      {
        id: '4',
        text: 'hello baseball world series',
      },
    ],
    name: 'baseball',
  },
];

let nextId = 3;
let nextMessageId = 5;

const resolvers = {
  Mutation: {
    addChannel: (root, { name }) => {
      const newChannel = { id: (nextId++).toString(), messages: [], name };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(c => c.id === message.channelId);

      if (!channel) {
        throw new Error('Channel does not exist.');
      }

      const newMessage = {
        id: (nextMessageId++).toString(),
        text: message.text,
      };

      channel.messages.push(newMessage);

      return newMessage;
    },
  },
  Query: {
    allChannels: () => channels,
    channel: (root, { id }) => channels.find(c => c.id === id),
  },
};

export default resolvers;
