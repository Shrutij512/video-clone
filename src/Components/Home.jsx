import React, { useEffect, useState } from 'react'
import Thumbnail from './Thumbnail';
import Navbar from '../Components/Navbar';

const Home = () => {

    const [currPage, setCurrPage] = useState(0);
    const [videos, setVideos] = useState([]);

    const url = `https://internship-service.onrender.com/videos?page=${currPage}`

    useEffect(() => {
        fetchData();
    }, [currPage]);

    const fetchData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        const videosData = data.data.posts;
        // console.log(videosData);
        setVideos(videosData);
    }
    console.log(videos);

    const handlePageChange = (val) => {
        setCurrPage((pre) => pre + val);
    }

    return (
        <div >
            <Navbar />

            <div className='grid grid-cols-4 gap-10 m-10 pt-[10%]'>
                {videos && videos?.map((video, idx) => (
                    <Thumbnail video={video} key={idx} page={currPage} />
                ))}

            </div>
            <div className='flex gap-10 font-bold items-center ml-[40%]' >
                <button className='bg-red-200 p-2 border-2 rounded-xl hover:bg-red-600' onClick={() => { handlePageChange(-1) }} disabled={currPage <= 0} >Previous</button>
                <div className='m-5' >
                    {currPage}
                </div>
                <button className='bg-red-200 p-2 border-2 rounded-xl hover:bg-red-600' onClick={() => { handlePageChange(1) }}>Next</button>
            </div>
        </div>
    )
}

export default Home
