import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({channelDetail, marginTop}) => ( //marginTop as a prop can be used as an optional
    <Box sx={{
      boxShadow:'none', 
      borderRadius:'20px', 
      display:'flex', 
      justifyContent:'center',
      alignItems:'center',
      width: { sx: '356px', md:'320px'},
      height:'326px',
      margin: 'auto',
      border: '1.5px solid #d2c8fb',
      marginTop,}}>
        <Link to={`/channel/${channelDetail?.id?.channelId}`}>
            <CardContent sx={{display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center', color: '#0A032E', alignItems:'center'}}>
                <CardMedia 
                    image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture} 
                    alt={channelDetail?.snippet?.title}
                    sx={{borderRadius:'50%', height: '180px', width: '180px', mb: 2, border: '1px solid #BEB2FA'}}/>

                <Typography variant='h6'>
                    {channelDetail?.snippet?.title}
                    <CheckCircle sx={{fontSize: 14, color: '#785EF6', ml:'5px'}} />
                </Typography>
                {channelDetail?.statistics?.subscriberCount && (
                    <Typography>
                        {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
                    </Typography>
                )}
            </CardContent>
        </Link>
    </Box>
)

export default ChannelCard