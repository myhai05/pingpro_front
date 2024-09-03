import axios from 'axios';

export const handleSaveChapters = async (postId, chapters) => {
  
        try {
            const { status } = await axios.post(`${process.env.REACT_APP_API_URL}api/post/save-chapters`, { postId, chapters });
            if (status === 200) {
                alert('Chapters saved successfully');
            } else {
                alert('Failed to save chapters');
            }
        } catch (error) {
            console.error('Error saving chapters:', error);
            alert('Failed to save chapters');
        }
    };