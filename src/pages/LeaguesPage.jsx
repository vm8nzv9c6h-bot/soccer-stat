import { useState, useEffect } from 'react';
import { getCompetitions } from '../api/footballApi';
import { useNavigate } from 'react-router-dom';

export default function LeaguesPage() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getCompetitions();
        setCompetitions(data.competitions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredCompetitions = competitions.filter(comp =>
    comp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.area?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/leagues/${id}`);
  };

  if (loading) return <div className="text-center py-20 text-3xl">⏳ Загрузка лиг...</div>;
  if (error) return <div className="text-center py-20 text-red-600 text-2xl">❌ {error}</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Лиги и соревнования</h1>
        <p className="text-gray-600 mt-2">Выберите лигу, чтобы посмотреть календарь матчей</p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Поиск по названию лиги или стране..."
          className="w-full max-w-lg px-6 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-emerald-500 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCompetitions.map((comp) => (
          <div
            key={comp.id}
            className="bg-white rounded-3xl shadow hover:shadow-2xl transition-all p-6 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1"
            onClick={() => handleCardClick(comp.id)}
          >
            <div className="w-28 h-28 mb-6 flex items-center justify-center">
              {comp.emblemUrl || comp.emblem ? (
                <img 
                    src={comp.emblemUrl || comp.emblem}
                    alt={comp.name}
                    className="max-h-28 object-contain"
                />
              ) : (
                <div className="text-7xl">⚽</div>
              )}
            </div>
            <h3 className="font-bold text-xl leading-tight mb-2">{comp.name}</h3>
            <p className="text-gray-500 text-sm">{comp.area?.name || 'Международная'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}