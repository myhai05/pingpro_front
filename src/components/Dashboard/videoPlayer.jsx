import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'; // Importer PropTypes
import '../Videos/videoList.css';

const VideoList = ({ postId, onGoBack }) => {
    const [video, setVideo] = useState(null); // State pour la vidéo actuelle
    const [chapters, setChapters] = useState([]); // State pour les chapitres actuels
    const [loading, setLoading] = useState(true); // State pour gérer le chargement

    const playerRef = useRef(null);

    useEffect(() => {
        if (!postId) {
            setLoading(false); // Si postId manque, on arrête le chargement
            return;
        }

        const fetchVideo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-video`, {
                    params: { postId },
                });
                console.log(response);
                setVideo(response.data[0]); // On suppose qu'on reçoit une seule vidéo
                setChapters(response.data[0].chapters || []); // Mettre à jour les chapitres de la vidéo actuelle
                setLoading(false); // Fin du chargement après récupération de la vidéo
            } catch (error) {
                console.error('Error fetching video:', error);
                setLoading(false); // Gestion d'erreur : arrêt du chargement
            }
        };

        fetchVideo();
    }, [postId]);

    const handleAddChapter = () => {
        if (playerRef.current) {
            const time = playerRef.current.getCurrentTime();
            setChapters([...chapters, { time, comment: '' }]);
        }
    };

    const handleCommentChange = (index, newComment) => {
        const updatedChapters = [...chapters];
        updatedChapters[index].comment = newComment;
        setChapters(updatedChapters);
    };

    const handleSaveChapters = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}api/post/save-chapters`, {
                postId,
                chapters,
            });
            console.log(response);
            if (response.status === 200) {
                alert('Chapters saved successfully');
            } else {
                console.error('Failed to save chapters:', response.statusText);
                alert('Failed to save chapters');
            }
        } catch (error) {
            console.error('Error saving chapters:', error);
            alert('Failed to save chapters');
        }
    };

    const handleChapterClick = (time) => {
        if (playerRef.current) {
            playerRef.current.seekTo(time);
        }
    };

    const handleMarkAsProcessed = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}api/post/mark-as-processed`, {
                videoId: video._id,
            });
            if (response.status === 200) {
                setVideo({ ...video, traite: 'Traité' });
                alert('Video marked as processed');
            } else {
                console.error('Failed to mark video as processed:', response.statusText);
                alert('Failed to mark video as processed');
            }
        } catch (error) {
            console.error('Error marking video as processed:', error);
            alert('Failed to mark video as processed');
        }
    };

    return (
        <div>
            <button onClick={onGoBack}>Retour</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Video</h2>
                    {video ? (
                        <div>
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                            <ReactPlayer
                                url={`${process.env.REACT_APP_API_URL}${video.videoUrl.replace(/\\/g, '/')}`}
                                controls
                                ref={playerRef}
                            />
                            <button onClick={handleMarkAsProcessed} disabled={video.traite === 'Traité'}>
                                {video.traite === 'En cours' ? 'Marquer comme Traité' : 'Vidéo Traité'}
                            </button>
                            <button onClick={handleAddChapter}>Add Chapter</button>
                            <div className="chapters-container">
                                {chapters.map((chapter) => (
                                    <button
                                        key={chapter.id} // Utilisation de l'identifiant unique comme clé
                                        className="chapter"
                                        onClick={() => handleChapterClick(chapter.time)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                handleChapterClick(chapter.time);
                                            }
                                        }}
                                        tabIndex="0"
                                    >
                                        <p>Chapter at {chapter.time ? chapter.time.toFixed(2) : 'unknown'} seconds</p>
                                        <input
                                            type="text"
                                            value={chapter.comment}
                                            onChange={(e) => handleCommentChange(chapter.id, e.target.value)} // Mettez à jour la fonction si nécessaire
                                            placeholder="Add comment"
                                            className="chapter-input"
                                        />
                                    </button>
                                ))}
                            </div>

                            <button onClick={handleSaveChapters}>Save Chapters</button>
                        </div>
                    ) : (
                        <p>No video available</p>
                    )}
                </div>
            )}
        </div>
    );
};

// Définir les PropTypes
VideoList.propTypes = {
    postId: PropTypes.string.isRequired,
    onGoBack: PropTypes.func.isRequired,
};

export default VideoList;
