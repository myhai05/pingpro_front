import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { AuthContext } from '../Context/authContext';
import { handleDeleteVideo } from './deleteVideo';
import VideoPlayer from './videoPlayer';

const VideosList = ({ userId, onBack }) => {
  const [posts, setPosts] = useState([]);
  const [showVideo, setShowVideo] = useState(true);
  const [postId, setPostId] = useState(null); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-posts`, {
          params: { userId },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [userId, user]);

  const onHandleClick = (selectedPostId) => {
    setShowVideo(false);
    setPostId(selectedPostId);
  };

  const onHandleBack = () => {
    setShowVideo(true);
  }
  const onDelete = async (postId) => {
    try {
      await handleDeleteVideo(postId); // Ensure this function is correctly handling the deletion
      setPosts(posts.filter(post => post._id !== postId)); // Remove deleted post from UI
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div>
      {showVideo && <Row className="d-flex justify-content-between">
        <h3 className="w-auto">Posts</h3>
       { user.role === "admin" && <Button className="w-auto" variant="primary" onClick={onBack}>Retour</Button>}
      </Row>}
      <div className="cards-container py-4">
        {showVideo ? (
          posts.map((post) => (
            <div className='py-2'>
            <Button
              variant="primary"
              onClick={() => onHandleClick(post._id)}
            >
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>{post.traite}</p> 
            </Button>
            <Button 
                    variant="danger"
                    onClick={() => onDelete(post._id)}>Supprimer</Button>
            </div>
          ))
        ) : (
          <div>
            <VideoPlayer postId={postId} onGoBack={onHandleBack} />
          </div>
        )}
      </div>
    </div>
  );
};

// Validate props with PropTypes
VideosList.propTypes = {
  userId: PropTypes.string.isRequired,
  onBack: PropTypes.func, // Added PropTypes validation for `onBack`
};

export default VideosList;
