import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'

import Hamburger from '../../assets/images/hamburger.png'

import * as actions from '../../redux/actions/actions'
import HeaderLinks from './HeaderLinks'

export class DropdownMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listOpen: false
    }
  }

  handleClickOutside = () => {
    this.setState({
      listOpen: false
    })
  }

  toggleList = () => {
    this.setState({
      listOpen: !this.state.listOpen
    })
  }

  closeList = () => {
    this.setState({
      listOpen: false
    })
  }

  render() {
    const { listOpen } = this.state
    const { loggedIn, logout } = this.props

    return (
      <div>
        <div className='dropdown-header' onClick={this.toggleList}>
          <img className='dropdown-icon' src={Hamburger}></img>
        </div>
        {listOpen &&
          <HeaderLinks
            loggedIn={loggedIn}
            logout={logout}
            className={'dropdown-item'}
            containerClass={'dropdown-content'}
            linkContainerClass={'dropdown-linkcontainer'}
            closeList={this.closeList}
          />
        }
      </div>
    )
  }
}

DropdownMenu.propTypes = {
  loggedIn: PropTypes.object,
  logout: PropTypes.func
}

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginReducer.loggedIn,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhanceWithClickOutside(DropdownMenu))