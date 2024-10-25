import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Videos } from "./";
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data => setVideos(data.items)))

    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=100`)
      .then((data) => setComments(data.items))

    // fetchFromAPI(`comments?part=snippet&id=${id}`)
    //   .then((data)) do comment info****
  },[id]);

  if (!videoDetail?.snippet) return 'Loading...';

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail; //object destructuring

  return (
    <Box minHeight="90vh" >
      <Stack direction={{xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width: '96%', position: 'sticky', top: '86px', ml: { xs: 0, md: 4 }}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls/>
            <Typography color="#0A032E" variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>

            <Stack direction='row' justifyContent='space-between' sx={{
              color:"#fff"}} py={1} px={2}>
                <Link to={`/channel/${channelId}`}>
                  <Typography sx={{ fontSize: { xs: 'subtitle1', md: 'h6' } }} color="#0A032E">
                    {channelTitle}
                    <CheckCircle sx={{fontSize: '12px', color: '#785EF6', ml: '5px'}}/>
                  </Typography>
                </Link>

                <Stack direction='row' gap='20px' alignItems='center'>
                  <Typography variant='body1' color= '#0A032E' sx={{opacity: 0.7}}>
                    {parseInt(viewCount).toLocaleString()} views 
                  </Typography>
                  <Typography variant='body1' color= '#0A032E' sx={{opacity: 0.7}}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                </Stack>
            </Stack>

            <Stack direction="column" gap="20px" alignItems="start">
              {comments.map((comment, index) => {
                const commentText = comment.snippet.topLevelComment.snippet.textDisplay.replace(/<br\s*\/?>/gi, ' ');
              
              return(
                <Box 
                  key={index} 
                  flexWrap="wrap" 
                  justifyContent="center" 
                  paddingTop='10px'
                  sx={{
                    width: '-webkit-fill-available;',
                    opacity: '0.6',
                    padding: '16px', 
                    borderRadius: '8px', 
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left'
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {commentText} {/* Display the cleaned comment text */}
                  </Typography>
                </Box>
              )})}
            </Stack>
          </Box>
        </Box>

        <Box px={2} py={{md: 1, xs: 5}} justifyContent='center' alignItems='center' sx={{ overflowY: 'auto', height: '90vh', mr: { xs: 0, md: 1} }}>
          <Videos videos={videos} direction="column"/>
      </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail

// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import ReactPlayer from 'react-player';
// import { Typography, Box, Stack } from '@mui/material';
// import { CheckCircle } from '@mui/icons-material';

// import { Videos } from "./";
// import { fetchFromAPI } from '../utils/fetchFromAPI';

// const VideoDetail = () => {
//   const [videoDetail, setVideoDetail] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [comments, setComments] = useState([]);
//   const { id } = useParams();
//   const [pageToken, setPageToken] = useState(null);
  
//   // Effect to fetch initial data
//   useEffect(() => {
//     fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
//       .then((data) => setVideoDetail(data.items[0]));

//     fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
//       .then((data) => {
//         setVideos(data.items);
//         setPageToken(data.nextPageToken);
//       });

//     fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=100`)
//       .then((data) => setComments(data.items));
//   }, [id]);

//   // Function to load more videos
//   const loadMoreVideos = () => {
//     if (pageToken) {
//       fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video&pageToken=${pageToken}`)
//         .then((data) => {
//           setVideos((prevVideos) => [...prevVideos, ...data.items]);
//           setPageToken(data.nextPageToken);
//         });
//     }
//   };

//   // Effect to handle window scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const { innerHeight, scrollY, document } = window;
//       const { scrollHeight } = document.body;
//       // Check if scrolled to the bottom of the page
//       if (innerHeight + scrollY >= scrollHeight - 50) { // Adjust -50 for threshold
//         loadMoreVideos();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Cleanup event listener on unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [pageToken, videos]); // Include pageToken and videos to ensure up-to-date dependencies

//   if (!videoDetail?.snippet) return 'Loading...';

//   const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

//   return (
//     <Box minHeight="90vh">
//       <Stack direction={{ xs: 'column', md: 'row' }}>
//         <Box flex={1}>
//           <Box sx={{ width: '96%', position: 'sticky', top: '86px', ml: { xs: 0, md: 4 } }}>
//             <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
//             <Typography color="#0A032E" variant='h5' fontWeight='bold' p={2}>
//               {title}
//             </Typography>

//             <Stack direction='row' justifyContent='space-between' sx={{ color: "#fff" }} py={1} px={2}>
//               <Link to={`/channel/${channelId}`}>
//                 <Typography sx={{ fontSize: { xs: 'subtitle1', md: 'h6' } }} color="#0A032E">
//                   {channelTitle}
//                   <CheckCircle sx={{ fontSize: '12px', color: '#785EF6', ml: '5px' }} />
//                 </Typography>
//               </Link>

//               <Stack direction='row' gap='20px' alignItems='center'>
//                 <Typography variant='body1' color='#0A032E' sx={{ opacity: 0.7 }}>
//                   {parseInt(viewCount).toLocaleString()} views
//                 </Typography>
//                 <Typography variant='body1' color='#0A032E' sx={{ opacity: 0.7 }}>
//                   {parseInt(likeCount).toLocaleString()} likes
//                 </Typography>
//               </Stack>
//             </Stack>

//             <Stack direction="column" gap="20px" alignItems="start">
//               {comments.map((comment, index) => (
//                 <Box
//                   key={index}
//                   flexWrap="wrap"
//                   justifyContent="center"
//                   paddingTop='10px'
//                   sx={{
//                     width: '-webkit-fill-available;',
//                     opacity: '0.6',
//                     padding: '16px',
//                     borderRadius: '8px',
//                     backgroundColor: '#f5f5f5',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     textAlign: 'left'
//                   }}
//                 >
//                   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                     {comment.snippet.topLevelComment.snippet.authorDisplayName}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'gray' }}>
//                     {comment.snippet.topLevelComment.snippet.textDisplay}
//                   </Typography>
//                 </Box>
//               ))}
//             </Stack>
//           </Box>
//         </Box>

//         <Box 
//           px={2} 
//           py={{ md: 1, xs: 5 }} 
//           justifyContent='center' 
//           alignItems='center' 
//           sx={{ overflowY: 'auto', height: '90vh', mr: { xs: 0, md: 1 } }}
//         >
//           <Videos videos={videos} direction="column" />
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default VideoDetail;