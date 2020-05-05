const parseDate = (date) => {
  return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
}

const calcWeightValue = (exercise) => {
  const value = ((1.5 * exercise.sets) + (0.7* exercise.repetitions) + (1.6 * exercise.weight))/10
  return value.toFixed(3)
}

module.exports = {parseDate, calcWeightValue}