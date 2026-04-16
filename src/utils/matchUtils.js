export const translateStatus = (status) => {
  const map = {
    SCHEDULED: 'Запланирован',
    LIVE: 'В прямом эфире',
    IN_PLAY: 'В игре',
    PAUSED: 'Пауза',
    FINISHED: 'Завершен',
    POSTPONED: 'Отложен',
    SUSPENDED: 'Приостановлен',
    CANCELED: 'Отменен',
  }
  return map[status] || status
}

export const formatScore = (score) => {
  if (!score) return '—'

  const parts = []
  const ft = score.fullTime || {}
  const et = score.extraTime || {}
  const pen = score.penalties || {}

  if (typeof ft.home === 'number' && typeof ft.away === 'number') {
    parts.push(`${ft.home}:${ft.away}`)
  }
  if (typeof et.home === 'number' && typeof et.away === 'number') {
    parts.push(`(${et.home}:${et.away})`)
  }
  if (typeof pen.home === 'number' && typeof pen.away === 'number') {
    parts.push(`(${pen.home}:${pen.away})`)
  }

  return parts.join(' ') || '—'
}

export const formatDate = (utcDate) => {
  const date = new Date(utcDate)
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export const formatTime = (utcDate) => {
  const date = new Date(utcDate)
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}