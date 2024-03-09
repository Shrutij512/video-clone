import React, { useEffect, useState } from 'react'
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";

const LikePost = ({ id, likes }) => {

    const [likeCount, setLikeCount] = useState(likes || 0);
    const [dislikeCount, setDisikeCount] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDisike] = useState(false);
    console.log(likeCount)
    useEffect(() => {
        const data = localStorage.getItem(`${id}-likes`);
        if (data) {
            const { likeCount, dislikeCount, isLike, isDislike } = JSON.parse(data);
            setLikeCount(likeCount);
            setDisikeCount(dislikeCount);
            setIsLike(isLike);
            setIsDisike(isDislike);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            `${id}-likes`,
            JSON.stringify({ likeCount, dislikeCount, isLike, isDislike })
        )
    }, [])


    const handleLike = () => {
        if (!isLike) {
            setLikeCount(likeCount + 1);
            setIsLike(true);
            if (isDislike) {
                setDisikeCount(dislikeCount - 1);
                setIsDisike(false);
            }
        } else {
            setLikeCount(likes - 1);
            setIsLike(false);
        }
    }

    const handleDislike = () => {
        if (!isDislike) {
            setDisikeCount(dislikeCount + 1);
            setIsDisike(true);
            if (isLike) {
                setLikeCount(likeCount - 1);
                setIsLike(false);
            }
        } else {
            setDisikeCount(dislikeCount - 1);
            setIsDisike(false);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button
                className={`flex items-center gap-1 ${isLike ? "text-blue-600" : "text-gray-700 dark:text-gray-400"}`}
                onClick={handleLike}
            >
                <GrLike />
                <p>{likeCount}</p>
            </button>

            <button className={`flex items-center gap-1 ${isDislike ? "text-blue-500" : "text-gray-700 dark:text-gray-400"}`}
                onClick={handleDislike}
            >
                <GrDislike />
                <p>{dislikeCount}</p>
            </button>
        </div>
    )
}

export default LikePost
