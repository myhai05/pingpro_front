import React, { useState } from 'react';
import PostsList from './postsList';
import VideoList from './videoPlayer';
import NotifitedUsers from './notifitedUsers';


const DisplayNotifications = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
  
    const handleSelectUser = (userId) => {
      setSelectedUserId(userId);
      setSelectedPostId(null); // Reset selected post when a new user is selected
    };
  
    const handleSelectPost = (postId) => {
      setSelectedPostId(postId);
    };
  
    const handleGoBackToUsers = () => {
      setSelectedUserId(null);
      setSelectedPostId(null);
    };
  
    const handleGoBackToPosts = () => {
      setSelectedPostId(null);
    };
  
    return (
      <div>
        {!selectedUserId ? (
          <NotifitedUsers onSelectUser={handleSelectUser} />
        ) : !selectedPostId ? (
          <PostsList userId={selectedUserId} onSelectPost={handleSelectPost} />
        ) : (
          <VideoList postId={selectedPostId} onGoBack={handleGoBackToPosts} />
        )}
        {selectedUserId && !selectedPostId && (
          <button onClick={handleGoBackToUsers}>Back to Users</button>
        )}
      </div>
    );
  };
  
  export default DisplayNotifications;