import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const PostsList = ({ userId, onSelectPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-posts`, {
          params: { userId },
        });
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts(); // Fetch posts for the selected user
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
            {/* Add more post details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

// Validate props with PropTypes
PostsList.propTypes = {
  userId: PropTypes.string.isRequired,
  onSelectPost: PropTypes.func.isRequired,
};

export default PostsList;
