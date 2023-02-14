import React, { useState } from 'react'
import apiClient from '../../spotify api/spotify'
import './widget.css';
import Carousel from 'react-material-ui-carousel'
import {Skeleton} from '@mui/material';
import { WidgetBox } from '../widgetBox/WidgetBox';

export const Widget = ({playlist,loading}) => {

    const [relatedArtists, setRelatedArtists] = React.useState([]);
    const [recommendations, setRecommendations] = React.useState([]);
    const [newReleases, setNewReleases] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

   
    if(!loading) {
        var artistId = playlist[0]?.track?.artists[0].id;
        var seedTrack = playlist[0]?.track?.id;
        var seedGenre = 'pop%2Cindie%2Crock%2C';
    }


    async function getRelatedArtists() {
        setIsLoading(true);
        apiClient.get(`/artists/${artistId}/related-artists`)
                 .then((res)=>setRelatedArtists(res.data?.artists.slice(0,4)))
                 .catch((error)=> console.log(error))
        setIsLoading(false);
    }

    async function getRecommendations() {
        setIsLoading(true);
        apiClient.get(`/recommendations?limit=10&market=ES&seed_artists=${artistId}&seed_genres=${seedGenre}&seed_tracks=${seedTrack}`)
                 .then((res)=>setRecommendations(res.data?.tracks.slice(0,4)))
                 .catch((error)=> console.log(error))
                 setIsLoading(false);
                
    }

    async function getNewReleases() {
        setIsLoading(true);
        apiClient.get('browse/new-releases?country=ES&limit=10')
                 .then((res)=> setNewReleases(res?.data.albums.items.slice(0,4)))
        setIsLoading(false);
    }

    React.useEffect(()=>{
        getRelatedArtists();
        getRecommendations();
        getNewReleases();
    },[playlist])


    
    //console.log(relatedArtists);
    //console.log("New Release:",newReleases);
    //console.log(recommendations);

  return (
    <div className='widgets'>
            <Carousel className='carousel'
            autoPlay={true}
            interval={5000}
            animation='fade'
            swipe={true}
            indicators={false}>
                <div className='carousel-content'>
                    {
                        isLoading ? 
                        <>
                            <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290} width={300}/>
                            <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290} width={300}/>
                        </>
                        :
                        <>
                            <WidgetBox title='Related Artists' relatedArtists={relatedArtists}/>
                            <WidgetBox title='Recommendations' recommendations={recommendations}/>
                        </>
                    }
                    
                </div>

                <div className='carousel-content'>
                {
                        isLoading ? 
                        <>
                            <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290} width={300}/>
                            <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290} width={300}/>
                        </>
                        :
                        <>
                            <WidgetBox title='Recommendations' recommendations={recommendations}/>
                            <WidgetBox title='New Releases' newReleases={newReleases}/>
                        </>
                    }
                </div>

                <div className='carousel-content'>
                {
                        isLoading ? 
                        <>
                            <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290} width={300}/>
                            <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290} width={300}/>
                        </>
                        :
                        <>
                            <WidgetBox title='New Releases' newReleases={newReleases}/>
                            <WidgetBox title='Related Artists' relatedArtists={relatedArtists}/>
                        </>
                    }
                </div>
                
                
            </Carousel>
            

            
            {/* <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290}/>
            <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290}/>
            <Skeleton variant='rectangle' animation='wave' className='skeleton' height={290}/> */}
    </div>
  )
}
