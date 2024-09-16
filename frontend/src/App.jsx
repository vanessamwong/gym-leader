import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import WorkoutPage from './WorkoutPage'
import CollectionPage from './CollectionPage'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to ="/">Home</Link></li>
            <li><Link to="/collection">Collection</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<WorkoutPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
