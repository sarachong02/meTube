import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';

const VideoCard = ({video : {id: {videoId}, snippet}}) => {
    
  return (
    <Card sx={{width: {md: '325px', xs: '100%'}, boxShadow:'none', borderRadius:5}}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <CardMedia 
              image={snippet?.thumbnails?.high?.url}
              alt={snippet?.title}
              sx={{width:358, height: 180}}/>
        </Link>

        <CardContent sx={{backgroundColor: '#d2c8fb', height: '106px'}}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <Typography variant='subtitle1' fontWeight='bold' color='#0A032E'>
                    {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)};
                </Typography>
            </Link>

            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                <Typography variant='subtitle1' fontWeight='bold' color='#785EF6'>
                    {snippet?.channelTitle || demoChannelTitle}
                    <CheckCircle sx={{fontSize: 12, color: '#785EF6', ml:'5px'}} />
                </Typography>
            </Link>
        </CardContent>
    </Card>
  )
}

export default VideoCard