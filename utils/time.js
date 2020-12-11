export function getElapsedTime({ date: since, lang = 'en' }) {
  let minutes = (new Date() - since) / 60000

  let units = {
    year: { en: 'year', fr: 'an' },
    day: { en: 'day', fr: 'jour' },
    hour: { en: 'hour', fr: 'heure' },
    minute: { en: 'minute', fr: 'minute' }
  }

  lang = !units.year[lang] ? 'en' : lang
  let [time, unit] = (minutes / 1440 > 365) ? [minutes / 525600 | 0, units.year[lang]]
    : (minutes >= 1440) ? [minutes / 1440 | 0, units.day[lang]]
    : (minutes >= 60) ? [minutes / 60 | 0, units.hour[lang]]
    : (minutes > 1) ? [minutes | 0, units.minute[lang]]
    : [1, units.minute[lang]]

  unit = (time > 1) ? `${unit}s`
    : unit

  return `${time} ${unit}`
}

export function getDateTime({ date: dt, template = '$d/$m/$y $h:$t', lang = 'en' }) {
  let months = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  }

  let d = { y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate() }
  let t = { h: dt.getHours(), m: dt.getMinutes() }
  let pf = (!~template.indexOf('$h')) ? ''
    : (t.h > 12) ? 'PM'
    : 'AM'

  return template.replace(/\$y/g, `${d.y}`.substring(2, 4))
    .replace(/\$Y/g, d.y)
    .replace(/\$mm/g, (d.m + 1 > 9) ? d.m + 1 : `0${d.m + 1}`)
    .replace(/\$m/g, d.m + 1)
    .replace(/\$M/g, months[lang][d.m])
    .replace(/(\$dd|\$DD)/g, (d.d > 9) ? d.d : `0${d.d}`)
    .replace(/(\$d|\$D)/g, d.d)
    .replace(/\$h/g, (t.h > 12) ? t.h - 12 : (!t.h) ? t.h + 12 : t.h)
    .replace(/\$H/g, t.h)
    .replace(/(\$t|\$T)/g, (t.m > 9) ? t.m : `0${t.m}`) + pf
}



// WEBPACK FOOTER //
// ./src/utils/time.js