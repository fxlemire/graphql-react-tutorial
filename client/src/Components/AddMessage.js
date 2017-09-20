import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { channelDetailsQuery } from './ChannelDetails';

const AddMessage = ({ mutate, match }) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      mutate({
        optimisticResponse: {
          addMessage: {
            id: (Math.round(Math.random() * -1000000)).toString(),
            text: e.target.value,
            __typename: 'Message',
          },
        },
        update: (store, { data: { addMessage } }) => {
          const data = store.readQuery({
            query: channelDetailsQuery,
            variables: { channelId: match.params.channelId },
          });

          data.channel.messages.push(addMessage);
          store.writeQuery({
            data,
            query: channelDetailsQuery,
            variables: { channelId: match.params.channelId },
          });
        },
        variables: {
          message: {
            channelId: match.params.channelId,
            text: e.target.value,
          },
        },
      });

      e.target.value = '';
    }
  };

  return (
    <div className="messageInput">
      <input
        type="text"
        placeholder="New message"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

AddMessage.propTypes = {
  mutate: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const AddMessageWithMutation = graphql(addMessageMutation)(withRouter(AddMessage));

export default AddMessageWithMutation;
