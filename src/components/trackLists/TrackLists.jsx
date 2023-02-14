import React from 'react'
import './trackLists.css';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Skeleton} from '@mui/material'
import { Favorite } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled';
import {useNavigate} from 'react-router-dom'
import apiClient from '../../spotify api/spotify';

export const TrackLists = ({trackLists, isLoading}) => {

    const [loadingFav, setLoadingFav] = React.useState(true);
    const [isFavTracks, setIsFavTracks] = React.useState([]);
    const trackIDs = [];


    if(trackLists && !isLoading) {

        for (var i=0;i<trackLists.length;i++) {
            trackIDs.push(trackLists[i]?.track.id);
        }
        
     }
   

     React.useEffect(()=>{ 

        if(!isLoading && trackIDs) {
            apiClient.get(`me/tracks/contains?ids=${trackIDs}`)
                 .then((res)=>setIsFavTracks(res.data))
                 .catch((error)=>console.log(error));
            }
        
     },[trackLists])

    //console.log(trackIDs);

    const table_headers = [
        {id:1, label:'No', width:'5%'},
        {id:2, label:'Track', width:'35%'},
        {id:3, label:'Album', width:'30%'},
        {id:4, label:'Dated Added', width:'15%'},
        {id:5, label:'', width:'5%'},
        {id:6, label:'Duration', width:'10%'},

    ];
    const navigate = useNavigate();

    const getArtists = (song) => {
        const artists = [];
        if(!isLoading) {
            song?.track.artists.forEach(artist => {
                artists.push(artist.name);
              })
        }

        return artists.join(',');
    }

    const getDateAdded = (date) => {
        const dateString = new Date(date);
        const currentDate = new Date();

        const diffInMilliseconds = currentDate.getTime() - dateString.getTime();
        const diffInSeconds = diffInMilliseconds / 1000;
        const diffInMinutes = diffInSeconds / 60;
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;

        let differences;
        let dateDifference;

        if(diffInMinutes < 1) {
        dateDifference = Math.floor(diffInSeconds) + ' seconds ago'
        }else if (diffInHours < 1) {
            differences = Math.floor(diffInMinutes) 
        dateDifference = differences === 1 ? 'a minute ago' : differences+ ' minutes ago';
        }else if (diffInDays < 1) {
            differences = Math.floor(diffInHours) 
        dateDifference = differences === 1 ? 'an hour ago' : differences+ ' hours ago';
        } else if (diffInDays < 30) {
            differences = Math.floor(diffInDays)
        dateDifference = differences === 1 ? 'a day ago': differences+ ' days ago';
        } else if (diffInDays < 365) {
            differences = Math.floor(diffInDays / 30)
        dateDifference = differences === 1 ? 'a month ago' : differences+ ' months ago';
        } else {
            differences = Math.floor(diffInDays / 365) 
        dateDifference = differences === 1 ? 'a year ago' : differences+ ' years ago';
        }

        return dateDifference;
    }

    const getMinutes = (song) => {
        if (!isLoading) {
            const milliseconds = song?.track.duration_ms;
            const seconds = Math.floor((milliseconds/1000)%60);
            const minutes = Math.floor((milliseconds/60000)%60);

            return minutes.toString().padStart(2,0)+":"+seconds.toString().padStart(2,0);
        }
    }

    const playFavSongs = (index) => {
        navigate("/player", {state: 
            {trackLists:trackLists,
            index:index}})
    }

    const CustomTableRow = styled(TableRow) ({
        cursor:'pointer',
        '&:hover': {
            background:'rgba(0,0,0,0.15)',
       }
    })

    const CustomTableCell = styled(TableCell) ({
       borderBottom:'none',
       color:'rgba(255,255,255,0.8)',
       padding:'0.5em !important',
       background:'transparent',

    })

  


  return (
    <div className='track-list-container'>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {table_headers.map((table_header)=> (
                            <TableCell key={table_header.id}
                            sx={{
                                fontSize:'1.2em',
                                color:'rgb(169, 192, 255)',
                                borderBottom:'1px solid #829ab1',
                                }}
                            align='left'
                            width={table_header.width}>
                                {table_header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? 
                    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((skeleton)=>(
                        <TableRow key={skeleton}>
                            <CustomTableCell>
                                <Skeleton animation='wave' vairant='rectangle' height={90} width={50}/>
                            </CustomTableCell>
                            <CustomTableCell>
                                <Skeleton animation='wave' vairant='rectangle' height={90} width={220}/>
                            </CustomTableCell>
                            <CustomTableCell>
                                <Skeleton animation='wave' vairant='rectangle' height={90} width={200}/>
                            </CustomTableCell>
                            <CustomTableCell>
                                <Skeleton animation='wave' vairant='rectangle' height={90} width={200}/>
                            </CustomTableCell>
                            <CustomTableCell>
                                <Skeleton animation='wave' vairant='rectangle' height={90} width={50}/>
                            </CustomTableCell>
                            <CustomTableCell>
                                <Skeleton animation='wave' vairant='rectangle' height={90} width={100}/>
                            </CustomTableCell>
                        </TableRow>
                        
                    ))
                    :
                    (trackLists?.map((song,index)=>(
                        <CustomTableRow key={song?.track.id}
                        onClick={()=>playFavSongs(index)}>
                            <CustomTableCell align='center'>{index+1}</CustomTableCell>
                            <CustomTableCell className='favorite-track-info-container'>
                                <TableRow>
                                    <CustomTableCell>
                                        <img src={song?.track.album.images[0].url} width='50px' height='50px' style={{borderRadius:'1em'}}/>
                                    </CustomTableCell>
                                    <CustomTableCell>
                                        <div className='favorite-track-info'>
                                            <span>{song?.track.name}</span>
                                            <span>{getArtists(song)}</span>
                                        </div>
                                    </CustomTableCell>
                                </TableRow>
                            </CustomTableCell>
                            <CustomTableCell>
                                <span className='album-name'>{song?.track.album.name}</span>
                            </CustomTableCell>
                            <CustomTableCell align='center'>
                                {getDateAdded(song?.added_at)}
                            </CustomTableCell>
                            <CustomTableCell>
                                {isFavTracks[index] ? <Favorite sx={{color:'#D81146'}}/> : <FavoriteBorderIcon sx={{color:'#D81146'}}/> } 
                            </CustomTableCell>
                            <CustomTableCell align='center'>
                                {getMinutes(song)}
                            </CustomTableCell>
                        </CustomTableRow>
                    )))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}
