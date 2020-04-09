import React from 'react'

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

export default WorkoutList