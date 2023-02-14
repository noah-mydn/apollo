import React from 'react'
import './controls.css'
import {IconButton} from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import styled from '@emotion/styled';

export const Controls = ({isPlaying,setIsPlaying,handlePrev,handleNext,total, isPreviewNull}) => {

  //console.log("Is Preview Null in Controls:", isPreviewNull);
  //const checkDisabled = isPreviewNull ? true : false;

  const CustomIconButton = styled(IconButton)({
    backgroundImage: `linear-gradient(
      180deg,
      hsl(240deg 69% 16%) 0%,
      hsl(244deg 71% 17%) 21%,
      hsl(248deg 72% 18%) 30%,
      hsl(252deg 74% 19%) 39%,
      hsl(257deg 76% 20%) 46%,
      hsl(261deg 77% 20%) 54%,
      hsl(265deg 79% 21%) 61%,
      hsl(269deg 81% 22%) 69%,
      hsl(273deg 83% 22%) 79%,
      hsl(277deg 85% 23%) 100%
    )`,
    transform:'scale(1) translateY(0)',
    transition:'transform 0.3s ease-in-out',
    margin:'0 1em',

    '&:hover': {
      transform:'scale(1.03) translateY(-10px)'
    }
  });
  

  return (
    <div className='controls-container'>
        <CustomIconButton onClick={handlePrev} >
          <SkipPreviousIcon sx={{color:'#fff'}}/>
        </CustomIconButton>
        <CustomIconButton onClick={()=>{setIsPlaying(!isPlaying)}}  >
            {isPlaying ? <PauseIcon sx={{color:'#fff'}}/> : <PlayArrowIcon sx={{color:'#fff'}}/>}
        </CustomIconButton>
        <CustomIconButton onClick={handleNext} >
          <SkipNextIcon sx={{color:'#fff'}}/>
        </CustomIconButton>
    </div>
  )
}
