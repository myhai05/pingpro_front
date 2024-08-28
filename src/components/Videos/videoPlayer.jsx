import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MarkAsProcessed from './markAsProcessed';
import SaveChapters from './saveChapters';
import ChapterManager from './chapterManager';
import NotificationButton from '../Notifications/notificationButton';

const VideoList = ({ postId, onGoBack }) => {
    const [video, setVideo] = useState(null);
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-video`, { params: { postId } });
                setVideo(data[0]);
                setChapters(data[0].chapters || []);
            } catch (error) {
                console.error('Error fetching video:', error);
            } 
        };
        fetchVideo();
    }, [postId]);

    return (
        <div>
            <button onClick={onGoBack}>Retour</button>
            {video ? (
                <div>
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    <MarkAsProcessed
                        videoId={video._id}
                        isProcessed={video.traite === 'Traité'}
                        onMarkAsProcessed={() => setVideo({ ...video, traite: 'Traité' })}
                    />
                    <ChapterManager
                        chapters={chapters}
                        setChapters={setChapters}
                        videoUrl={video.videoUrl}
                    />
                    <SaveChapters postId={postId} chapters={chapters} />
                    <NotificationButton />
                </div>
            ) : (
                <p>No video available</p>
            )}
        </div>
    );
};

VideoList.propTypes = {
    postId: PropTypes.string.isRequired,
    onGoBack: PropTypes.func.isRequired,
};

export default VideoList;