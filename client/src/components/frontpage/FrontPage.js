import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from '../app/Message'

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

const mapStateToProps = (state) => ({
  registerSuccess: state.registerReducer.registerSuccess
})

export default connect(
  mapStateToProps,
  null
)(FrontPage)