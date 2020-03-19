import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from '../app/Message'
import * as actions from '../../redux/actions/actions'

export class ExerciseForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      weight: false,
      distance: false,
      timed: false
    }
  }

  componentDidMount = () => {
    if (!this.props.user) {
      this.props.fetchUser()
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleToggle = (e) => {
    this.setState({
      [e.target.id]: e.target.checked
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const {name, weight, distance, timed} = this.state
    const {username} = this.props.user
    this.props.createExercise(name, username, weight, distance, timed)

    this.setState({
      name: '',
      weight: false,
      distance: false,
      timed: false
    })
  }

  render() {
    const {user, exerciseError, exerciseSuccess} = this.props
    const {name, weight, distance, timed} = this.state

    return (
      <div className='container'>
        {(exerciseError || exerciseSuccess) && <Message error={exerciseError} success={exerciseSuccess} />}
        <p className='exercise-form-title'>
          {user && user.admin ? `Add ` : `Suggest `}
          a new exercise type
        </p>
        <div className='exercise-form'>
          <form>
            <div>
              <input
                id='name'
                required
                value={name}
                placeholder='Name of the exercise'
                onChange={this.handleChange}>
              </input>
            </div>
            <div>
              <input
                id='weight'
                checked={weight}
                onChange={this.handleToggle}
                type='checkbox'>
              </input>
              <label htmlFor='weight'>Weight exercise</label>
            </div>
            <div>
              <input
                id='distance'
                checked={distance}
                onChange={this.handleToggle}
                type='checkbox'>
              </input>
              <label htmlFor='distance'>Distance exercise</label>
            </div>
            <div>
              <input
                id='timed'
                checked={timed}
                onChange={this.handleToggle}
                type='checkbox'>
              </input>
              <label htmlFor='timed'>Timed exercise</label>
            </div>
            <button onClick={this.handleSubmit}>
              {user && user.admin ? `Add ` : `Suggest `} exercise
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  exerciseError: state.exerciseReducer.exerciseError,
  exerciseSuccess: state.exerciseReducer.exerciseSuccess
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseForm)