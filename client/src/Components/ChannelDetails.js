import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import ChannelPreview from './ChannelPreview';
import MessageList from './MessageList';
import NotFound from './NotFound';

const messagesSubscription = gql`
subscription messageAdded($channelId: ID!) {
  messageAdded(channelId: $channelId) {
    id
    text
  }
}
`;

class ChannelDetails extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: messagesSubscription,
      updateQuery: (prev, { subscriptionData }) => (
        !subscriptionData.data || prev.channel.messages.find(m => m.id === subscriptionData.data.messageAdded.id) ?
          prev :
          {
            ...prev,
            channel: {
              ...prev.channel,
              messages: [
                ...prev.channel.messages,
                subscriptionData.data.messageAdded,
              ],
            },
          }
      ),
      variables: { channelId: this.props.match.params.channelId },
    });
  }

  render() {
    const { data: { loading, error, channel }, match } = this.props;

    if (loading) {
      return <ChannelPreview channelId={match.params.channelId} />;
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
  }
}

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
    subscribeToMore: PropTypes.func.isRequired,
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const ChannelDetailsPopulated = graphql(
  channelDetailsQuery,
  { options: props => ({ variables: { channelId: props.match.params.channelId } }) },
)(ChannelDetails);

export default ChannelDetailsPopulated;
