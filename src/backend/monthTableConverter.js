import { DateTime } from 'luxon'

const prepareDates = (days) => {
  const monthArr = []
  const _objectKeys = Object.keys(days)

  const monthlyHoursSum = {
    hours: null,
    minutes: null
  }

  for (let monthDay of _objectKeys) {
    const date = DateTime.fromISO(days[monthDay].data).toFormat('D')
    const startHour = DateTime.fromISO(days[monthDay].godzina_rozpoczęcia).toFormat('T')
    const endHour = DateTime.fromISO(days[monthDay].godzina_zakończenia).toFormat('T')
    const breakTime = days[monthDay].przerwa
    const workedHours = days[monthDay].suma

    const hourRegEx = new RegExp('^([0-1]?[0-9]|2[0-3]):', 'g')
    const minuteRegEx = new RegExp(':[0-5][0-9]', 'g')

    const hour = Number(workedHours.match(hourRegEx).shift().slice(0, -1))
    const minute = Number(workedHours.match(minuteRegEx).shift().slice(1))

    monthlyHoursSum.hours += hour
    monthlyHoursSum.minutes += minute

    monthArr.push({
      data: date,
      godzina_rozpoczęcia: startHour,
      godzina_zakończenia: endHour,
      przerwa: `${breakTime} min.`,
      suma: `${workedHours} godz.`,
      opis: days[monthDay].opis
    })

    if (monthlyHoursSum.minutes >= 60) {
      monthlyHoursSum.minutes -= 60
      monthlyHoursSum.hours += 1
    }
  }
  return {monthArr, monthlyHoursSum}
}

export {prepareDates}
