import React from 'react'
import PropTypes from 'prop-types'
import WorkoutDetail from './WorkoutDetail'
import Spinner from '../app/Spinner'

const WorkoutList = (props) => {
  const { workouts, isLoading } = props

  const sortedWorkouts = workouts.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })

  return (
    <div className='workout-list'>
      <div className='workout-list-title'>Workouts</div>
      {!isLoading ? sortedWorkouts.map(workout =>
        <WorkoutDetail key={workout.id} workout={workout} />
      ) : <Spinner />}
      {!isLoading && sortedWorkouts.length < 1 &&
        <div>You have no workouts</div>}
    </div >
  )
}

WorkoutList.propTypes = {
  workouts: PropTypes.array,
  isLoading: PropTypes.bool
}

export default WorkoutList