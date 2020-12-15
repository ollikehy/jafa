import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as actions from '../../redux/actions/actions'

import Exercise from './Exercise'
import Spinner from '../app/Spinner'

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
    const { exercises, user } = this.props
    const { search } = this.state

    return (
      <div className='container'>
        <div className='exercise-header'>
          <Link className='linkbutton' to='/exercise/new'>Add a new exercise</Link>
          <input id='search'
            type='text'
            value={search}
            onChange={this.handleChange}
            placeholder='Search..'
            className='search-bar'
          />
        </div>
        {exercises.length > 0 ?
          <div className='exercise-list'>
            <div className='exercise-list-title'>Exercises</div>
            {exercises.map(exercise =>
              exercise.name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
              <Exercise key={exercise.id} user={user} exercise={exercise} />)}
          </div> :
          <Spinner />
        }
      </div >
    )
  }
}

Exercises.propTypes = {
  fetchExercises: PropTypes.func,
  exercises: PropTypes.array,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.loginReducer.loggedIn,
  exercises: state.exerciseReducer.exercises,
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercises)