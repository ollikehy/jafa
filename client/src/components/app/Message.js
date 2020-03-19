import React from 'react'

const Message = (props) => {

  const className = props.error ? 'message-error' : 'message-success'
  const content = props.message ? props.message : props.error

  return (
    <div className='message-container'>
      <p className={`message ${className}`}>{content}</p>
    </div>
  )
}

export default Message