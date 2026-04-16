import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LeaguesPage from './pages/LeaguesPage'
import TeamsPage from './pages/TeamsPage'
import LeagueCalendarPage from './pages/LeagueCalendarPage'
import TeamCalendarPage from './pages/TeamCalendarPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LeaguesPage />} />
            <Route path="/leagues" element={<LeaguesPage />} />
            <Route path="/leagues/:id" element={<LeagueCalendarPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamCalendarPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App