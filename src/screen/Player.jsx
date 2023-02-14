import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AudioPlayer } from '../components/audioplayer/AudioPlayer';
import { Queue } from '../components/queue/Queue';
import { SoundCard } from '../components/soundcard/SoundCard';
import { Widget } from '../components/widget/Widget';
import apiClient from '../spotify api/spotify'
import {Alert, AlertTitle, Button} from '@mui/material';

export const Player = () => {

  const [tracks, setTracks] = React.useState([]);
  const [currentTrack, setCurrentTrack]= React.useState({});
  const [loading,setLoading] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  async function getTracks() {
    setLoading(true);
    apiClient.get('playlists/'+ location.state?.id+'/tracks')
    .then(response => {
      setTracks(response.data.items);
      setCurrentTrack(response.data?.items[0]?.track);
      setLoading(false);
      })
      .catch(error => console.error(error));

  }

  React.useEffect(() => {
    if (location.state) {
      if (location.state && location.state?.id) {
        getTracks();
      } else if (location.state && location.state?.trackLists) {
        setTracks(location.state?.trackLists);
        setCurrentIndex(location.state?.index);
        setCurrentTrack(location.state?.trackLists[currentIndex].track);
        setLoading(false);
      }
    }
  }, [location.state]);
  

  React.useEffect(() => {
    if (tracks.length) {
      setCurrentTrack(tracks[currentIndex]?.track);
    }
  }, [currentIndex, tracks]);
  

  if(!(location?.state)) {
     return (
      <div className='playlist-not-found'>
            <Alert variant="filled" severity="error">
                <AlertTitle>Player Error</AlertTitle>
                  You haven't selected any playlists or tracks yet.
                  Please choose a song to play first.
                  <Button onClick={()=>navigate('/')} 
                  sx={{
                    color:'#fff',
                    display:'block',
                    margin:'0 auto',
                    marginTop:'1em',
                    padding:'0.7em 2em',
                    border:'2px solid white'
                  }}>Go Back</Button>
            </Alert>
      </div>
      
     )
    
  }

  //console.log(location);
  //console.log(tracks);
  //console.log(currentTrack);
  // console.log(loading);
  //console.log(currentIndex);

  return (
 
      <div className='screen-container' style={{display:'flex'}}>
        <div className='left-player-body'>
          <AudioPlayer currentTrack={currentTrack} 
                       loading={loading} 
                       total={tracks}
                       currentIndex={currentIndex} 
                       setCurrentIndex={setCurrentIndex}/>
          <Widget playlist={tracks} loading={loading}/>
        </div>
        <div className='right-player-body'>
        {/* { (tracks && !loading) ?
         (<>  */}
          <SoundCard track={currentTrack} loading={loading}/>
          <Queue songLists={tracks} setCurrentIndex={setCurrentIndex} loading={loading}/>
         {/* </>) :
         (<p>Loading...</p>)
         } */}
        </div>
      </div>
  )
}
