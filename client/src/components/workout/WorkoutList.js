import React from 'react'
import PropTypes from 'prop-types'

const WorkoutList = (props) => {
  const {workouts} = props
  return (
    <div className='workout-list'>
      <p className='workout-list-title'>Previous workouts</p>
      {workouts.map(workout =>
        <p key={workout.id}>Date: {workout.date}</p>
      )}
    </div>
  )
}

WorkoutList.propTypes = {
  workouts: PropTypes.array
}

export default WorkoutList