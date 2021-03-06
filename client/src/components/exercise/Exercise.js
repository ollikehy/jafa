import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Approval from '../../assets/images/approval-25.png'
import Cancel from '../../assets/images/cancel-25.png'

import * as actions from '../../redux/actions/actions'

class Exercise extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hidden: false
    }
  }

  handleAccept = (accepted, name) => {
    if (!accepted) {
      this.setState({
        hidden: true
      })
    }
    this.props.updateSuggestedExercise(name, accepted)
  }

  setExercise = () => {
    this.props.fetchExercise(this.props.exercise.name)
  }

  render() {
    const { user, exercise } = this.props
    const { hidden } = this.state

    if (user && user.admin && !exercise.accepted && !hidden) {
      return (
        <div className='exercise-suggestion'>
          <div className='exercise-name'>{exercise.name}</div>
          <div className='exercise-suggestion-toggle'>
            <img id={`accept-${exercise.name.replace(/ /g, '')}`} className='exercise-suggestion-toggle-button' src={Approval} onClick={() => this.handleAccept(true, exercise.name)} />
            <img id={`reject-${exercise.name.replace(/ /g, '')}`} className='exercise-suggestion-toggle-button' src={Cancel} onClick={() => this.handleAccept(false, exercise.name)} />
          </div>
        </div>
      )
    } else if (exercise.accepted && !hidden) {
      return (
        <Link
          onClick={this.setExercise}
          className='exercise-accepted exercise-page-link'
          to={`/exercise/${exercise.name}`}>
          {exercise.name}
        </Link>
      )
    } else {
      return (null)
    }
  }
}

Exercise.propTypes = {
  exercise: PropTypes.object,
  fetchExercise: PropTypes.func,
  user: PropTypes.object,
  updateSuggestedExercise: PropTypes.func
}

const mapDispatchToProps = {
  ...actions
}

export default connect(
  null,
  mapDispatchToProps
)(Exercise)