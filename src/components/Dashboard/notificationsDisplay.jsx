import React from 'react';
import PostsList from './postsList';
import VideoList from '../Videos/videoPlayer';
import NotifitedUsers from './notifitedUsers';
import DisplayContent from './displayContent';

const DisplayNotifications = () => {
  return (
    <DisplayContent
      UserComponent={NotifitedUsers}
      PostComponent={PostsList}
      VideoComponent={VideoList}
    />
  );
};

export default DisplayNotifications;
