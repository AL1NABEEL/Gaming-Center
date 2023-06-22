import Sidebar from './component/Sidebar';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Discount from './pages/Discount'
import Reservations from './pages/Reservations'
import Tournaments from './pages/Tournaments'
import Notifications from './pages/Notifications'
import "./App.css"

function App() {
  return (
    <BrowserRouter>
    <Sidebar>
      <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/employees" element={<Employees/>} />
          <Route path="/discounts" element={<Discount/>} />
          <Route path="/tournaments" element={<Tournaments/>} />
          <Route path="/reservations" element={<Reservations/>} />
          <Route path="/notifications" element={<Notifications/>} />
      </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;