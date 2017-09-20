import React from 'react';
import { withRouter } from 'react-router-dom';

const AddMessage = () => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
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

export default withRouter(AddMessage);
