import {React, useState} from 'react'
import ps5 from "../Makers project/logo and icons/ps5.png";
import CountTime from '../component/CountTime'
import {CountTimeData} from '../component/CountTimeData'
import computer from "../Makers project/logo and icons/computer.png";
import { PcVipData } from '../component/PcVipData';
import calculator from '../Makers project/logo and icons/calculator.png'
import PS5TV from '../Makers project/logo and icons/PS5TV.png'
import '../pages/Reservations.css';
function Reservations(e) {
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
            return(<div className="ps5-card" key={index} >
            <div className='CardPS5IMG'><img src={PS5TV} width={100} height={100} alt="ps5 tv"/>
            <div className="Timer" id='ImgTime'>
            <div className='TimerImg'> <img src={calculator} width={9} height={9} alt="clock" /></div>
            <div className='PS5Name'>
            <h2>{item.Name}</h2>
            </div>
            </div>
            </div>
            <CountTime Name={item.Name}/>
            </div>)
          })}
          
         </div>



{/* Here is pc seat reservation section */}

         <div className='Main-Container' id='pc'>
         <div className="LOGO">
            <img src={computer} alt="computer" height={40} width={40}/>
            <p>PC Seats Reservations</p>
          </div>
          <div className="pc-section">

          <div className="pc-card">
          {PcVipData.map((item,index)=>{
            
            return(
            <div key={index}>
              <div className='PcRep'>
              <div>{item.icon}</div>
              <h2 >{item.Name}</h2>
              </div>
              <div className="pcButtonsStyle"><CountTime/></div>
            </div>)
          })[arrIndex]}
          </div>

          <div className='PcVipChairs'>
          {PcVipData.map((item,index)=>{
            return(
            <button id='singleChair' onClick={(e)=>{setarrIndex(arrIndex=>index)}} value={index} key={index} >
              <div>{item.icon}</div>
              <p>{item.Name}</p>
            </button>    
            )
          })}
          </div>


          </div>
         </div>
    </div>
    
  )
  
}

export default Reservations

