import React from 'react';
import { Stack, Box } from '@mui/material';
import { VideoCard, ChannelCard } from "./";

const Videos = ({videos}) => {
  return (
    <Stack direction='row' flexWrap='wrap' justifyContent='center' gap={2}> 
        {videos.map((item, idx) => (
            <Box key={idx}>
                {item.id.videoId && <VideoCard video={item}/>}  {/*if this is a video, then it will have a videoID */}
                {item.id.channelId && <ChannelCard channelDetail={item}/>}
            </Box>
        ))}
    </Stack>
  )
}

export default Videos