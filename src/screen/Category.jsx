import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { Playlists } from '../components/playlists/playlist';
import apiClient from '../spotify api/spotify';
import {IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Alert, AlertTitle} from '@mui/material';

export const Category = () => {

    const [categoryPlaylists, setCategoryPlaylists] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    const location= useLocation();
    const navigate = useNavigate();

    async function getGenreRelatedPlaylist() {
        setIsLoading(true);
        apiClient.get(`browse/categories/${location?.state?.id}/playlists?country=se&limit=12`)
                 .then((res)=>setCategoryPlaylists(res.data?.playlists.items))
                 .catch((error)=>setError(error));
        setIsLoading(false);
    }


    React.useEffect(()=>{
        if(location?.state && location.state?.id && location.state?.name ) {
                getGenreRelatedPlaylist();
        }
    },[location.state])

    console.log(categoryPlaylists);


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
        <IconButton size='large'sx={{margin:'1em 2em'}} onClick={()=> navigate(-1)}>
            <ArrowBackIosIcon sx={{color:'#fff'}}/>
        </IconButton>
        <h1 style={{
          color:'#fff',
          paddingLeft:'2em',
        }}>{location?.state?.name} Playlists</h1>
        <Playlists playlists={categoryPlaylists} loading={isLoading}/>
        </> 
      }
    </div>
  )
}
