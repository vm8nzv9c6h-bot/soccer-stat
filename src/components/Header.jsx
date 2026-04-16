import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl">⚽</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SoccerStat</h1>
              <p className="text-sm text-gray-500 -mt-1">Футбольная статистика</p>
            </div>
          </div>

          <nav className="flex gap-12 text-lg font-medium">
            <NavLink to="/leagues" className={({ isActive }) => isActive ? "text-emerald-600 border-b-2 border-emerald-600 pb-1" : "text-gray-600 hover:text-emerald-600 transition-colors"}>
              Лиги
            </NavLink>
            <NavLink to="/teams" className={({ isActive }) => isActive ? "text-emerald-600 border-b-2 border-emerald-600 pb-1" : "text-gray-600 hover:text-emerald-600 transition-colors"}>
              Команды
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}