import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MapScreen from './components/MapScreen'
import Options from './components/Options'
import NewSpotForm from './components/NewSpotForm'

function App() {
  const [newSpotPosition, setNewSpotPosition] = useState(null)

  return (
    <div id='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/mapScreen" element={
            <div className='dashboard'>
              <MapScreen 
                newSpotPosition={newSpotPosition} 
                setNewSpotPosition={setNewSpotPosition}
              />
              <Options />
            </div>} />
            <Route path='/newSpot' element={<NewSpotForm newSpotPosition={newSpotPosition} />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
