import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'
import LikePost from './LikePost';

const Videos = () => {

    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState([])
    const { page, videoId } = useParams();

    useEffect(() => {
        fetchData();
    }, [page]);

    async function fetchData() {
        try {
            setLoading(true)
            const response = await fetch(`https://internship-service.onrender.com/videos?page=${page}`)
            const result = await response.json();
            setVideo(result.data.posts)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    function getPosts(posts, id) {
        return posts.filter(post => post.postId === id);
    }

    const posts = getPosts(video, videoId);
    // console.log(posts[0]);

    return (
        <div>
            {loading ? <div className='text-2xl bg-white font-bold text-center mt-[10%]'>Loading...</div> : (
                <div className='fixed w-[100%] h-[68%] mt-5'>
                    <ReactPlayer url={posts[0]?.submission.mediaUrl} controls={true} width='100%' height='100%' />
                    <div className="flex items-center gap-2 m-[1%]">
                        <img
                            className="w-10 h-10 rounded-full shadow-lg"
                            src={posts[0]?.creator.pic}
                            alt={posts[0]?.creator.name}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {posts[0]?.creator.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {posts[0]?.creator.handle}
                            </p>
                            <LikePost id={videoId} likes={posts[0]?.reaction.count} />
                        </div>
                    </div>
                    <div>
                        <p className='text-sm sm:text-base md:text-l lg:text-xl w-[80%] ml-[2%]'>{posts[0]?.submission.description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Videos
