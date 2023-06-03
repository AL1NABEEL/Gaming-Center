import {React,useRef,useEffect,useState} from 'react'
import clock from '../Makers project/logo and icons/clock.png'
import calculator from '../Makers project/logo and icons/calculator.png'
const formatTime = (time) => {
let hours = Math.floor(time / 3600)
let minutes = Math.floor(time % 3600 / 60)
let seconds = Math.floor(time % 3600 % 60)
if ( hours <=10) hours = '0'+hours
if ( minutes <=10) minutes = '0'+minutes
if ( seconds <10) seconds = '0'+seconds
return hours + ':' + minutes + ':' + seconds
}

function CountTime(Name) {
    const [count, setCount] = useState(0)
    const [active, setActive] = useState(false);
    const [ButtonText, setButtonText] = useState('START')
    const [secondButtonText, setsecondButtonText] = useState('PAUSE')
    let timer = useRef();
    useEffect(() => {
        if (active === true){ 
        setButtonText('RESTART')
        timer.current = setInterval(()=> {
          setCount((count) => count + 1);
        }, 1000);}
        return ()=> clearInterval(timer.current) 
      });


const Start = () => {
    if(ButtonText === 'START'){
        setActive(true) }
        else {
            setCount(0)
            setActive(false)
            setButtonText ('START')
        }
    
}
const Pause = () => {
    if(secondButtonText === 'PAUSE'){
    clearInterval(timer.current)
    setActive(false);
    setsecondButtonText('RESUME')
    }
    else {
        setActive(true) 
        setsecondButtonText('PAUSE')
    }
    
}

  return (
    <div className='TimeSystem'>
        <div className='CardContent'>

        <div className="Timer" id='timer'>
           <div className='TimerImg' id='timerImg'> <img src={clock} width={9} height={9} alt="clock" /></div>
            <div className='TimerContent' id='timerContent'>
            <p>Time Exploited</p>
           <h2>{formatTime(count)}</h2>
            </div>
            </div>

            <button  onClick={Start}><h3>{ButtonText}</h3></button>
            <button  onClick={Pause} id='StopButton'><h3>{secondButtonText}</h3></button>
            <div className="Timer" id='timer'>
           <div className='TimerImg'> <img src={calculator} width={9} height={9} alt="clock" /></div>
            <div className='TimerContent'>
            <p>Total Cost</p>
           <h2>{count} IQD</h2>
            </div>

            </div>
        </div>
            
    </div>
  )
}

export default CountTime