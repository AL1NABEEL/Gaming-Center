import React from 'react'
import { SidebarData } from './SidebarData'
import { NavLink } from 'react-router-dom'
import logo from "../Makers project/logo and icons/logo.png"
function Sidebar({children}) {
  return (
    <div className='Container'>
      
    <div className='Sidebar'>
    <div className='Logo'>
        <img src={logo} alt="Logo" height={50} width={50}/>
        <p>Game center</p>
      </div>
        {SidebarData.map((item,index)=>(
            <NavLink to={item.path} key={index} className={"link"}>
                <div className='icon'>{item.icon}</div>
                <div className='title'>{item.title}</div>
            </NavLink>
        )
        
    )} 

    </div>
    <main>{children}</main>
    </div>
  )
}

export default Sidebar