import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Divider from '@mui/material/Divider';

export const WidgetBox = ({title,relatedArtists,recommendations, newReleases,isLoading}) => {


    const getFollowerCount = (artist) => {
       
        const followers = artist?.followers.total;

        if (followers > 1000000) {
            return (parseFloat(followers/1000000).toFixed(1))+"M"
        }
        else if(followers >1000) {
            return (parseFloat(followers/1000).toFixed(2))+"K"
        }

        else
            return followers;
    }

     const getMinutes = (recommendation) => {
        if (!isLoading) {
            const milliseconds = recommendation?.duration_ms;
            const seconds = Math.floor((milliseconds/1000)%60);
            const minutes = Math.floor((milliseconds/60000)%60);

            return minutes.toString().padStart(2,0)+":"+seconds.toString().padStart(2,0);
        }
    }

  return (
   <div className='widget-box'>
    <h3>{title}</h3>
    
    <div className='box'>
        {relatedArtists &&
        relatedArtists.map((relatedArtist)=> (
        <>
            <div className='card-widget related-artists'>
                <img src={relatedArtist?.images[0]?.url} alt={relatedArtist.name} width='50px' height='50px' 
                style={{borderRadius:'1em'}}/>
                    <h5>{relatedArtist?.name.split(" ").slice(0, 2).join(" ")}</h5>
                    <div className='followers'>
                        <small>{getFollowerCount(relatedArtist)}</small> <AddBoxIcon sx={{fontSize:12}}/>
                    </div>
            </div>
            <Divider/>
        </>
        ))
        }
        {
           recommendations &&
           recommendations.map((recommendation)=>(
           <>
            <div className='card-widget recommendation'>
                    <img src={recommendation?.album.images[0]?.url} alt={recommendation.name} width='50px' height='50px' 
                    style={{borderRadius:'1em',marginLeft:'0.5em'}}/>
                    <div className='recommendation-info'>
                        <span>{recommendation?.artists[0].name}</span>
                        <span>{recommendation?.name}</span>
                    </div>
                        
                    <span>{getMinutes(recommendation)}</span>
            </div>
            <Divider/>
            </>
           ))  
        }

        {
           newReleases  &&
           newReleases.map((newRelease)=>(
            <>
                <div className='card-widget'>
                        <img src={newRelease?.images[0]?.url} alt={newRelease.name} width='50px' height='50px' 
                        style={{borderRadius:'1em',marginLeft:'0.5em'}}/>
                        <div className='newRelease-info'>
                        <span>{newRelease?.artists[0].name}</span>
                        <span>{newRelease?.name}</span>
                    </div>
                        
                    <span>{newRelease?.total_tracks} tracks</span>
                </div>
                <Divider/> 
            </>
            ))  
            }
            
    </div>
       
        </div>
       
       
    
  )
}
