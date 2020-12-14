import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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

    const { name, weight, distance, timed } = this.state
    const { username } = this.props.user
    this.props.createExercise(name, username, weight, distance, timed)

    this.setState({
      name: '',
      weight: false,
      distance: false,
      timed: false
    })
  }

  render() {
    const { user, exerciseError, exerciseSuccess } = this.props
    const { name, weight, distance, timed } = this.state

    return (
      <div className='container'>
        {(exerciseError || exerciseSuccess) && <Message error={exerciseError} message={exerciseSuccess} />}
        <div className='exercise-form-header'>
          <Link className='linkbutton' to='/exercise'>Back to exercise list</Link>
          <div className='exercise-form-title'>
            {user && user.admin ? 'Add ' : 'Suggest '} a new exercise type
          </div>
        </div>
        <div className='exercise-form-container'>
          <form className='exercise-form'>
            <div className='input-container'>
              <input
                id='name'
                required
                value={name}
                placeholder='Name of the exercise'
                onChange={this.handleChange}
                className='text-input'>
              </input>
            </div>
            <div className='input-container'>
              <input
                id='weight'
                checked={weight}
                onChange={this.handleToggle}
                type='checkbox'
                className='checkbox-input'>
              </input>
              <label htmlFor='weight'>Weight exercise</label>
            </div>
            <div className='input-container'>
              <input
                id='distance'
                checked={distance}
                onChange={this.handleToggle}
                type='checkbox'
                className='checkbox-input'>
              </input>
              <label htmlFor='distance'>Distance exercise</label>
            </div>
            <div className='input-container'>
              <input
                id='timed'
                checked={timed}
                onChange={this.handleToggle}
                type='checkbox'
                className='checkbox-input'>
              </input>
              <label htmlFor='timed'>Timed exercise</label>
            </div>
            <button id='submitExercise' onClick={this.handleSubmit} className='submit-button'>
              {user && user.admin ? 'Add ' : 'Suggest '} exercise
            </button>
          </form>
        </div>
      </div >
    )
  }
}

ExerciseForm.propTypes = {
  user: PropTypes.object,
  fetchUser: PropTypes.func,
  createExercise: PropTypes.func,
  exerciseError: PropTypes.string,
  exerciseSuccess: PropTypes.string
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  exerciseError: state.errorReducer.errorMessage,
  exerciseSuccess: state.errorReducer.successMessage
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseForm)