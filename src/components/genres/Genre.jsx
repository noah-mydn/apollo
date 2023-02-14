import React from 'react'
import {CircularProgress} from '@mui/material'
import {  useNavigate } from 'react-router-dom'
import './genre.css'

export const Genre = ({genres, isLoading}) => {

    const navigate = useNavigate();

    const showGenreRelatedPlaylists = (id, name) => {
            navigate('/category', {state:{id:id, name:name}});
    }

  return (
    <div className='genre-container'>
        {isLoading ? <CircularProgress /> : 
        genres?.map((genre)=>(
            <div className='category' key={genre.id} onClick={()=>{showGenreRelatedPlaylists(genre.id, genre.name)}}>
                <div className='icon-container'>
                    <img src={genre.icons[0].url} alt={genre.name}/>
                </div>
                <div className='title'>
                    <h4>{genre.name}</h4>
                </div>
            </div>
        ))
        
        }
        
    </div>
  )
}
