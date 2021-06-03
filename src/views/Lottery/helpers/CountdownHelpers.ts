import getTimePeriods from 'utils/getTimePeriods'

// @ts-ignore
const getNextTicketSaleTime = (currentMillis) => (parseInt(currentMillis / 3600000) + 1) * 3600000
const hoursAndMinutesString = (hours, minutes) => `${parseInt(hours)}h, ${parseInt(minutes)}m`
const daysAndHoursAndMinutesString = (day, hours, minutes) =>
  `${parseInt(day)}day, ${parseInt(hours)}h, ${parseInt(minutes)}m`

const convertMsToHumanDate = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const day = Math.floor(hours / 24)

  return {
    day,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  }
}

export const getTicketSaleTime = (currentMillis): string => {
  const nextTicketSaleTime = getNextTicketSaleTime(currentMillis)
  const msUntilNextTicketSale = nextTicketSaleTime - currentMillis
  const { minutes } = getTimePeriods(msUntilNextTicketSale / 1000)
  const { hours } = getTimePeriods(msUntilNextTicketSale / 1000)
  return hoursAndMinutesString(hours, minutes)
}

export const getLotteryDrawTime = (currentMillis, untilMs): string => {
  const nextLotteryDrawTime = untilMs
  const msUntilLotteryDraw = nextLotteryDrawTime - currentMillis
  const { day, hours, minutes } = convertMsToHumanDate(msUntilLotteryDraw)

  return day > 0 ? daysAndHoursAndMinutesString(day, hours, minutes) : hoursAndMinutesString(hours, minutes)
}

export const getTicketSaleStep = () => (1 / 12) * 100

export const getLotteryDrawStep = (currentMillis, untilMs, status) => {
  const msBetweenLotteries = 86400000 * 2
  const isWaitTime = status === 'wait'

  if (isWaitTime) {
    return 0
  }

  const msUntilLotteryDraw = untilMs - currentMillis
  const percentageRemaining = (msUntilLotteryDraw / msBetweenLotteries) * 100
  return 100 - percentageRemaining
}
