import React from 'react'
import PropTypes from 'prop-types'
import WorkoutDetail from './WorkoutDetail'

const WorkoutList = (props) => {
  const {workouts} = props
  const sortedWorkouts = workouts.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })
  return (
    <div className='workout-list'>
      <p className='workout-list-title'>Previous workouts</p>
      {sortedWorkouts.map(workout =>
        <WorkoutDetail key={workout.id} workout={workout} />
      )}
    </div >
  )
}

WorkoutList.propTypes = {
  workouts: PropTypes.array
}

export default WorkoutList