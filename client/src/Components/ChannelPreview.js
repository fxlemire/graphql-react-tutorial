import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';

const ChannelPreview = ({ data }) => (
  <div className="channelName">
    {data.channel ? data.channel.name : 'Loading...'}
  </div>
);

const channelQuery = gql`
  query ChannelQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;

ChannelPreview.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    channel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default graphql(channelQuery, {
  options: props => ({ variables: { channelId: props.channelId } }),
})(ChannelPreview);
