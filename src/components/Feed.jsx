import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Sidebar, Videos } from './';

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('Recommended');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items));
  },[selectedCategory]);

  return (
    <Stack sx={{flexDirection: { sx:'column', md:'row'}}}>
      <Box sx={{height:{sx: 'auto', md: '90vh' }, borderRight:'2px solid #D8D1FC',pl: { sx: 2, md: 2 },pr: { sx: 2, md: 4 }, overflowY: 'auto'}}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

        <Typography className='copyright' variant='body2' sx={{mt:1.5, color: '#0A032E'}}>
          Copyright 2024 Sara Chong
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex:2}}>
        <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: '#0A032E'}} ml='30px' >
          {selectedCategory} <span style={{color: '#785EF6'}}>videos</span>
        </Typography>

        <Videos videos={videos}>

        </Videos >
      </Box>
    </Stack>
  )
}

export default Feed