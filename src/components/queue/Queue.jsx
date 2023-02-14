import React from 'react'
import styled from '@emotion/styled';
import {Box, Skeleton} from '@mui/material';
import './queue.css';

export const Queue = ({songLists,setCurrentIndex,loading}) => {

  const [isHover, setIsHover]= React.useState(null);

  const QueueMusicCard = styled(Box) ({
    cursor:'pointer',
    width:'90%',
    margin:'0.8em auto 0 auto',
    height:'auto',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    // background:'linear-gradient(to right,hsl(221deg 64% 10%), transparent)',
    // borderRadius:'1.5em',
    padding:'0 0.5em',
    position:'relative',
    transform: 'translateY(0)',
    transition:'transform 0.3s ease-in-out',

    '&:hover' : {
      transform: 'translateY(-8px)',
    }
  })

  return (
    <>
    
    <div className='queue-container'>
      <h3>Up Next</h3>
      {loading ? 
      <Skeleton animation='wave' variant='rectangle' width='100%' height='320px' sx={{marginTop: '1em', background:'transparent'}} />
      :
      <div className='queue-body'>
        {songLists.map((songList)=>(
          <QueueMusicCard>
            <img src={songList?.track.album.images[0].url} alt={songList?.track.name} 
            onMouseOver={()=>setIsHover(songList?.track.id)}
            onMouseLeave={()=>setIsHover(null)}
            style={{width:'50px', 
                   height:'50px', 
                   borderRadius:'0.5em',
                   marginRight:'auto'}}/>
            
            <div className='queueSong'>
              <div className='queueSong-info'>
                <p>
                  {songList?.track.name.length > 15 ? `${songList?.track.name.substr(0,15)} ...` : songList?.track.name}
                </p>

                <p>{songList?.track.artists[0].name}</p>

              </div>
              <span>
                0:30
              </span>
              
              </div>
          </QueueMusicCard>
        ))}
        </div>}
    </div>
    </>
  )
}
