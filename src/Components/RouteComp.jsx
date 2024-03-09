import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Videos from './Videos'

const RouteComp = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/:page/:videoId" element={<Videos />} />
            </Routes>
        </div>
    )
}

export default RouteComp
