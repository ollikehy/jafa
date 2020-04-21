import React, {Component} from 'react'
import {connect} from 'react-redux'
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

  render() {
    const {user, exercise} = this.props
    const {hidden} = this.state
    const className = exercise.accepted ? 'exercise-accepted' : 'exercise-suggestion'

    if (user && user.admin && !exercise.accepted && !hidden) {
      return (
        <div className={className}>
          <p className='exercise-name'>{exercise.name}</p>
          <div className='exercise-suggestion-toggle'>
            <img id='accept' className='exercise-suggestion-toggle-button' src={Approval} onClick={() => this.handleAccept(true, exercise.name)} />
            <img id='reject' className='exercise-suggestion-toggle-button' src={Cancel} onClick={() => this.handleAccept(false, exercise.name)} />
          </div>
        </div>
      )
    } else if (exercise.accepted && !hidden) {
      return (
        <div className={className}>
          <p>{exercise.name}</p>
        </div>
      )
    } else {
      return (null)
    }
  }
}

Exercise.propTypes = {
  exercise: PropTypes.object,
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