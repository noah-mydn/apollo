import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './sidebar.css'

export const SidebarBtn = (props) => {

  const location = useLocation(); 
  const isActive = location.pathname === props.to;
  const btnClass = isActive ? 'buttonWrapper active' : 'buttonWrapper';

  return (
        <Link to={props.to} className={btnClass} onClick={props.logout}>
           {props.icon} {props.title}
        </Link>

  )
}
