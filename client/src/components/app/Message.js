import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/actions'

const Message = (props) => {
  const visible = props.messageVisible ? '-visible' : ''
  const type = props.error ? '-error' : '-success'
  const content = props.message ? props.message : props.error

  return (
    <div id={`message-container${visible}${type}`} onClick={props.hideMessage}>
      {content}
    </div>
  )
}

Message.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string,
  messageVisible: PropTypes.bool,
  hideMessage: PropTypes.func
}

const mapDispatchToProps = {
  ...actions
}

export default connect(null, mapDispatchToProps)(Message)