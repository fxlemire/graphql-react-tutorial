import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelsListQuery } from './ChannelsList';

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.persist();

      mutate({
        optimisticResponse: {
          addChannel: {
            __typename: 'Channel',
            id: (Math.round(Math.random() * -1000000)).toString(),
            name: e.target.value,
          },
        },
        update: (store, { data: { addChannel } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({ query: channelsListQuery });

          // Add our channel from the mutation to the end.
          data.allChannels.push(addChannel);
          // Write the data back to the cache.
          store.writeQuery({ query: channelsListQuery, data });
        },
        variables: { name: e.target.value },
      })
        .then(() => {
          e.target.value = '';
        });
    }
  };

  return (
    <input
      type="text"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

const AddChannelWithMutation = graphql(addChannelMutation)(AddChannel);

AddChannel.propTypes = {
  mutate: PropTypes.func.isRequired,
};

export default AddChannelWithMutation;
