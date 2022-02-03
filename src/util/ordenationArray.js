import diaSemana from './diaSemana'

const orderByAsc = (a, b, by) => {
  if (by === 'date') {
    return new Date(a.date) - new Date(b.date)
  }

  if (by === 'week-day') {
    return diaSemana[a.week_day] - diaSemana[b.week_day]
  }

  if (by === 'value') {
    return a.value - b.value
  }
}

const orderByDesc = (a, b, by) => {
  if (by === 'date') {
    return new Date(b.date) - new Date(a.date)
  }

  if (by === 'week-day') {
    return diaSemana[b.week_day] - diaSemana[a.week_day]
  }

  if (by === 'value') {
    return b.value - a.value
  }
}

export { orderByDesc, orderByAsc }
