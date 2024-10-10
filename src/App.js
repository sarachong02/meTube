import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed} from "./components";

const App = () => (
  <BrowserRouter>
    <Box sx={{backgroundColor: '#e5d9f2', height: '100vh', width: '100vw', overflowX: 'hidden', overflowY: 'hidden'}}> {/*1b1212*/}
        <Navbar />
        <Routes>
            <Route path="/" exact element={<Feed />}/>
            <Route path="/video/:id" element={<VideoDetail />}/>
            <Route path="/channel/:id" element={<ChannelDetail />}/>
            <Route path="/search/:searchTerm" element={<SearchFeed />}/>
        </Routes>
    </Box>
  </BrowserRouter>
)

export default App