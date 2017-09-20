import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import AddChannel from './AddChannel';

const ChannelsList = ({ data: { loading, error, allChannels } }) => {
  if (loading) {
    return (<p>Loading ...</p>);
  } else if (error) {
    return (<p>{error.message}</p>);
  }

  return (
    <div className="channelsList">
      <AddChannel />
      {allChannels.map(ch => (
        <div key={ch.id} className={`channel${ch.id < 0 ? ' optimistic' : ''}`}>
          <Link to={ch.id < 0 ? '/' : `channel/${ch.id}`}>
            {ch.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    allChannels {
      id
      name
    }
  }
`;

ChannelsList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    allChannels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired),
  }).isRequired,
};

const ChannelsListWithData = graphql(channelsListQuery/* , { options: { pollInterval: 5000 } } */)(ChannelsList);

export default ChannelsListWithData;
