import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import UpArrow from '../../assets/images/up-arrow.png'

import * as actions from '../../redux/actions/actions'

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

  handleDelete = (id) => {
    this.props.deleteWorkout(id)
  }

  render() {
    const { workout } = this.props
    const { visible } = this.state

    return (
      <div className='workout-list workout-list-entry'>
        <div onClick={this.handleClick} className='workout-exercise-date'>
          {format(new Date(workout.date), 'do MMMM yyyy')}
        </div>
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
            <div className='workout-exercise-footer'>
              <div id={`delete-workout-${workout.id}`} onClick={() => this.handleDelete(workout.id)}>Delete workout</div>
              <img className='workout-uparrow' src={UpArrow} onClick={this.handleClick}></img>
            </div>
          </div>}
      </div>
    )
  }
}

WorkoutDetail.propTypes = {
  workout: PropTypes.object,
  deleteWorkout: PropTypes.func
}

const mapDispatchToProps = {
  ...actions
}

export default connect(
  null,
  mapDispatchToProps
)(WorkoutDetail)