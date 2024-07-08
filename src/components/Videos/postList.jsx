import React, { useState, useEffect, useContext } from 'react'; // Import de useContext
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const PostsList = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext); // Utilisation de useContext pour accéder au contexte AuthContext
  const userId = user ? user.userId : null;
        console.log(user.userId);
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
  }, [userId]); // Dépendance mise à jour pour recharger les posts lorsque userId change

  const handlePostClick = (postId) => {
    onSelectPost(postId); // Passe l'ID du post sélectionné au parent (VideoList)
  };

  return (
    <div className="posts-list">
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post._id} className="post-card" onClick={() => handlePostClick(post._id)}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          {/* Vous pouvez ajouter d'autres informations pertinentes du post ici */}
        </div>
      ))}
    </div>
  );
};

export default PostsList;