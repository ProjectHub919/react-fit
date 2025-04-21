/*
Main application component that handles routing and layout structure.
Sets up the router with routes for homepage, exercise search, workout generator,
and handles 404 pages. All routes are wrapped in the Layout component for
consistent navigation and footer.
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExerciseSearch from './pages/ExerciseSearch'
import GeneratorPage from './pages/GeneratorPage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/exercises" element={<ExerciseSearch />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App