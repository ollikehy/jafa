import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import * as actions from '../../redux/actions/actions'

import Exercise from './Exercise'
import Message from '../app/Message'

export class Exercises extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  componentDidMount = () => {
    this.props.fetchExercises()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const {exercises, errorMessage, successMessage, user} = this.props
    const {search} = this.state

    return (
      <div className='container'>
        <div className='exercise-header'>
          <Link className='linkbutton' to='/exercise/new'>Add a new exercise</Link>
          <input id='search'
            type='text'
            value={search}
            onChange={this.handleChange}
            placeholder='Search..' />
        </div>
        {(errorMessage || successMessage) && <Message error={errorMessage} message={successMessage} />}
        {exercises &&
          <div className='exercise-list'>
            <p className='exercise-list-title'>List of exercises</p>
            {exercises.map(exercise =>
              exercise.name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
              <Exercise key={exercise.id} user={user} exercise={exercise} />)}
          </div>}
      </div >
    )
  }
}

Exercises.propTypes = {
  fetchExercises: PropTypes.func,
  exercises: PropTypes.array,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.loginReducer.loggedIn,
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
)(Exercises)