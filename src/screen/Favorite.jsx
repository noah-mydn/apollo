import React from 'react'
import {TrackLists}  from '../components/trackLists/TrackLists';
import apiClient from '../spotify api/spotify';
import { IconButton } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {useNavigate} from 'react-router-dom'
import {Alert, AlertTitle} from '@mui/material';

export const Favorite = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [favoriteTracks, setFavoriteTracks] = React.useState([]);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  async function getSavedTracks() {
    setIsLoading(true);
      apiClient.get('/me/tracks?offset=0&limit=50')
               .then((res)=>setFavoriteTracks(res.data?.items))
               .catch((error)=>setError(error));
    setIsLoading(false);
  }

  React.useEffect(()=>{
    getSavedTracks();
  },[])

  const playFavourite = () => {
      navigate('/player', {
        state: {
          trackLists:favoriteTracks,
          index:0,
        }
      })
  }

  //console.log(favoriteTracks);

  return (
    <div className='screen-container'>
      {(error) ? 
        <div className='error-box'>
          <Alert severity="error" variant='filled' sx={{padding:'1em 2em'}}>
              <AlertTitle><strong>{error?.message}</strong></AlertTitle>
              {error?.response.data}
        </Alert>
        </div> :
        <>
      <h1 style={{
          color:'#fff',
          padding:'1em 0 0 1em',
        }}>Favorite Tracks</h1>
      <div className='favorite-tracks-container'>
          <IconButton size='large' onClick={playFavourite}>
              <PlayCircleFilledIcon sx={{fontSize:'2em', color:'white'}}/>
          </IconButton>
          <TrackLists trackLists={favoriteTracks} isLoading={isLoading}/>
      </div>
      </>
      }
    </div>
  )
}
