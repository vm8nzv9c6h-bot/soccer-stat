import { useState, useEffect } from 'react';
import { getTeams } from '../api/footballApi';
import { useNavigate } from 'react-router-dom';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await getTeams();
        setTeams(data.teams || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTeams();
  }, []);

  const filteredTeams = teams.filter(team =>
    team.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (id) => {
    navigate(`/teams/${id}`);
  };

  if (loading) return <div className="text-center py-20 text-3xl">⏳ Загрузка команд...</div>;
  if (error) return <div className="text-center py-20 text-red-600">❌ {error}</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Команды</h1>
        <p className="text-gray-600 mt-2">Выберите команду, чтобы посмотреть её календарь</p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Поиск команды..."
          className="w-full max-w-lg px-6 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-emerald-500 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id}
            className="bg-white rounded-3xl shadow hover:shadow-2xl transition-all p-6 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1"
            onClick={() => handleClick(team.id)}
          >
            <div className="w-28 h-28 mb-6 flex items-center justify-center">
              {team.crest ? (
                <img src={team.crest} alt={team.name} className="max-h-28 object-contain" />
              ) : (
                <div className="text-7xl">👕</div>
              )}
            </div>
            <h3 className="font-bold text-xl">{team.name}</h3>
          </div>
        ))}
      </div>
      {filteredTeams.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          Команды не найдены
        </div>
      )}
    </div>
  );
}