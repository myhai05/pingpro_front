import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './videoList.css';

const VideoList = ({ postId, userId, onGoBack }) => {
  const [video, setVideo] = useState(null); // State pour la vidéo actuelle
  const [chapters, setChapters] = useState([]); // State pour les chapitres actuels
  const [loading, setLoading] = useState(true); // State pour gérer le chargement

  const playerRef = useRef(null);

  useEffect(() => {
    if (!postId || !userId) {
      setLoading(false); // Si postId ou userId manquent, on arrête le chargement
      return;
    }

    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-video`, {
          params: { userId, postId },
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
  }, [postId, userId]);

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
        // Réinitialiser les chapitres après sauvegarde réussie si nécessaire
        // setChapters([]);
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

  return (
    <div>
      <button onClick={onGoBack}>Acceuil</button>
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
              <button onClick={handleAddChapter}>Add Chapter</button>
              <div className="chapters-container">
                {chapters.map((chapter, index) => (
                  <div
                    className="chapter"
                    key={index}
                    onClick={() => handleChapterClick(chapter.time)}
                  >
                    <p>Chapter at {chapter.time ? chapter.time.toFixed(2) : 'unknown'} seconds</p>
                    <input
                      type="text"
                      value={chapter.comment}
                      onChange={(e) => handleCommentChange(index, e.target.value)}
                      placeholder="Add comment"
                      className="chapter-input"
                    />
                  </div>
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

export default VideoList;














