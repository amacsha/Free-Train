import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MapScreen from './components/MapScreen'
import Options from './components/Options'

function App() {

  return (
    <div id='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/mapScreen" element={<div><MapScreen /><Options /></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
