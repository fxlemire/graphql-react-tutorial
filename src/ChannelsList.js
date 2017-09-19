import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';

const ChannelsList = ({ data: { loading, error, allChannels } }) => (
  loading
    ? <p>Loading ...</p>
    : error
      ? <p>{error.message}</p>
      : <ul className="Item-list App-intro">
        {allChannels.map(ch => <li key={ch.id}>{ch.name}</li>)}
      </ul>
);

const channelsListQuery = gql`
  query ChannelsListQuery {
    allChannels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

ChannelsList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    allChannels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired),
  }).isRequired,
};

export default ChannelsListWithData;
