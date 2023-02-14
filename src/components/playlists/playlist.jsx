import React from 'react'
import {IconButton} from '@mui/material';
import Zoom from '@mui/material/Zoom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useNavigate} from 'react-router-dom'

import './playlist.css';

export const Playlists = ({playlists}) => {

    const [isHover, setIsHover] = React.useState(null);
    const navigate = useNavigate();

    const playPlaylist = (id) => {
        navigate("/player", {state: {id:id}})
    }

    const PlayIcon = () => {
            return (
                
                    <Zoom in={true} mountOnEnter unmountOnExit
                    timeout={300}
                    >
                        <IconButton sx={{ 
                            borderRadius:'50%',
                            background:'#6d44d5',
                            boxShadow:12,
                            position:'absolute',
                            bottom:40,
                            right:15,
                            transform:'scale(1)',
        
                            '&:hover' : {
                                background:'#6d44d5',
                            }
                        }}
                        >
                            <PlayArrowIcon 
                            sx={{
                                color:'#fff',
                                fontSize:25,
                            }}/>
                        </IconButton>
                    </Zoom>
            )
    }

  return (
    <div className='library-body'>
        {playlists?.map((playlist)=> (
            <div className='playlist-card' key={playlist.id}
            onClick={()=>{playPlaylist(playlist.id)}}
            onMouseOver={()=> {setIsHover(playlist.id)}}
            onMouseLeave={()=>{setIsHover(null)}}>
                <img src={playlist.images[0].url}
                alt={playlist.name}
                className='playlist-img'/>
                <h5 className='playlist-title'>
                {(playlist.name.length) > 20 ? 
                    `${playlist.name.slice(0,20)} ...` :
                    playlist.name
                } 
                </h5>

                <small className='playlist-tracks'>
                   {playlist.tracks.total} tracks
                </small>
                
                {isHover === playlist.id && 
                
                    <PlayIcon playlist={playlist}/>
                }
            </div>
        ))}
    </div>
  )
}
