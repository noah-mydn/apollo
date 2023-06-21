import React from 'react';
import { Genre } from '../components/genres/Genre';
import apiClient from '../spotify api/spotify';
import {Alert, AlertTitle} from '@mui/material';


export const Feed = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [genres, setGenres] = React.useState([]);
  const [error, setError] = React.useState('');

  async function getGenres() {
    setIsLoading(true);
    apiClient.get('/browse/categories?country=SE&limit=16')
             .then((res)=>setGenres(res.data?.categories.items))
             .catch((error)=>setError(error));
    setIsLoading(false);
  }

  React.useEffect(()=>{
    getGenres();
  },[])



  //console.log(genres);

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
        }}>What do you like to listen today?</h1>
        
        <div className='feed-container'>
            <Genre genres={genres} isLoading={isLoading}/>
        </div>
        </>
        }
    </div>
  )
}
