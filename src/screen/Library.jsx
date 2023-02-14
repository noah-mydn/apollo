import React from 'react'
import { Playlists } from '../components/playlists/playlist';
import apiClient from '../spotify api/spotify'


export const Library = () => {

  const [playlists, setPlaylists ] = React.useState([]);
  const [loading,setLoading]= React.useState(true);

  async function getPlaylists() {
      setLoading(true);
      apiClient.get("me/playlists")
      .then(response => setPlaylists(response.data.items));
      setLoading(false);
  }

  React.useEffect(()=> {
    getPlaylists();
    
  },[])

  //console.log(playlists);
  return (
    <div className='screen-container'>
        <h1 style={{
          color:'#fff',
          padding:'1em 0 0 3em',
        }}>Playlists</h1>
        <Playlists playlists={playlists}/>

    </div>
  )
}
