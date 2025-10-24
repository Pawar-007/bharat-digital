import { useState } from 'react'
import Dashboard from './pages/DashBoard.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DistrictDetails from './pages/DistrictDetails.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/state/:stateName/district/:districtName"
          element={<DistrictDetails />}
        />
      </Routes>
    </Router>
  )
}

export default App
