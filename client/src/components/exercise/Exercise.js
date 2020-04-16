import React from 'react'
import PropTypes from 'prop-types'

const Exercise = (props) => {

  const {exercise, user} = props

  const className = exercise.accepted ? 'exercise-accepted' : 'exercise-suggestion'

  return (
    exercise.accepted || user.admin ?
      <div className={className}>
        <p>{exercise.name}</p>
      </div>
      : null
  )
}

Exercise.propTypes = {
  exercise: PropTypes.object,
  user: PropTypes.object
}

export default Exercise