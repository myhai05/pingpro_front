import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const MarkAsProcessed = ({ videoId, isProcessed, onMarkAsProcessed }) => {
    const handleMarkAsProcessed = async () => {
        try {
            const { status } = await axios.put(`${process.env.REACT_APP_API_URL}api/post/mark-as-processed`, { videoId });
            if (status === 200) {
                onMarkAsProcessed();
                alert('Video marked as processed');
            } else {
                alert('Failed to mark video as processed');
            }
        } catch (error) {
            console.error('Error marking video as processed:', error);
            alert('Failed to mark video as processed');
        }
    };

    return (
        <button onClick={handleMarkAsProcessed} disabled={isProcessed}>
            {isProcessed ? 'Vidéo Traité' : 'Marquer comme Traité'}
        </button>
    );
};

MarkAsProcessed.propTypes = {
    videoId: PropTypes.string.isRequired,
    isProcessed: PropTypes.bool.isRequired,
    onMarkAsProcessed: PropTypes.func.isRequired,
};

export default MarkAsProcessed;
