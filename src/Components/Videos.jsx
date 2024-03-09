import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'

const Videos = () => {

    const [videos, setVideos] = useState([])
    const [video, setVideo] = useState([])
    const { page, videoId } = useParams();
    console.log(videoId)

    const url = `https://internship-service.onrender.com/videos?page=${page}`

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        filterById();
    }, [])

    const filterById = () => {
        const filteredVideo = videos.filter((v) => {
            console.log(v.postId, videoId)
            return v.postId == videoId
        })
        setVideo(filteredVideo)
        // console.log(filteredVideo)
    }


    async function fetchData() {
        try {
            const response = await fetch(`https://internship-service.onrender.com/videos?page=${page}`)
            const result = await response.json();
            setVideo(result.data.posts)
        } catch (error) {
            console.log(error);
        }
    }

    function getPosts(posts, id) {
        return posts.filter(post => post.postId === id);
    }

    const posts = getPosts(video, videoId);
    console.log(posts[0]);



    return (
        <div className='fixed w-[100%] h-[80%]'>
            <ReactPlayer url={posts[0]?.submission.mediaUrl} controls={true} width='100%' height='100%' fullscreen={true} />
            <div>
                <p>{posts[0]?.submission.description}</p>
            </div>
        </div>
    )
}

export default Videos
