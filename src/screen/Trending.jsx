import React from 'react'
import { TrackLists } from '../components/trackLists/TrackLists'
import apiClient from '../spotify api/spotify';
import {IconButton} from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {useNavigate} from 'react-router-dom'

export const Trending = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [trendingSongs, setTrendingSongs] = React.useState([]);
  
  const TOP_50_TRACKS = '37i9dQZEVXbMDoHDwVN2tF';
  const navigate = useNavigate();

  async function getTrendingTracks() {
    setIsLoading(true);
    apiClient.get(`playlists/${TOP_50_TRACKS}/tracks`)
             .then((res)=>(setTrendingSongs(res.data?.items)))
             .catch((error)=>console.log(error));
        setIsLoading(false);
  }

  React.useEffect(()=>{
    getTrendingTracks();
  },[])

  const playTracks = () => {
        navigate('/player', {
          state: {
            trackLists:trendingSongs,
            index:0,
          }
        })
    }
  //console.log(trendingSongs)

  return (
    <div className='screen-container'>
      <h1 style={{
          color:'#fff',
          padding:'1em 0 0 1em',
          
        }}>Trending Music</h1>
        <IconButton size='large' onClick={playTracks} sx={{marginLeft:'1em'}}>
              <PlayCircleFilledIcon sx={{fontSize:'2em', color:'white'}}/>
          </IconButton>
       <TrackLists trackLists={trendingSongs} isLoading={isLoading}/>
    </div>
  )
}
