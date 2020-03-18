import React, {Component} from 'react'
import {connect} from 'react-redux'

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
  }

  render() {
    const {user} = this.props

    return (
      <div className='container'>
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
                placeholder='Name of the exercise'
                onChange={this.handleChange}>
              </input>
            </div>
            <div>
              <input
                id='weight'
                onChange={this.handleToggle}
                type='checkbox'>
              </input>
              <label htmlFor='weight'>Weight exercise</label>
            </div>
            <div>
              <input
                id='distance'
                onChange={this.handleToggle}
                type='checkbox'>
              </input>
              <label htmlFor='distance'>Distance exercise</label>
            </div>
            <div>
              <input
                id='timed'
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
  user: state.loginReducer.loggedIn
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseForm)