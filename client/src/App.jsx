import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { setSpotListR } from './slices/spotList'
import MapScreen from './components/MapScreen'
import Options from './components/Options'
import NewSpotForm from './components/NewSpotForm'
import axios from 'axios'
import SpotExpanded from './components/spotExpanded'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import NotFound from './components/NotFound'

function App() {
  const [user, setUser] = useState("")
  const [search, setSearch] = useState(false)
  const dispatch = useDispatch()
  const spotListR = useSelector(state => state.spotListR)

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
