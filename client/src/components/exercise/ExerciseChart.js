import React from 'react'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const ExerciseChart = ({ exercise, exerciseHistory }) => {

  let type

  if (exercise.distanceExercise) {
    type = 'distance'
  } else if (exercise.timedExercise) {
    type = 'time'
  } else {
    type = 'weightValue'
  }

  const sortedHistory = exerciseHistory.sort((a, b) => {
    return new Date(a.date.split('.').reverse().join('.')) - new Date(b.date.split('.').reverse().join('.'))
  })

  return (
    <div className='exercise-chart'>
      <LineChart width={600} height={400} data={sortedHistory}>
        <Line type='monotone' dataKey={type} stroke='#694933' />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
      </LineChart>
      {exercise.weightExercise &&
        <div className='exercise-chart-tooltip'>About weightValue
          <span className='exercise-chart-tooltip-text'>WeightValue is used to chart weight exercises.
          VW = (1.5 x sets + 0.7 x repetitions + 1.6 x weight)/10 </span>
        </div>}
    </div>
  )
}

ExerciseChart.propTypes = {
  exercise: PropTypes.object,
  exerciseHistory: PropTypes.array
}

export default ExerciseChart