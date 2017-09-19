import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelsListQuery } from './ChannelsList';

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.persist();

      mutate({
        refetchQueries: [{ query: channelsListQuery }],
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
  mutation createChannel($name: String!) {
    createChannel(name: $name) {
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
