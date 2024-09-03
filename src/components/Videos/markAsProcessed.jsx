import axios from 'axios';

export  const handleMarkAsProcessed = async (postId) => {
        try {
            const { status } = await axios.put(`${process.env.REACT_APP_API_URL}api/post/mark-as-processed`, { postId });
            console.log(postId);
            if (status === 200) {
                alert('Video marked as processed');
            } else {
                alert('Failed to mark video as processed');
            }
        } catch (error) {
            console.error('Error marking video as processed:', error);
            alert('Failed to mark video as processed');
        }
    };