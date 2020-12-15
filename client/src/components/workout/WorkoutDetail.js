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
        <div className='workout-exercise-date'>{format(new Date(workout.date), 'do MMMM yyyy')}</div>
        {visible &&
          <div className='workout-exercise-container'>
            {workout.exercises.map((exercise, indx) => {
              return (
                <div className='workout-list-entry-details' key={indx}>
                  <div className='workout-exercise-name'>{exercise.exercise.name}</div>
                  {exercise.exercise.weightExercise &&
                    <div className='workout-exercise-detail'>
                      Weight: {exercise.weight} kg
                    </div>}
                  {exercise.repetitions &&
                    <div className='workout-exercise-detail'>
                      Reps: {exercise.repetitions}
                    </div>}
                  {exercise.sets &&
                    <div className='workout-exercise-detail'>
                      Sets: {exercise.sets}
                    </div>}
                  {exercise.distance &&
                    <div className='workout-exercise-detail'>
                      Distance: {exercise.distance}m
                    </div>}
                  {exercise.time &&
                    <div className='workout-exercise-detail'>
                      Time: {exercise.time} mins
                    </div>}
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