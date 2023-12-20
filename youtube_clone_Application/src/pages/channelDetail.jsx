import { Box } from '@mui/material'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Videos from './../components/videos';
import ChannelCard from '../components/channelCard';
import { fetchFromApi } from '../utils/fetchAPI';

function ChannelDetail() {
    const { id } = useParams()
    const [channelDetail, setChannelDetail] = useState()
    const [videos, setVideos] = useState(null)

    useEffect(() => {
        const fetchResults = async () => {
            const data = await fetchFromApi(`channels?part=snippet&id=${id}`);
            setChannelDetail(data?.items[0]);
            const videosData = await fetchFromApi(`search?channelId=${id}&part=snippet%2Cid&order=date`);
            setVideos(videosData?.items);
        };
        fetchResults();
    }, [id])

    return (
        <Box minHeight="95vh">
            <Box>
                <div 
                    style={{
                        height:'300px',
                        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(47,172,76,1) 0%, rgba(0,212,255,1) 100%)',
                        zIndex: 10,
                    }} 
                />
                <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
            </Box>
            <Box p={2} display="flex">
            <Box sx={{ mr: { sm: '100px' } }}/>
                <Videos videos={videos} />
            </Box>
        </Box>
    )
}

export default ChannelDetail