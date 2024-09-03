import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import NotificationButton from '../Notifications/notificationButton';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../Context/authContext';
import ChaptersGenerator from './chaptersGenerator';

const VideoList = ({ postId, onGoBack }) => {
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
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    
                    <ChaptersGenerator
                        chapters={chapters}
                        setChapters={setChapters}
                        videoUrl={video.videoUrl}
                        postId={postId}
                    />

                    {user.role === "user" ? <NotificationButton /> : null}
                </div>
            ) : (
                <p>N'hésitez plus!!!</p>
            )}
        </div>
    );
};

VideoList.propTypes = {
    postId: PropTypes.string.isRequired,
    onGoBack: PropTypes.func.isRequired,
};

export default VideoList;