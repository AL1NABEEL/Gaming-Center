import React from 'react'
import ps5 from "../Makers project/logo and icons/ps5.png";
import CountTime from '../component/CountTime'
import {CountTimeData} from '../component/CountTimeData'
import computer from "../Makers project/logo and icons/computer.png";
import { PcVipData } from '../component/PcVipData';
function Reservations() {
  return (
    <div className="Reservation-Container">
      
         <div className="top-section">
            <h1>Seat Reservations</h1>
            <p>PS5 , PC Desktop , other</p>
         </div>

         <div className="Main-Container" id='ps5'>
          <div className="LOGO">
            <img src={ps5} alt="ps5-logo" height={40} width={40}/>
            <p>Playstation Seats Reservations</p>
          </div>
          {CountTimeData.map((item,index)=>{
            return(<div className="ps5-card" key={index} ><CountTime Name={item.Name}/></div>)
          })}
          
         </div>

         <div className='Main-Container' id='pc'>
         <div className="LOGO">
            <img src={computer} alt="computer" height={40} width={40}/>
            <p>PC Seats Reservations</p>
          </div>
          {PcVipData.map((item,index)=>{
            return(
            <div key={index}>
              <div className='PcVipChairs'>{item.icon}</div>
            </div>)
          })}
         </div>

    </div>
  )
}

export default Reservations

