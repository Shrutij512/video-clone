import { Link } from 'react-router-dom';
import React from 'react'
import { FcLike } from "react-icons/fc";

const Thumbnail = ({ video, page }) => {
    return (
        <Link key={video.postId} to={`/${page}/${video.postId}`}>
            <div>
                <img src={video.submission.thumbnail} alt="" className='w-[80%] rounded-xl' />
                <p className='text-start text-xl font-bold'>{video.creator.handle}</p>
                <div>
                    <p className='text-start flex gap-1 items-center text-gray-600 font-semibold'>  <FcLike /> {video.reaction.count}</p>
                    <p></p>
                </div>
            </div>
        </Link>

    )
}

export default Thumbnail
