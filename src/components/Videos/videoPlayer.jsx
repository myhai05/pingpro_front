import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './videoList.css';

const VideoList = ({ postId, userId }) => {
  const [videos, setVideos] = useState([]);
  const [chapters, setChapters] = useState([]);
  const playerRef = useRef(null);
     
  useEffect(() => {
    console.log('Received postId:', postId); // Ajout de la vérification
    console.log('Received userId:', userId); // Ajout de la vérification 

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-video`, {
          params: {  userId, postId }
        });
        setVideos(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    if (postId && userId) {
      fetchVideos();
    }
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
      await axios.post(`${process.env.REACT_APP_API_URL}api/video/save-chapters`, {
        userId,
        chapters
      });
      alert('Chapters saved successfully');
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
      <h2>Videos</h2>
      {videos.map(video => (
        <div key={video._id}>
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
                  onChange={e => handleCommentChange(index, e.target.value)}
                  placeholder="Add comment"
                  className="chapter-input"
                />
              </div>
            ))}
          </div>
          <button onClick={handleSaveChapters}>Save Chapters</button>
        </div>
      ))}
    </div>
  );
};

export default VideoList;











