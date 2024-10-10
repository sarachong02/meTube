import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos } from './';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items));
  },[searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex:2, mx: { sm: 'auto', md: 'auto' }}}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: '#0A032E'}} paddingBottom='10px'>
        Search Results for: <span style={{color: '#785EF6'}}>{searchTerm}</span> videos
      </Typography>

      <Videos videos={videos}>

      </Videos >
    </Box>
  )
}

export default SearchFeed