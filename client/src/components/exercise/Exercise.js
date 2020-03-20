import React from 'react'
import PropTypes from 'prop-types'

const Exercise = (props) => {

  const {name} = props.exercise
  return (
    <div>
      <p>{name}</p>
    </div>
  )
}

Exercise.propTypes = {
  exercise: PropTypes.object
}

export default Exercise