import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';
import MessageList from './MessageList';
import NotFound from './NotFound';

const ChannelDetails = ({ data: { loading, error, channel } }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error.message</p>;
  }

  if (!channel) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="channelName">
        {channel.name}
      </div>
      <MessageList messages={channel.messages} />
    </div>
  );
};

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId : ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

ChannelDetails.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    channel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })).isRequired,
    }),
  }).isRequired,
};

const ChannelDetailsPopulated = graphql(
  channelDetailsQuery,
  { options: props => ({ variables: { channelId: props.match.params.channelId } }) },
)(ChannelDetails);

export default ChannelDetailsPopulated;
