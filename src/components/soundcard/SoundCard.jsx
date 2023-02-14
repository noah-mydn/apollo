import React from 'react'
import './soundcard.css'
import {Box, Typography, IconButton, Skeleton} from '@mui/material';
import styled from '@emotion/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import apiClient from '../../spotify api/spotify';

export const SoundCard = ({track,loading}) => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [favTracks, setFavTracks] = React.useState([]);
  const artists = [];


  if(track && !loading) {
     track?.artists.forEach(artist => {
    artists.push(artist.name);
  })

  }

  const checkFav = (track) => {
    if (!isLoading && favTracks) {
        for(var i=0;i<favTracks.length;i++) {
          if(favTracks[i]?.track?.id ===  track?.id) {
              return true;
          }
        }
    }
    return false;
  }
  

  async function getSavedTracks() {
    setIsLoading(true);
      apiClient.get('/me/tracks?offset=0&limit=50')
               .then((res)=>setFavTracks(res.data?.items))
    setIsLoading(false);
  }

  React.useEffect(()=>{
    getSavedTracks();
  },[])

 //console.log(favTracks)

  const AlbumImage = styled(Box) ({
    padding:'0.5em',
    width:'40%',
    borderRadius:'0.5em',
    marginBottom:'0.5em',
    filter: 'drop-shadow(3px 4px 4px #0c0c0c)',
    margin:'0 auto',
    borderRadius:'1em',

  })

  const AlbumContent = styled(Box)({
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:'1em',
  })



  const AlbumDescription = styled(Box) ({
    color:'white',
    overflow:'hidden',
    width:'100%',
    padding:'0 1em'
  })

  function getDuration(milliseconds) {
    var minute = Math.floor(milliseconds/60000);
    var seconds = Math.floor((milliseconds % 60000)/1000).toFixed(0);
    if(seconds < 10) {
      seconds='0'+seconds;
    }

    return minute+":"+seconds;
  }

  //console.log("Track: ",track);
 
  return (
    <>
    {loading ? 
      <Skeleton animation='wave' variant='rectangle' width='100%' height='280px' sx={{borderRadius:'1.5em'}} />
      :
      
      <div className='soundcard-container'>

            <AlbumImage component='img' src={track?.album.images[0].url} alt={track?.album.name}/>
            
            <AlbumContent>
              <AlbumDescription>
                    <Typography variant='body1' gutterBottom className='marquee'>{track?.name} - {artists.join(',')}</Typography>
                    <Typography variant='caption' component='h6' 
                    gutterBottom>{track?.album.album_type.toUpperCase()} &#x2022; {track?.album.release_date.substr(0,4)}</Typography>
                    <Typography variant='caption' component='h6'>
                      {getDuration(track?.duration_ms)}
                    </Typography>
              </AlbumDescription> 
              <IconButton>
              {checkFav(track) === true ? (
                <FavoriteIcon sx={{ color: "#D81146" }} />
                ) : (
                <FavoriteBorderIcon sx={{ color: "#D81146" }} />
                )}
              </IconButton>
              
            </AlbumContent>
          
    </div>}
    </>
  )
}
