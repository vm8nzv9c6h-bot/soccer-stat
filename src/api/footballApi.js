import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-Auth-Token': import.meta.env.VITE_API_TOKEN,
  },
  timeout: 15000,
})

// ЛИГИ
export const getCompetitions = async () => {
  const response = await api.get('/competitions', { params: { plan: 'TIER_ONE' } })
  return response.data
}

// МАТЧИ ЛИГИ
export const getCompetitionMatches = async (competitionId, dateFrom = null, dateTo = null) => {
  const cacheKey = `matches_${competitionId}_${dateFrom || ''}_${dateTo || ''}`
  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < 120000) return data
  }

  const params = {}
  if (!dateFrom || !dateTo) {
    const today = new Date()
    const from = new Date(today); from.setDate(today.getDate() - 15)
    const to = new Date(today); to.setDate(today.getDate() + 45)
    params.dateFrom = from.toISOString().split('T')[0]
    params.dateTo = to.toISOString().split('T')[0]
  } else {
    params.dateFrom = dateFrom
    params.dateTo = dateTo
  }

  const response = await api.get(`/competitions/${competitionId}/matches`, { params })
  localStorage.setItem(cacheKey, JSON.stringify({ data: response.data, timestamp: Date.now() }))
  return response.data
}

// КОМАНДЫ
export const getTeams = async () => {
  const response = await api.get('/teams')
  return response.data
}

export const getTeamMatches = async (teamId, dateFrom = null, dateTo = null) => {
  const cacheKey = `team_matches_${teamId}_${dateFrom || ''}_${dateTo || ''}`
  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < 120000) return data
  }

  const params = {}
  if (!dateFrom || !dateTo) {
    const today = new Date()
    const from = new Date(today); from.setDate(today.getDate() - 15)
    const to = new Date(today); to.setDate(today.getDate() + 45)
    params.dateFrom = from.toISOString().split('T')[0]
    params.dateTo = to.toISOString().split('T')[0]
  } else {
    params.dateFrom = dateFrom
    params.dateTo = dateTo
  }

  const response = await api.get(`/teams/${teamId}/matches`, { params })
  localStorage.setItem(cacheKey, JSON.stringify({ data: response.data, timestamp: Date.now() }))
  return response.data
}