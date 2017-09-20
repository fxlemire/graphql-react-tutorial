import React from 'react';

const ChannelPreview = () => {
  const channel = { name: 'Stub Name' };

  return (
    <div className="channelName">
      {channel.name}
    </div>
  );
};

export default ChannelPreview;
