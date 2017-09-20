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

const resolvers = {
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: (nextId++).toString(), messages: [], name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
  },
  Query: {
    allChannels: () => channels,
    channel: (root, { id }) => channels.find(c => c.id === id),
  },
};

export default resolvers;
