import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from '../utils/fetchFromAPI';


const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
            background: 'radial-gradient(circle, rgba(205,193,255,1) 0%, rgba(165,148,249,1) 100%)',
            zIndex: 10,
            height: '300px'
        }}/>

        <ChannelCard channelDetail={channelDetail} marginTop= '-93px' />
      </Box>

      <Box display="flex" p='2' justifyContent='center' paddingTop='20px'>
        <Box sx={{mr: {sm: '5px'}}} justifyContent='center' />
        <Videos videos={videos} />
      </Box>

      {/* <Box p={2} display="flex">
        <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />
      </Box> */}
    </Box>
  )
}

export default ChannelDetail