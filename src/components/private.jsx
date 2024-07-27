import React, { useState, useContext } from 'react';
import PostsList from './Videos/postList';
import VideoList from './Videos/videoPlayer';
import { AuthContext } from './Context/authContext';
import PropTypes from 'prop-types';

const Private = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { user } = useContext(AuthContext);
     
  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
  };
  
  const handleGoBack = () => {
    setSelectedPostId(null); // Afficher à nouveau la liste des posts
  };

  return (
    <div>
      {!selectedPostId ? (
        <PostsList onSelectPost={handleSelectPost} />
      ) : (
        <VideoList postId={selectedPostId} userId={user ? user.userId : null} onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default Private;

