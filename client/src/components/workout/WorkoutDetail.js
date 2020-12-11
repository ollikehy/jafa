import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

export class WorkoutDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  handleClick = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    const { workout } = this.props
    const { visible } = this.state

    return (
      <div onClick={this.handleClick} className='workout-list workout-list-entry'>
        <p>{format(new Date(workout.date), 'do MMMM yyyy')}</p>
        {visible &&
          <div>
            {workout.exercises.map((exercise, indx) => {
              return (
                <div className='workout-list-entry-details' key={indx}>
                  <p className='workout-exercise-name'>{exercise.exercise.name}</p>
                  {exercise.exercise.weightExercise && <p className='workout-exercise-detail'>
                    Weight: {exercise.weight} kg</p>}
                  {exercise.repetitions && <p className='workout-exercise-detail'>
                    Reps: {exercise.repetitions}</p>}
                  {exercise.sets && <p className='workout-exercise-detail'>
                    Sets: {exercise.sets}</p>}
                  {exercise.distance && <p className='workout-exercise-detail'>
                    Distance: {exercise.distance}m</p>}
                  {exercise.time && <p className='workout-exercise-detail'>
                    Time: {exercise.time} mins</p>}
                </div>
              )
            })}
          </div>}
      </div>
    )
  }
}

WorkoutDetail.propTypes = {
  workout: PropTypes.object,
}

export default WorkoutDetail