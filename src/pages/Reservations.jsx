import {React, useState} from 'react'
import ps5 from "../Makers project/logo and icons/ps5.png";
import CountTime from '../component/CountTime'
import {CountTimeData} from '../component/CountTimeData'
import computer from "../Makers project/logo and icons/computer.png";
import { PcVipData } from '../component/PcVipData';
function Reservations() {
const [arrIndex, setarrIndex] = useState(0)

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



{/* Here is pc seat reservation section */}

         <div className='Main-Container' id='pc'>
         <div className="LOGO">
            <img src={computer} alt="computer" height={40} width={40}/>
            <p>PC Seats Reservations</p>
          </div>
          <div className="pc-section">

          <div className='PcVipChairs'>
          {PcVipData.map((item,index)=>{
            return(
        
              <button onClick={(e)=>{setarrIndex(arrIndex=>index)}} value={index} key={index}>
              <div>{item.icon}</div>
              <p >{item.Name}</p>
            </button>
            
            )
          })}
          </div>

          <div className="pc-card">
          {PcVipData.map((item,index)=>{
            
            return(
            <div key={index}>
              <div >{item.icon}</div>
              <p >{item.Name}</p>
            </div>)
          })[arrIndex]}
          </div>


          </div>
         </div>

    </div>
  )
}

export default Reservations

