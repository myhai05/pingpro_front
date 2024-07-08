import React, { useState, useContext } from 'react';
import PostsList from './Videos/postList';
import VideoList from './Videos/videoPlayer';
import { AuthContext } from './Context/authContext';

const Private = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
  };

  return (
    <div>
      {!selectedPostId ? (
        <PostsList onSelectPost={handleSelectPost} />
      ) : (
        <VideoList postId={selectedPostId} userId={user ? user.userId : null} />
      )}
    </div>
  );
};

export default Private;

