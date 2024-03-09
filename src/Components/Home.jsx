import React, { useEffect, useState } from 'react'
import Thumbnail from './Thumbnail';
import Navbar from '../Components/Navbar';

const Home = () => {

    const [currPage, setCurrPage] = useState(0);
    const [videos, setVideos] = useState([]);
    const totalPages = 10;

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

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 m-10 pt-[15%] ml-[20%] sm:pt-[10%] sm:ml-[10%] md:pt-[10%] md:ml-[5%] lg:pt-[10%]'>
                {videos && videos?.map((video, idx) => (
                    <Thumbnail video={video} key={idx} page={currPage} />
                ))}

            </div>
            <div className='flex gap-10 font-bold items-center ml-[10%]  md:ml-[40%] lg:ml-[40%]' >
                <button className='bg-red-200 p-2 border-2 rounded-xl hover:bg-red-600 ' onClick={() => { handlePageChange(-1) }} disabled={currPage <= 0} >Previous</button>
                <div className='m-5' >
                    {currPage}
                </div>
                <button className='bg-red-200 p-2 border-2 rounded-xl hover:bg-red-600' onClick={() => { handlePageChange(1) }} disabled={currPage === totalPages - 1}>Next</button>
            </div>
        </div>
    )
}

export default Home
