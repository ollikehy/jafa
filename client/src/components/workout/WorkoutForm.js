import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../redux/actions/actions'

export class WorkoutForm extends Component {
  constructor(props) {
    super(props)

    const dateString = new Date().toISOString().substring(0, 10)

    this.state = {
      date: dateString,
      currentExercise: 'Choose exercise',
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

  handleNameChange = (event) => {
    event.preventDefault()
    const exercise = this.props.exercises.find(e => e.name === event.target.value)
    this.setState({
      currentExercise: exercise
    })
  }

  addExerciseForm = (e) => {
    e.preventDefault()
    this.setState({
      stateExercises: [...this.state.stateExercises].concat({name: ''})
    })
  }

  removeExercise = (exercise) => {
    e.preventDefault()
    this.setState({
      stateExercises: this.state.stateExercises.filter((e) => e.name !== exercise.name)
    })
  }

  render() {
    const {exercises} = this.props
    const {date, currentExercise, stateExercises} = this.state
    return (
      <div className='workout-form-container'>
        <form>
          <p className='workout-form-title'>Add a new workout</p>
          <div className='workout-form-date'>
            <label htmlFor='date'>Date: </label>
            <input id='date' type='date' value={date} onChange={this.handleDateChange} />
          </div>
          <div>
            {stateExercises.map((stateEx, index) => (
              <div key={index}>
                <div className='workout-form-exercise'>
                  <div>
                    {stateEx.name}
                  </div>
                </div>
                <button onClick={() => this.removeExercise(stateEx)}>-</button>
              </div>
            ))}
            <select value={currentExercise.name} onChange={this.handleNameChange}>
              {exercises && exercises.map((exercise, idx) => (
                <option key={idx}>{exercise.name}</option>
              ))}
            </select>
            <button onClick={this.addExerciseForm}>Add an exercise to workout</button>
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