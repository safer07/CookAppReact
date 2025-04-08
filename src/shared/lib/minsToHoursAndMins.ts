const hourWords = ['час', 'часа', 'часов']
const minuteWords = ['минута', 'минуты', 'минут']

function numWord(n: number, words: string[]) {
  const m = Math.abs(n) % 100
  const n1 = m % 10
  if (m > 10 && m < 20) {
    return words[2]
  }
  if (n1 > 1 && n1 < 5) {
    return words[1]
  }
  if (n1 === 1) {
    return words[0]
  }
  return words[2]
}

export function minsToHoursAndMins(rawMins: number) {
  const hours = Math.floor(rawMins / 60)
  const minutes = rawMins % 60
  const hoursString = hours !== 0 ? `${hours} ${numWord(hours, hourWords)}` : ''
  const minutesString = minutes !== 0 ? `${minutes} ${numWord(minutes, minuteWords)}` : ''
  return `${hoursString} ${minutesString}`.trim()
}
