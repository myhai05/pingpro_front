import React from 'react';
import PostsList from './postsList';
import VideoList from '../Videos/videoPlayer';
import UserList from './userList';
import DisplayContent from './displayContent';

const Display = () => {
  return (
    <DisplayContent
      UserComponent={UserList}
      PostComponent={PostsList}
      VideoComponent={VideoList}
    />
  );
};

export default Display;
