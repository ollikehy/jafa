import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Message from '../app/Message'

import * as actions from '../../redux/actions/actions'
import WorkoutFormContent from './WorkoutFormContent'

export class WorkoutForm extends Component {
  constructor(props) {
    super(props)

    const dateString = new Date().toISOString().substring(0, 10)

    this.state = {
      date: dateString,
      currentExercise: '',
      sets: '',
      reps: '',
      weight: '',
      time: '',
      distance: '',
      stateExercises: []
    }
  }

  componentDidMount = () => {
    this.props.fetchExercises()
  }

  handleDateChange = (e) => {
    e.preventDefault()
    this.setState({
      date: e.target.value
    })
  }

  handleExerciseChange = (event) => {
    event.preventDefault()
    const exercise = this.props.exercises.find(e => e.name === event.target.value)
    this.setState({
      currentExercise: exercise
    })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { stateExercises, date } = this.state
    e.preventDefault()
    this.props.createWorkout(stateExercises, date)
    this.setState({
      stateExercises: []
    })
  }

  addExerciseToState = (e) => {
    e.preventDefault()
    this.setState({
      stateExercises: [...this.state.stateExercises].concat(
        {
          name: this.state.currentExercise.name,
          exercise: this.state.currentExercise.id,
          sets: this.state.sets,
          repetitions: this.state.reps,
          weight: this.state.weight,
          distance: this.state.distance,
          time: this.state.time
        }
      ),
      currentExercise: 'Choose exercise',
      sets: '',
      reps: '',
      weight: '',
      distance: '',
      time: ''
    })
  }

  removeExercise = (exercise) => {
    this.setState({
      stateExercises: this.state.stateExercises.filter(exr => exr.name !== exercise.name)
    })
  }

  render() {
    const { exercises, errorMessage, successMessage } = this.props
    const { date, currentExercise, stateExercises } = this.state
    return (
      <div className='workout-form-container'>
        {(errorMessage || successMessage) && <Message error={errorMessage} message={successMessage} />}
        <form className='workout-form'>
          <p className='workout-form-title'>Add a new workout</p>
          <div className='workout-form-date'>
            <div className='workout-form-date-label'>Date</div>
            <input id='date' type='date' className='workout-form-date-selector' value={date} onChange={this.handleDateChange} />
          </div>
          <div className='workout-form-exercise-container'>
            <div className='workout-form-heading'>Exercises </div>
            <WorkoutFormContent
              currentExercise={currentExercise}
              exercises={exercises}
              state={this.state}
              handleChange={this.handleChange}
              handleExerciseChange={this.handleExerciseChange}
              addExerciseToState={this.addExerciseToState}
            />
          </div>
          <div className='workout-state'>
            {stateExercises.map((stateEx, index) => (
              <div className='workout-form-exercise' key={index}>
                <div>
                  {stateEx.name}
                </div>
                <button type='button' className='workout-state-button' onClick={() => this.removeExercise(stateEx)}>X</button>
              </div>
            ))}
          </div>
          <button id='submit-workout'
            type='submit'
            onClick={this.handleSubmit}
            className='submit-button'>
            Submit workout
          </button>
        </form>
      </div >
    )
  }
}

WorkoutForm.propTypes = {
  fetchExercises: PropTypes.func,
  exercises: PropTypes.array,
  createWorkout: PropTypes.func,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string
}

const mapStateToProps = (state) => ({
  exercises: state.exerciseReducer.exercises,
  errorMessage: state.errorReducer.errorMessage,
  successMessage: state.errorReducer.successMessage
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutForm)