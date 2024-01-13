import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MapScreen from './components/MapScreen'
import Options from './components/Options'
import NewSpotForm from './components/NewSpotForm'
import SpotExpanded from './components/spotExpanded'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import { setUser } from './slices/userSlice'

function App() {

  return (
    <div id='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/mapScreen" element={<div className='dashboard'> <MapScreen /> <Options/></div>} />
            <Route path='/newSpot' element={<NewSpotForm/>} />
            <Route path="/spotExpanded/:spotName" element={<SpotExpanded/>}/>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
