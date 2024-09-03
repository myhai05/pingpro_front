import React, { useContext } from 'react';
import { AuthContext } from './Context/authContext';
import UserInfo from './User/userInfo';
import VideosList from './Dashboard/videosList';


const Private = () => {

  const { user } = useContext(AuthContext);

  const userId = user ? user.userId : null;

  if (userId) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <UserInfo />
          </div>
          <div className="col-md-8">
            <VideosList userId={userId} />
          </div>
        </div>
      </div>
    );
  } else {
    return (<div><p>Loading</p></div>);
  }
};

export default Private;

