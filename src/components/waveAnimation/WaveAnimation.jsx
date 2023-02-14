import React from 'react'
import './waveAnimation.css'

export const WaveAnimation = ({isPlaying}) => {

    const waveClass = isPlaying ? 'wave active' : 'wave';

    //console.log(isPlaying)

  return (
    <div className='wave-container'>
        <div className={`${waveClass} wave1`}></div>
        <div className={`${waveClass} wave2`}></div>
        <div className={`${waveClass} wave3`}></div>
        <div className={`${waveClass} wave4`}></div>
        <div className={`${waveClass} wave5`}></div>
        <div className={`${waveClass} wave6`}></div>
        <div className={`${waveClass} wave7`}></div>
        <div className={`${waveClass} wave3`}></div>
        <div className={`${waveClass} wave2`}></div>
        <div className={`${waveClass} wave3`}></div>
        <div className={`${waveClass} wave4`}></div>
        <div className={`${waveClass} wave5`}></div>
        <div className={`${waveClass} wave6`}></div>
        <div className={`${waveClass} wave7`}></div>
        <div className={`${waveClass} wave2`}></div>
        <div className={`${waveClass} wave3`}></div>
    </div>
  )
}
