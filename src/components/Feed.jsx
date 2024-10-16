import React, { useState, useEffect, useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Sidebar, Videos } from './';

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('Recommended');
  const [videos, setVideos] = useState([]);
  const videoListRef = useRef(null); // Create a ref for the video list

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items));

    if (videoListRef.current) {
      videoListRef.current.scrollTo({
        top: 0,
        behavior: 'smooth', // Use smooth scrolling
      });
    }
  },[selectedCategory]);

  return (
    <Stack sx={{flexDirection: { sx:'column', md:'row'}}}>
      <Box sx={{height:{sx: 'auto', md: '90vh' }, borderRight:'2px solid #D8D1FC',pl: { sx: 2, md: 2 },pr: { sx: 2, md: 4 }, overflowY: 'auto'}}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

        <Typography className='copyright' variant='body2' sx={{mt:1.5, color: '#0A032E'}}>
          Copyright 2024 Sara Chong
        </Typography>
      </Box>

      <Box ref={videoListRef} p={2} sx={{ overflowY: 'auto', height: '90vh', flex:2, px: { xs: 1, md: 2}}}> 
        <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: '#0A032E'}} ml='30px' >
          {selectedCategory} <span style={{color: '#785EF6'}}>Videos</span>
        </Typography>

        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed