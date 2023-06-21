import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SideBar } from '../components/sidebar/sidebar'
import { Favorite } from './Favorite'
import { Feed } from './Feed'
import { Library } from './Library'
import { Player } from './Player'
import { Trending } from './Trending'
import { Login } from './auth/Login'
import apiClient, { setClientToken } from '../spotify api/spotify'
import { Category } from './Category'

export const Home = () => {

  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';
  
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setClientToken(_token);
    } else {
      setClientToken(token);
    }
  
    apiClient.get('me')
      .then(response => {
        console.log(response.data);
      })
      .catch((error) => 
            console.log(error))
  }, []);

  console.log(token);

  return (
    !token ? 
    (<Login/>)
    :
    (<Router>
        <div className='main-body'>
          <SideBar setToken={setToken}/>
            <Routes>
                <Route path='/' element={<Library/>}></Route>
                <Route path='/favorite' element={<Favorite/>}></Route>
                <Route path='/feed' element={<Feed/>}></Route>
                <Route path='/player' element={<Player/>}></Route>
                <Route path='/trending' element={<Trending/>}></Route>
                <Route path='/category' element={<Category/>}></Route>
            </Routes>
        </div>
    </Router>)
  )
}
