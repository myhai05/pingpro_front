import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import NotificationButton from '../Notifications/notificationButton';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../Context/authContext';
import ChaptersGenerator from './chaptersGenerator';

const VideoPlayer = ({ postId, onGoBack }) => {
    const [video, setVideo] = useState(null);
    const [chapters, setChapters] = useState([]);
    const { user } = useContext(AuthContext);

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
        <div className="text-center mt-5">
            <div className="row d-flex justify-content-end p-2">
                <Button variant="primary" className="w-auto" onClick={onGoBack}>Retour</Button>
            </div>
            {video ? (
                <div>
                    <p>{video.title}</p>
                    <p>{video.description}</p>
                    {user.role === "user" ? <NotificationButton /> : null}
                    <ChaptersGenerator
                        chapters={chapters}
                        setChapters={setChapters}
                        videoUrl={video.videoUrl}
                        postId={postId}
                    />                   
                </div>
            ) : (
                <p>N'hésitez plus!!!</p>
            )}
        </div>
    );
};

VideoPlayer.propTypes = {
    postId: PropTypes.string.isRequired,
    onGoBack: PropTypes.func.isRequired,
};

export default VideoPlayer;