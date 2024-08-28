import React, { useState, useContext } from 'react';
import PostsList from './Videos/postList';
import VideoList from './Videos/videoPlayer';
import { AuthContext } from './Context/authContext';
import UserInfo from './User/userInfo';


const Private = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { user } = useContext(AuthContext);
     
  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
  };
  
  const handleGoBack = () => {
    setSelectedPostId(null); // Show the posts list again
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* UserInfo on 1/3 of the page */}
        <div className="col-md-4">
          <UserInfo /> {/* Render the UserInfo component */}
        </div>

        {/* PostsList or VideoList on 2/3 of the page */}
        <div className="col-md-8">
          {!selectedPostId ? (
            <PostsList onSelectPost={handleSelectPost} />
          ) : (
            <VideoList postId={selectedPostId} userId={user ? user.userId : null} onGoBack={handleGoBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Private;

