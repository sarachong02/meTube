import React, {useEffect} from 'react';
import { Stack, Box } from '@mui/material';
import { VideoCard, ChannelCard } from "./";

const Videos = ({videos, direction}) => {

  if(!videos?.length) return "Loading...";

  return (
    <Stack direction={direction || 'row'} flexWrap='wrap' justifyContent='center' alignItems='flex-start' gap={4} > 
        {videos.map((item, index) => (
          (item.id.videoId || item.id.channelId) && (
            <Box key={index}>
                {item.id.videoId && <VideoCard video={item}/>}  {/*if this is a video, then it will have a videoID */}
                {item.id.channelId && <ChannelCard channelDetail={item} border='1.5px solid #d2c8fb' backgroundColor='#d2c8fb'/>}
            </Box>
        )))}
    </Stack>
  )
}

export default Videos