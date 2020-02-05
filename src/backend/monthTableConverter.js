import { DateTime } from 'luxon'

const prepareDates = (days) => {
  const _arr = []
  const _objectKeys = Object.keys(days)

  for (let monthDay of _objectKeys) {
    const date = DateTime.fromISO(days[monthDay].data).toFormat('D')
    const startHour = DateTime.fromISO(days[monthDay].godzina_rozpoczęcia).toFormat('T')
    const endHour = DateTime.fromISO(days[monthDay].godzina_zakończenia).toFormat('T')
    const breakTime = days[monthDay].przerwa
    const workedHours = days[monthDay].suma

    _arr.push({
      data: date,
      godzina_rozpoczęcia: startHour,
      godzina_zakończenia: endHour,
      przerwa: `${breakTime} min.`,
      suma: `${workedHours} godz.`
    })
  }
  return _arr
}

export {prepareDates}
