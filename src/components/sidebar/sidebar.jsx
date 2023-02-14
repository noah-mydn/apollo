import React from 'react'
import './sidebar.css'
import { SidebarBtn } from './sidebarBtn'
import { ViewTimeline,Whatshot,PlayArrow,Favorite,LibraryMusic,Logout } from '@mui/icons-material'
import apiClient from '../../spotify api/spotify'


export const SideBar = ({setToken}) => {

  const [image, setImage]= React.useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbDApfgo4kqEKzs6XDq93roV5urrCiEtWcvJdMEtWkzc7r4Kl77WQFKu6n1GavByKNrSw&usqp=CAU');

  React.useEffect(()=>{
    apiClient.get("me").then(response => setImage(response.data.images[0].url))
    
  },[])

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <div className='sidebar-container'>
      <img src={image}
      alt='profile image'
      className='profile-img'/>


      <div style={{display:'flex',flexDirection:'column'}}>
        <SidebarBtn title='Feed' to='/feed' icon={<ViewTimeline/>}/>
        <SidebarBtn title='Trending' to='/trending' icon={<Whatshot/>}/>
        <SidebarBtn title='Player' to='/player' icon={<PlayArrow/>}/>
        <SidebarBtn title='Favorites' to='/favorite' icon={<Favorite/>}/>
        <SidebarBtn title='Library' to='/' icon={<LibraryMusic/>}/>
      </div>
       <SidebarBtn title='Sign Out' icon={<Logout/>} logout={logout}/>
    </div>
  )
}
