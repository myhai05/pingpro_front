import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';

const VideoUploadForm = () => {
    const { user } = useContext(AuthContext); // Utilisation du contexte d'authentification pour récupérer userId
    const userId = user ? user.userId : null; // Récupérez userId depuis user si disponible
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger
      
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.error('User ID is not defined');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', video);
        formData.append('userId', userId); // Inclure userId dans FormData

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}api/post/add-post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Video uploaded successfully:', response.data);
            // Redirection après un upload réussi
            navigate('/private');
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    return (
        <div>
            <h2>Upload Video</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input id="title" type="text" value={title} onChange={handleTitleChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={handleDescriptionChange} required />
                </div>
                <div>
                    <label htmlFor="video">Video:</label>
                    <input id="video" type="file" accept="video/*" onChange={handleVideoChange} required />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default VideoUploadForm;
