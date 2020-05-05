import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import Message from '../app/Message'
import ExerciseChart from './ExerciseChart'

import * as actions from '../../redux/actions/actions'

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
    const {exercise, exerciseHistory, error} = this.props
    return (
      <div className='container'>
        {error && <Message error={error} />}
        {exercise ?
          <div>
            {exerciseHistory &&
              <ExerciseChart exercise={exercise} exerciseHistory={exerciseHistory} />}
            <p>{exercise.name}</p>
          </div>
          :
          <div className='loading'>
            <Link className='backbutton linkbutton' to='/exercise'> Back to exercises</Link>
          </div>}
      </div>
    )
  }
}

ExercisePage.propTypes = {
  exercise: PropTypes.object,
  exerciseHistory: PropTypes.array,
  fetchExercise: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => ({
  exercise: state.exerciseReducer.exercise,
  exerciseHistory: state.exerciseReducer.exerciseHistory,
  error: state.errorReducer.errorMessage
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisePage)