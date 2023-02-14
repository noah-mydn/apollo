import React from 'react'
import { loginEndpoint } from '../../spotify api/spotify'

export const Login = () => {
  return (
    <div className='login-component'>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png'
        alt='spotify icon'
        className='login-img'/>

        <a href={loginEndpoint}>
            <button className='login-btn'>Log in</button>
        </a>
    </div>
  )
}
