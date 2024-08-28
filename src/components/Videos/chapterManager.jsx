import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import '../Videos/videoList.css';

const ChapterManager = ({ chapters, setChapters, videoUrl }) => {
    const playerRef = useRef(null);

    const handleAddChapter = () => {
        if (playerRef.current) {
            const time = playerRef.current.getCurrentTime();
            setChapters((prevChapters) => [...prevChapters, { id: prevChapters.length + 1, time, comment: '' }]);
        }
    };

    const handleCommentChange = (id, newComment) => {
        setChapters((prevChapters) => prevChapters.map((chapter) =>
            chapter.id === id ? { ...chapter, comment: newComment } : chapter
        ));
    };

    const handleChapterClick = (time) => {
        if (playerRef.current) playerRef.current.seekTo(time);
    };

    return (
        <div>
            <ReactPlayer
                url={`${process.env.REACT_APP_API_URL}${videoUrl.replace(/\\/g, '/')}`}
                controls
                ref={playerRef}
            />
            <button onClick={handleAddChapter}>Add Chapter</button>
            <div className="chapters-container">
                {chapters.map(({ id, time, comment }) => (
                    <button key={id} className="chapter" onClick={() => handleChapterClick(time)} tabIndex="0">
                        <p>Chapter at {time.toFixed(2)} seconds</p>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => handleCommentChange(id, e.target.value)}
                            placeholder="Add comment"
                            className="chapter-input"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

ChapterManager.propTypes = {
    chapters: PropTypes.array.isRequired,
    setChapters: PropTypes.func.isRequired,
    videoUrl: PropTypes.string.isRequired,
};

export default ChapterManager;
