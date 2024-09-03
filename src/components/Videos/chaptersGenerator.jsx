import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "react-bootstrap";
import { handleSaveChapters } from "./saveChapters";
import { handleMarkAsProcessed } from "./markAsProcessed";

const ChaptersGenerator = ({ postId, chapters, setChapters, videoUrl }) => {

    const playerRef = useRef(null);
    const [currentComment, setCurrentComment] = useState("");

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
        if (playerRef.current) playerRef.current.seekTo(time);
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

    return (
        <div>
            <ReactPlayer
                url={`${process.env.REACT_APP_API_URL}${videoUrl.replace(/\\/g, '/')}`}
                controls
                width="80%"
                height="80%"
                ref={playerRef}
            />
            <Button onClick={handleAddChapter} variant="warning" className="w-auto m-1">Ajouter un Chapitre</Button>
            <Button onClick={saveChapters} variant="success" className="w-auto m-1">Enregistrer</Button>
            <Button onClick={markProcessed} variant="info" className="w-auto m-1">Marquer comme traité</Button>
            <div className="d-flex flex-wrap justify-content-end py-3">
                {chapters.map((chapter) => (
                    <div key={chapter._id} className="py-3 w-25">
                        <h5>
                            <Button
                                className="btn btn-secondary btn-sm me-2"
                                onClick={() => handleChapterClick(chapter.time)}
                            >
                                {chapter.time.toFixed(2)}
                            </Button>
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
}

export default ChaptersGenerator;
