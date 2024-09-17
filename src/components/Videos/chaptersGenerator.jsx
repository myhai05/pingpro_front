import React, { useRef, useState, useContext } from "react";
import ReactPlayer from "react-player";
import { Button } from "react-bootstrap";
import { handleSaveChapters } from "./saveChapters";
import { handleMarkAsProcessed } from "./markAsProcessed";
import { AuthContext } from "../Context/authContext";
import PropTypes from 'prop-types';

const ChaptersGenerator = ({ postId, chapters, setChapters, videoUrl }) => {

    const playerRef = useRef(null);
    const [currentComment, setCurrentComment] = useState("");
    const { user } = useContext(AuthContext);


    const handleAddChapter = () => {
        const currentTime = playerRef.current.getCurrentTime();
        const newChapter = { id: Date.now(), comment: currentComment, time: currentTime };
        setChapters([...chapters, newChapter]);
        setCurrentComment("");  // Reset the comment input after adding the chapter
    };

    const handleCommentChange = (time, newComment) => {
        const updatedChapters = chapters.map((chapter) =>
            chapter.time === time ? { ...chapter, comment: newComment } : chapter
        );
        setChapters(updatedChapters);
    };

    const handleChapterClick = (time) => {
        playerRef.current.seekTo(time);
    };

    const saveChapters = async () => {
        try {
            await handleSaveChapters(postId, chapters);
        } catch (error) {
            console.log("Error saving chapters", error);
        }
    }

    const markProcessed = async () => {
        try {
            await handleMarkAsProcessed(postId);
        }catch(error) {
            console.log(error);
        }
    }

    const handleDeleteChapter = (_id) => {
        const updatedChapters = chapters.filter((chapter) => chapter._id !== _id);
        setChapters(updatedChapters);
    };
    return (
        <div className="justify-content-center">
            <ReactPlayer
                url={`${process.env.REACT_APP_API_URL}${videoUrl.replace(/\\/g, '/')}`}
                controls
                width="80%"
                height="70%"
                ref={playerRef}
            />
            { user.role === 'admin' && (
                <div>
            <Button onClick={handleAddChapter} variant="warning" className="w-auto m-1">Ajouter un Chapitre</Button> 
            <Button onClick={saveChapters} variant="success" className="w-auto m-1">Enregistrer</Button> 
            <Button onClick={markProcessed} variant="info" className="w-auto m-1">Marquer comme traité</Button>
            </div>
           )}
            <div className="d-flex flex-wrap py-3">
                {chapters.map((chapter) => (
                    <div key={chapter._id} className="py-3 w-5">
                        <h5>
                            <Button
                                className="btn btn-secondary btn-sm me-2"
                                onClick={() => handleChapterClick(chapter.time)}
                            >
                                {chapter.time.toFixed(2)}
                            </Button>
                            <span  role="button" tabIndex="0" onClick={() => handleDeleteChapter(chapter._id)}
                            onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') {  handleDeleteChapter(chapter._id); }
                            }}
                                    style={{ cursor: 'pointer', color: 'red', fontSize: '20px', marginLeft: '10px' }}
                            > &times;</span>
                        </h5>
                        <input
                            type="text"
                            value={chapter.comment}
                            placeholder="Add comment"
                            className="form-control d-inline-block"
                            onChange={(e) => handleCommentChange(chapter.time, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Define prop types for validation
ChaptersGenerator.propTypes = {
    postId: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired
    })).isRequired,
    setChapters: PropTypes.func.isRequired,
    videoUrl: PropTypes.string.isRequired
};

export default ChaptersGenerator;
