import React from 'react'
import { SidebarData } from './SidebarData'
import { NavLink } from 'react-router-dom'
function Sidebar({children}) {
  return (
    <div className='Container'>
    <div className='Sidebar'>
        
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