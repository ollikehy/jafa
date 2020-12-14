import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Message from '../app/Message'
import ExerciseChart from './ExerciseChart'

import * as actions from '../../redux/actions/actions'
import Spinner from '../app/Spinner'

class ExercisePage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.exercise) {
      const loc = location.href.split('/')
      this.props.fetchExercise(loc[loc.length - 1].replace('%20', ' '))
    }
  }

  render() {
    const { exercise, exerciseHistory, error, isLoading } = this.props

    return (
      <div className='container'>
        {error && <Message error={error} />}
        {exercise ?
          <div>
            <div className='exercise-page-header'>
              <Link className='linkbutton' to='/exercise'> Back to exercises</Link>
              <div className='exercise-page-name'>{exercise.name}</div>
            </div>
            {exerciseHistory &&
              <ExerciseChart exercise={exercise} exerciseHistory={exerciseHistory} />}
          </div>
          :
          <div className='loading'>
            <Link className='backbutton linkbutton' to='/exercise'> Back to exercises</Link>
            {isLoading ? <Spinner /> : <div>No history with this exercise yet</div>}
          </div>}
      </div>
    )
  }
}

ExercisePage.propTypes = {
  exercise: PropTypes.object,
  exerciseHistory: PropTypes.array,
  fetchExercise: PropTypes.func,
  error: PropTypes.string,
  isLoading: PropTypes.bool
}

const mapStateToProps = (state) => ({
  exercise: state.exerciseReducer.exercise,
  exerciseHistory: state.exerciseReducer.exerciseHistory,
  error: state.errorReducer.errorMessage,
  isLoading: state.exerciseReducer.isLoading
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisePage)