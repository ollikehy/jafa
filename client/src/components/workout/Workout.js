import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actions'

import PropTypes from 'prop-types'
import WorkoutList from './WorkoutList'
import WorkoutForm from './WorkoutForm'

export class Workout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listView: true
    }
  }

  componentDidMount = () => {
    this.props.fetchWorkouts()
  }

  toggleChange = () => {
    this.setState({
      listView: !this.state.listView
    })
  }

  render() {
    const {workouts} = this.props
    const {listView} = this.state

    return (
      <div className='container' >
        <div className='workout-header'>
          <div className='linkbutton' onClick={this.toggleChange}>
            {listView ? 'Add a new workout' : 'View your workouts'}
          </div>
        </div>
        {listView ?
          <WorkoutList workouts={workouts} /> :
          <WorkoutForm />
        }
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