import React from 'react'
import './audioplayer.css'
import {Skeleton} from '@mui/material';
import { Controls } from '../controls/Controls';
import { WaveAnimation } from '../waveAnimation/WaveAnimation';


export const AudioPlayer = ({currentTrack, loading, 
    currentIndex, setCurrentIndex, total}) => {


    const [isPlaying, setIsPlaying] = React.useState(false);
    const [trackProgress, setTrackProgress] = React.useState(0);
    //const [isPreviewNull, setIsPreviewNull] = React.useState(true);
    
    var audioSrc = total[currentIndex]?.track.preview_url;

    const imageClass = isPlaying ? "player-image rotate" : "player-image";

    const artists = [];
    
    if(currentTrack && !loading) {
           currentTrack?.artists.forEach(artist => {
          artists.push(artist.name);
        })
        }

    const audioRef= React.useRef(new Audio(total[0]?.track.preview_url));
    const intervalRef = React.useRef();
    const isReady = React.useRef(true);

const audioSrcMemo = React.useMemo(() => audioSrc, [audioSrc]);
const currentIndexMemo = React.useMemo(() => currentIndex, [currentIndex]);
const isPlayingMemo = React.useMemo(()=>isPlaying, [isPlaying]);
          

//Setting duration timer for the track
    const startTimer = () => {
        clearInterval(intervalRef.current);
    
        intervalRef.current = setInterval(() => {
          if (audioRef.current.ended) {
            handleNext();
          } else {
            setTrackProgress(audioRef.current.currentTime);
          }
        }, [1000]);
      };

    
//Checking track source to control audio function
React.useEffect(() => {
    if (audioSrc) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
        setIsPlaying(false);
        clearInterval(intervalRef.current);
        audioRef.current.pause();
        return;
    }
  }, [isPlayingMemo, audioSrcMemo]);


//Setting track progress   
React.useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    if(audioSrc===null) {
        setIsPlaying(false);
    }
    else {
        setTrackProgress(0);
        if (isReady.current && isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    }
    
}, [audioSrcMemo, currentIndexMemo]);

//Cleaning useEffect
      React.useEffect(() => {
        return () => {
          setIsPlaying(false);
          audioRef.current.pause();
          clearInterval(intervalRef.current);
        };
      }, []);

    const handleNext = () => {
        if(currentIndex < total.length-1) {
            setCurrentIndex(currentIndex + 1);
        }

        else {
            setCurrentIndex(0);
        }
    }

    const handlePrev = () => {
        if(( currentIndex -1 < 0)) {
            setCurrentIndex(total.length-1);
        }

        else {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const addZero = (n) => {
        return n > 9 ? "" + n : "0" + n;
      };

    //console.log("All tracks : ",total);
    //console.log(audioSrc);
    //console.log("Is Preview Null:", isPreviewNull);
    //console.log(isPlaying);
    //console.log(isReady.current);
    //console.log(currentIndex);

  return (
    <>
    
    <div className='player-body'>
        <div className='player-left-body'>
            <div className='player-image-holder'>
              {loading ? (
                <Skeleton variant='circular' width={230} height={230} animation='wave'/>
              ) : 
              
              (<img className={imageClass}
                src={currentTrack?.album.images[0].url}
                alt={currentTrack?.name}/>)
              }
                
            </div>
        </div>
        <div className='player-right-body'>
            {loading ?  
            <Skeleton variant='text' width={200} height={50} animation='wave'/> :
            <p className='track-title'>{currentTrack?.name}</p>}
            {loading ? 
            <Skeleton variant='text' width={150} height={30} animation='wave'/> :
            <p className='track-artists'>{artists.join(',')}</p>}
            
            <div className='player-right-bottom'>
                <div className='track-duration'>
                    <p className='duration'>0:{addZero(Math.round(trackProgress))}</p>
                        <WaveAnimation isPlaying={isPlaying} currentTrack={currentTrack}/>
                    <p className='duration'>0:30</p>
                </div>
                <Controls isPlaying={isPlaying}
                          setIsPlaying={setIsPlaying}
                          handlePrev={handlePrev}
                          handleNext={handleNext}
                        //   isPreviewNull={isPreviewNull}
                          total={total}/>
            </div>
           
        </div>
        
    </div>
    
    
    </>
  )
}
