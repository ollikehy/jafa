import React, {Component} from 'react'
import enhanceWithClickOutside from 'react-click-outside'

export class DropdownMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listOpen: false
    }
  }

  handleClickOutside = () => {
    this.toggleList()
  }

  toggleList = () => {
    this.setState({
      listOpen: !this.state.listOpen
    })
  }

  render() {
    const {listOpen} = this.state

    return (
      <div className='dropdown-wrapper'>
        <div className='dropdown-header' onClick={this.toggleList}>
          Exercises
        </div>
        {listOpen && <div className='dropdown-content'>
          <p className='dropdown-item'>Dropdown item</p>
        </div>}
      </div>
    )
  }
}

export default enhanceWithClickOutside(DropdownMenu)