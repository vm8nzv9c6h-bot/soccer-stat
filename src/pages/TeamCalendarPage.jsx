import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeamMatches } from '../api/footballApi';
import { translateStatus, formatScore, formatDate, formatTime } from '../utils/matchUtils';

export default function TeamCalendarPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    loadMatches();
  }, [id, dateFrom, dateTo]);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await getTeamMatches(id, dateFrom || null, dateTo || null);
      setMatches(data.matches || []);
      setTeamName(data.matches?.[0]?.homeTeam?.name || data.matches?.[0]?.awayTeam?.name || `Команда ${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-3xl">⏳ Загрузка матчей команды...</div>;
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-amber-600 text-2xl mb-4">⏳ {error}</div>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-emerald-600 text-white rounded-2xl">Обновить</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span onClick={() => navigate('/teams')} className="cursor-pointer hover:text-emerald-600">Команды</span>
        <span>›</span>
        <span className="font-medium text-gray-900">{teamName}</span>
      </div>

      <h1 className="text-4xl font-bold mb-8">{teamName}</h1>

      {/* Фильтры дат */}
      <div className="bg-white p-6 rounded-3xl shadow mb-8 flex gap-6 items-end">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Матчи с</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border border-gray-300 rounded-xl px-4 py-3" />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">по</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border border-gray-300 rounded-xl px-4 py-3" />
        </div>
        <button onClick={() => { setDateFrom(''); setDateTo(''); }} className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-2xl">Сбросить</button>
      </div>

      {/* Таблица */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Дата</th>
              <th className="px-6 py-4 text-left">Время</th>
              <th className="px-6 py-4 text-left">Статус</th>
              <th className="px-6 py-4 text-left">Матч</th>
              <th className="px-6 py-4 text-right">Счёт</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-5 font-medium">{formatDate(match.utcDate)}</td>
                <td className="px-6 py-5">{formatTime(match.utcDate)}</td>
                <td className="px-6 py-5">
                  <span className="inline-block px-4 py-1 text-xs font-medium rounded-2xl bg-emerald-100 text-emerald-700">
                    {translateStatus(match.status)}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span>{match.homeTeam.name}</span>
                    <span className="text-gray-400">—</span>
                    <span>{match.awayTeam.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right font-bold">
                  {formatScore(match.score) || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}