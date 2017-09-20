import PropTypes from 'prop-types';
import React from 'react';
import AddMessage from './AddMessage';

const MessageList = ({ messages }) => (
  <div className="messagesList">
    {messages.map(message => (
      <div key={message.id} className={`message${message.id < 0 ? ' optimistic' : ''}`}>
        {message.text}
      </div>
    ))}
    <AddMessage />
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default MessageList;
