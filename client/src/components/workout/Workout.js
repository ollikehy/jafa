import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actions'

import PropTypes from 'prop-types'

export class Workout extends Component {

  componentDidMount = () => {
    this.props.fetchWorkouts()
  }

  render() {
    const {workouts} = this.props

    return (
      <div className='container' >
        <div className='workout-header'>
          <button className='workout-header-button'>Add a new workout</button>
        </div>
        <div className='workout-list'>
          <p className='workout-list-title'>Previous workouts</p>
          {workouts.map(workout =>
            <p key={workout.id}>Date: {workout.date}</p>
          )}
        </div>
      </div>
    )
  }
}

Workout.propTypes = {
  fetchWorkouts: PropTypes.func,
  workouts: PropTypes.array
}

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  workouts: state.workoutReducer.workouts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout)