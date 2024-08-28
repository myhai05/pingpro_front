import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SaveChapters = ({ postId, chapters }) => {
    const handleSaveChapters = async () => {
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

    return <button onClick={handleSaveChapters}>Save Chapters</button>;
};

SaveChapters.propTypes = {
    postId: PropTypes.string.isRequired,
    chapters: PropTypes.array.isRequired,
};

export default SaveChapters;
