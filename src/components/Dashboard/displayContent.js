import React, {useState} from 'react';

const DisplayContent = ({ UserComponent, PostComponent, VideoComponent }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    setSelectedPostId(null);
  };

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
  };

  const handleGoBack = () => {
    if (selectedPostId) {
      setSelectedPostId(null);
    } else if (selectedUserId) {
      setSelectedUserId(null);
    }
  };

  const renderContent = () => {
    if (!selectedUserId) {
      return <UserComponent onSelectUser={handleSelectUser} />;
    }

    if (!selectedPostId) {
      return <PostComponent userId={selectedUserId} onSelectPost={handleSelectPost} />;
    }

    return <VideoComponent postId={selectedPostId} onGoBack={handleGoBack} />;
  };

  return (
    <div>
      {renderContent()}
      {selectedUserId && !selectedPostId && (
        <button onClick={handleGoBack}>Back to Users</button>
      )}
    </div>
  );
};

export default DisplayContent;
