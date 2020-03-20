import React from 'react'
import PropTypes from 'prop-types'

const Message = (props) => {

  const className = props.error ? 'message-error' : 'message-success'
  const content = props.message ? props.message : props.error

  return (
    <div className='message-container'>
      <p className={`message ${className}`}>{content}</p>
    </div>
  )
}

Message.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string
}

export default Message