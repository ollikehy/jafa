import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../redux/actions/actions'

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
    const {stateExercises, date} = this.state
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
          id: this.state.currentExercise.id,
          sets: this.state.sets,
          repetitions: this.state.reps,
          weight: this.state.weight,
          distance: this.state.distance,
          time: this.state.time
        }
      ),
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
    const {exercises} = this.props
    const {date, currentExercise, stateExercises, sets, reps, distance, time, weight} = this.state
    return (
      <div className='workout-form-container'>
        <form className='workout-form'>
          <p className='workout-form-title'>Add a new workout</p>
          <div className='workout-form-date'>
            <label htmlFor='date'>Date: </label>
            <input id='date' type='date' value={date} onChange={this.handleDateChange} />
          </div>
            {stateExercises.map((stateEx, index) => (
              <div className='workout-form-exercise' key={index}>
                <div>
                  {stateEx.name}
                </div>
                <button type='button' onClick={() => this.removeExercise(stateEx)}>-</button>
              </div>
            ))}
          <button type='submit' onClick={this.handleSubmit}>Submit workout</button>
          <div className='workout-form-exerciseform'>
            <p>Add more exercises to workout</p>
            <select defaultValue='Choose exercise' value={currentExercise.name} onChange={this.handleExerciseChange}>
              <option defaultValue disabled hidden>Choose exercise</option>
              {exercises && exercises.map((exercise, idx) => (
                <option key={idx}>{exercise.name}</option>
              ))}
            </select>
            {currentExercise.weightExercise &&
              <div className='workout-form-weightform'>
                <input id='sets' type='number' name='sets' onChange={this.handleChange} value={sets} placeholder='sets' />
                <input id='reps' type='number' name='reps' onChange={this.handleChange} value={reps} placeholder='reps' />
                <input id='weight' type='number' name='weight' onChange={this.handleChange} value={weight} placeholder='weight (kg)' />
              </div>}
            {currentExercise.timedExercise &&
              <div>
                <input id='time' type='number' name='time' onChange={this.handleChange} value={time} placeholder='time (min)' />
              </div>}
            {currentExercise.distanceExercise &&
              <div>
                <input id='distance' type='number' name='distance' onChange={this.handleChange} value={distance} placeholder='distance (m)' />
              </div>}
            <button onClick={this.addExerciseToState}>Add exercise</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  exercises: state.exerciseReducer.exercises
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutForm)