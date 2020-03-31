import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from '../app/Message'
import PropTypes from 'prop-types'

class FrontPage extends Component {

  render() {
    const {registerSuccess} = this.props
    return (
      <div>
        {registerSuccess && <Message message={registerSuccess} />}
        <div>
          <p className='frontpage-title'>Welcome to JAFA</p>
        </div>
      </div>
    )
  }
}

FrontPage.propTypes = {
  registerSuccess: PropTypes.string
}

const mapStateToProps = (state) => ({
  registerSuccess: state.registerReducer.registerSuccess
})

export default connect(
  mapStateToProps,
  null
)(FrontPage)