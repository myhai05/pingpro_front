import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import './videoList.css'; // Assurez-vous d'importer votre fichier CSS pour les styles des cartes
import PropTypes from 'prop-types';


const PostsList = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user ? user.userId : null;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-posts`, {
          params: { userId }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const handlePostClick = (postId) => {
    onSelectPost(postId);
  };

  return (
    <div className="posts-list">
      <h2>Posts</h2>
      <div className="post-cards-container">
        {posts.map(post => (
          <div key={post._id} className="post-card" onClick={() => handlePostClick(post._id)}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>{post.traite}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Validation des props avec PropTypes
PostsList.propTypes = {
  onSelectPost: PropTypes.func.isRequired,
};

export default PostsList;