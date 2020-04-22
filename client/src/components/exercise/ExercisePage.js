import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Message from '../app/Message'

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
    const {exercise, error} = this.props
    return (
      <div className='container'>
        {error && <Message error={error}/>}
        {exercise ?
          <p>{exercise.name}</p> :
          <Link className='linkbutton' to='/exercise'> Back to exercises</Link>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  exercise: state.exerciseReducer.exercise,
  error: state.errorReducer.errorMessage
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisePage)